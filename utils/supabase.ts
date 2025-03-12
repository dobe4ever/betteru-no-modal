// utils/supabase.ts

import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

class SupabaseClientSingleton {
  private static instance: ReturnType<typeof createClient> | null = null

  public static getInstance(): ReturnType<typeof createClient> {
    if (!SupabaseClientSingleton.instance) {
      SupabaseClientSingleton.instance = createClient(supabaseUrl, supabaseAnonKey)
    }
    return SupabaseClientSingleton.instance
  }
}

export const supabase = SupabaseClientSingleton.getInstance()

// Database types
export type Profile = {
  id: string
  username: string
  avatar_url: string
  created_at: string
}

// Helper functions for user profiles

/**
 * Creates or updates a user profile in the profiles table
 */
export async function upsertProfile(profile: Partial<Profile> & { id: string }) {
  const { error } = await supabase
    .from('profiles')
    .upsert(profile, { onConflict: 'id' })
    .select()
  
  if (error) {
    console.error('Error upserting profile:', error)
    throw error
  }
}

/**
 * Fetches a user profile from the profiles table
 */
export async function getProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()
  
  if (error) {
    console.error('Error fetching profile:', error)
    return null
  }
  
  return data as Profile
}

