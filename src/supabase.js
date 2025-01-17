import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://eoiestnxdmyjslrpzmiw.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVvaWVzdG54ZG15anNscnB6bWl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg3MTE0NjIsImV4cCI6MjAzNDI4NzQ2Mn0.EcyyHwkQrdVKXZTJUUj4UtIIc759VQ_jyAFRlRw5tOQ'
export const supabase = createClient(supabaseUrl, supabaseKey)