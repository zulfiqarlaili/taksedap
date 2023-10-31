import { createClient } from '@supabase/supabase-js'

const anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4cXN6ZnJxbXNudXp1ZXR5amd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg1MTY5NDcsImV4cCI6MjAxNDA5Mjk0N30._YKbyH4J1p7gbVW_tEOW-CnoJATL6COPeNZi9hrfi7s'
const projectUrl = 'https://gxqszfrqmsnuzuetyjgz.supabase.co'
export const supabase = createClient(projectUrl, anonKey)