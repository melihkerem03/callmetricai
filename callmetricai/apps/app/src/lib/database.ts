import { supabase } from './supabase'

// Personnel Management
export const personnelService = {
  // Get current user's personnel info
  getCurrentPersonnel: async (userId: string) => {
    const { data, error } = await supabase
      .from('kullanici')
      .select('*')
      .eq('user_id', userId)
      .single()
    
    return { data, error }
  },

  // Get all personnel (admin only)
  getAllPersonnel: async () => {
    const { data, error } = await supabase
      .from('kullanici')
      .select('*')
      .eq('aktif', true)
      .order('olusturma_tarihi', { ascending: false })
    
    return { data, error }
  },

  // Update personnel info (by personnel UUID, not user_id)
  updatePersonnel: async (personnelId: string, personnelData: any) => {
    const { data, error } = await supabase
      .from('kullanici')
      .update({
        ...personnelData,
        guncelleme_tarihi: new Date().toISOString()
      })
      .eq('id', personnelId)
      .select()
      .single()
    
    return { data, error }
  }
}

// Calls Management
export const callsService = {
  // Get user's calls (personnel only)
  getPersonnelCalls: async (personnelId: string) => {
    console.log('Getting personnel calls for ID:', personnelId);
    const { data, error } = await supabase
      .from('gorusme')
      .select(`
        *,
        kullanici:kullanici_id (
          ad,
          soyad,
          departman
        )
      `)
      .eq('kullanici_id', personnelId)
      .order('gorusme_tarihi', { ascending: false })
    
    console.log('Personnel calls result:', { data, error });
    return { data, error }
  },

  // Get all calls (admin only)
  getAllCalls: async () => {
    const { data, error } = await supabase
      .from('gorusme')
      .select(`
        *,
        kullanici:kullanici_id (
          ad,
          soyad,
          departman,
          personel_id
        )
      `)
      .order('gorusme_tarihi', { ascending: false })
    
    return { data, error }
  },

  // Create new call with AI analysis
  createCall: async (personnelId: string, callData: {
    gorusme_adi?: string;
    gorusme_suresi?: number;
    ses_dosyasi_url?: string;
    transkript?: string;
    dil?: string;
    call_analysis?: {
      call_summary: string;
      call_duration_analysis: string;
      resolution_status: string;
      caller_analysis: {
        sentiment: string;
        tone: string;
        main_issue: string;
        satisfaction_level: string;
        key_concerns: string[];
      };
      agent_performance: {
        professionalism_score: number;
        empathy_score: number;
        problem_solving_score: number;
        communication_score: number;
        overall_score: number;
        strengths: string[];
        improvement_areas: string[];
        key_actions: string[];
      };
      recommendations: string[];
    };
  }) => {
    // Extract call analysis for separate fields
    const analysisData = callData.call_analysis ? {
      gorusme_durumu: callData.call_analysis.resolution_status === 'Çözüldü' ? 'tamamlandi' : 
                      callData.call_analysis.resolution_status === 'Kısmen Çözüldü' ? 'devam_ediyor' : 'iptal',
      gorusme_puani: callData.call_analysis.agent_performance.overall_score,
      musteri_memnuniyeti: callData.call_analysis.caller_analysis.satisfaction_level,
      ai_ozet: callData.call_analysis.call_summary,
      ai_onerileri: callData.call_analysis.recommendations.join('\n'),
    } : {}

    const { data, error } = await supabase
      .from('gorusme')
      .insert({
        kullanici_id: personnelId,
        gorusme_adi: callData.gorusme_adi || 'Yeni Görüşme',
        gorusme_tarihi: new Date().toISOString(),
        gorusme_suresi: callData.gorusme_suresi || 0,
        ses_dosyasi_url: callData.ses_dosyasi_url,
        transkript: callData.transkript,
        dil: callData.dil || 'en',
        ...analysisData,
        olusturma_tarihi: new Date().toISOString()
      })
      .select()
      .single()
    
    return { data, error }
  },

  // Update call
  updateCall: async (callId: string, callData: any) => {
    const { data, error } = await supabase
      .from('gorusme')
      .update({
        ...callData,
        guncelleme_tarihi: new Date().toISOString()
      })
      .eq('id', callId)
      .select()
      .single()
    
    return { data, error }
  },

  // Delete call
  deleteCall: async (callId: string) => {
    const { error } = await supabase
      .from('gorusme')
      .delete()
      .eq('id', callId)
    
    return { error }
  }
}

// Dashboard Statistics
export const dashboardService = {
  // Get personnel dashboard stats
  getPersonnelStats: async (personnelId: string) => {
    const { data: calls } = await callsService.getPersonnelCalls(personnelId)
    
    if (calls) {
      const totalCalls = calls.length
      const completedCalls = calls.filter(call => call.gorusme_durumu === 'tamamlandi').length
      const avgScore = calls.reduce((sum, call) => sum + (call.gorusme_puani || 0), 0) / totalCalls || 0
      const todayCalls = calls.filter(call => 
        new Date(call.gorusme_tarihi).toDateString() === new Date().toDateString()
      ).length

      return {
        totalCalls,
        completedCalls,
        avgScore: Math.round(avgScore * 10) / 10,
        todayCalls
      }
    }
    
    return { totalCalls: 0, completedCalls: 0, avgScore: 0, todayCalls: 0 }
  },

  // Get admin dashboard stats
  getAdminStats: async () => {
    const { data: calls } = await callsService.getAllCalls()
    const { data: personnel } = await personnelService.getAllPersonnel()
    
    if (calls && personnel) {
      const totalCalls = calls.length
      const completedCalls = calls.filter(call => call.gorusme_durumu === 'tamamlandi').length
      const avgScore = calls.reduce((sum, call) => sum + (call.gorusme_puani || 0), 0) / totalCalls || 0
      const activePersonnel = personnel.filter(p => p.aktif).length
      const todayCalls = calls.filter(call => 
        new Date(call.gorusme_tarihi).toDateString() === new Date().toDateString()
      ).length

      return {
        totalCalls,
        completedCalls,
        avgScore: Math.round(avgScore * 10) / 10,
        activePersonnel,
        todayCalls
      }
    }
    
    return { totalCalls: 0, completedCalls: 0, avgScore: 0, activePersonnel: 0, todayCalls: 0 }
  }
}

