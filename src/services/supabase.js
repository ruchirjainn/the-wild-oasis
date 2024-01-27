import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://wgipmqileekaykfvgqaw.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndnaXBtcWlsZWVrYXlrZnZncWF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDUwNzgwNjQsImV4cCI6MjAyMDY1NDA2NH0.DYPg8gn2G8gVaEtvmpfpVHrdF1QioMRIRo_hp53tCTk";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
