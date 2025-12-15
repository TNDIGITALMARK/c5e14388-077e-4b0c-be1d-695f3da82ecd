/**
 * Database Initialization Script
 *
 * This script creates the required database tables for the order notification system.
 * Run this once to set up the database structure.
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const supabase = createClient(
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

async function initializeDatabase() {
  console.log('🚀 Initializing PlaqueXpress database...\n');

  try {
    // Read the SQL file
    const sqlPath = path.join(__dirname, 'init-database.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');

    console.log('📄 Read SQL initialization script');
    console.log('⚠️  Note: This script requires direct database access with CREATE TABLE permissions');
    console.log('⚠️  Please run the init-database.sql file manually in your Supabase SQL Editor\n');
    console.log('Steps:');
    console.log('1. Go to https://hfndfmtxhqvubnfiwzlz.supabase.co/project/_/sql');
    console.log('2. Copy the contents of scripts/init-database.sql');
    console.log('3. Paste and run in the SQL editor');
    console.log('4. Verify tables are created\n');

    // Check if tables exist
    console.log('🔍 Checking existing tables...\n');

    const { data: ordersCheck, error: ordersError } = await supabase
      .from('orders')
      .select('id')
      .limit(1);

    if (!ordersError) {
      console.log('✅ Orders table exists');
    } else if (ordersError.code === 'PGRST204') {
      console.log('❌ Orders table does not exist - please run the SQL script');
    }

    const { data: settingsCheck, error: settingsError } = await supabase
      .from('notification_settings')
      .select('id')
      .limit(1);

    if (!settingsError) {
      console.log('✅ Notification settings table exists');
    } else if (settingsError.code === 'PGRST204') {
      console.log('❌ Notification settings table does not exist - please run the SQL script');
    }

    console.log('\n✨ Database check complete');
  } catch (error: any) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

initializeDatabase();
