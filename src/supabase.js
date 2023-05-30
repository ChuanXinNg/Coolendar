import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jypooxsngkbddepmrdwt.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5cG9veHNuZ2tiZGRlcG1yZHd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ3NDYzNjYsImV4cCI6MjAwMDMyMjM2Nn0.VncfalS6sf2q1NgSNKpULs0fJztNo4FO0U4ylA_aQ4U";


export const supabase = createClient(supabaseUrl, supabaseKey);
