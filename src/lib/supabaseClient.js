import { createClient } from '@supabase/supabase-js'
import { ANON_KEY, SUPABASE_PROJECT_URL } from './constants'

export const supabase = createClient(SUPABASE_PROJECT_URL, ANON_KEY)