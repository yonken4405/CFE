// lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://augfmdgdnlqfwbtgnypu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF1Z2ZtZGdkbmxxZndidGdueXB1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3OTg3MTIsImV4cCI6MjA2NzM3NDcxMn0.RYpCKLlebkI2auxH6omVBcoHilZTd0-3BfazIs56gnI';
export const supabase = createClient(supabaseUrl, supabaseKey);


