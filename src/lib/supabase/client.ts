import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://hfndfmtxhqvubnfiwzlz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhmbmRmbXR4aHF2dWJuZml3emx6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2Mjk4MDgsImV4cCI6MjA3NjIwNTgwOH0.n0NK_Ov03-UbDQYr5mio3ggYa5XTN-XI1kB6X81N4nA',
  {
    global: {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsImF1ZCI6ImF1dGhlbnRpY2F0ZWQiLCJyb2xlIjoiYW5vbiIsInRlbmFudF9pZCI6IkNUbllzSnQ3djNoZ2Vxd2p1VFV0Q2hrSnVSdjEiLCJwcm9qZWN0X2lkIjoiYzVlMTQzODgtMDc3ZS00YjBjLWJlMWQtNjk1ZjNkYTgyZWNkIiwianRpIjoiZWEyYjY3MTAtOTM0Yi00MjJkLTk0NmEtZTgyYThkM2U4NzQ3IiwiaWF0IjoxNzY1NzY3OTIxLCJleHAiOjE3NjU3NzA2MjF9.CSNR_oE9ymJPtKw0IL_KfIW-EYNafk2ilTJGqamGzvQ`
      }
    }
  }
);

// Constants for tenant and project
export const TENANT_ID = 'CTnYsJt7v3hgeqwjuTUtChkJuRv1';
export const PROJECT_ID = 'c5e14388-077e-4b0c-be1d-695f3da82ecd';
