import { createClient } from '@supabase/supabase-js';

const supabaseConexion = createClient(
    "https://bzgwrbgsnxddohpbaopy.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6Z3dyYmdzbnhkZG9ocGJhb3B5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg4Mjg4NzEsImV4cCI6MjA4NDQwNDg3MX0.sqTk7NySJddLuHi-iI50fVhYwazRWiT7FkfMyLJR5Pk"
);

export {supabaseConexion};