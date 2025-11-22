-- Fix trigger for user creation
-- Run this in Supabase SQL Editor

-- 1. Drop existing trigger and function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- 2. Recreate function with proper permissions
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.kullanici (
    user_id, 
    personel_id, 
    ad, 
    soyad, 
    email, 
    departman, 
    aktif, 
    yonetici
  )
  VALUES (
    NEW.id,
    'P' || LPAD(NEXTVAL('personel_id_seq')::TEXT, 4, '0'),
    COALESCE(NEW.raw_user_meta_data->>'name', 'User'),
    '',
    NEW.email,
    'musteri_hizmetleri',
    true,
    false
  );
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    RAISE LOG 'Error in handle_new_user: %', SQLERRM;
    RETURN NEW;
END;
$$;

-- 3. Recreate trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW 
  EXECUTE FUNCTION public.handle_new_user();

-- 4. Grant necessary permissions
GRANT USAGE ON SEQUENCE personel_id_seq TO postgres, anon, authenticated, service_role;
GRANT INSERT ON kullanici TO postgres, anon, authenticated, service_role;

-- 5. Test: Check if trigger exists
SELECT 
  trigger_name, 
  event_manipulation, 
  event_object_table, 
  action_statement
FROM information_schema.triggers
WHERE trigger_name = 'on_auth_user_created';

