"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, onAuthStateChange } from '@/lib/supabase';
import { personnelService } from '@/lib/database';

interface Personnel {
  id: string;
  user_id: string;
  personel_id: string;
  ad: string;
  soyad: string;
  departman: 'satis' | 'teknik' | 'musteri_hizmetleri';
  pozisyon?: string;
  aktif: boolean;
  yonetici: boolean;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  personnel: Personnel | null;
  loading: boolean;
  signUp: (email: string, password: string, name?: string) => Promise<{ data: any; error: any }>;
  signIn: (email: string, password: string) => Promise<{ data: any; error: any }>;
  signOut: () => Promise<{ error: any }>;
  resetPassword: (email: string) => Promise<{ data: any; error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [personnel, setPersonnel] = useState<Personnel | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error getting session:', error);
      } else {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Load personnel data if user exists
        if (session?.user) {
          await loadPersonnelData(session.user.id);
        }
      }
      setLoading(false);
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session);
      setSession(session);
      setUser(session?.user ?? null);
      
      // Load personnel data if user exists
      if (session?.user) {
        await loadPersonnelData(session.user.id);
      } else {
        setPersonnel(null);
      }
      
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const loadPersonnelData = async (userId: string) => {
    try {
      console.log('Loading personnel data for user ID:', userId);
      const { data, error } = await personnelService.getCurrentPersonnel(userId);
      console.log('Personnel data result:', { data, error });
      if (error) {
        console.error('Error loading personnel data:', error);
        console.error('Error details:', JSON.stringify(error, null, 2));
      } else {
        console.log('Personnel data loaded successfully:', data);
        setPersonnel(data);
      }
    } catch (error) {
      console.error('Error loading personnel data (catch):', error);
    }
  };

  const signUp = async (email: string, password: string, name?: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name || '',
        }
      }
    });
    return { data, error };
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  const resetPassword = async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });
    return { data, error };
  };

  const value = {
    user,
    session,
    personnel,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

