import { NextRequest, NextResponse } from 'next/server';
import { supabase, TENANT_ID, PROJECT_ID } from '@/lib/supabase/client';

export async function GET() {
  try {
    const { data: settings, error } = await supabase
      .from('notification_settings')
      .select('*')
      .single();

    if (error && error.code !== 'PGRST116') {
      // PGRST116 = no rows returned
      console.error('Error fetching settings:', error);
      return NextResponse.json(
        { error: 'Failed to fetch settings' },
        { status: 500 }
      );
    }

    // Return default settings if none exist
    if (!settings) {
      return NextResponse.json({
        settings: {
          email_enabled: false,
          email_address: null,
          whatsapp_enabled: false,
          whatsapp_number: null
        }
      });
    }

    return NextResponse.json({ settings });
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Check if settings exist
    const { data: existing } = await supabase
      .from('notification_settings')
      .select('id')
      .single();

    let result;

    if (existing) {
      // Update existing settings
      result = await supabase
        .from('notification_settings')
        .update({
          email_enabled: body.email_enabled,
          email_address: body.email_address,
          whatsapp_enabled: body.whatsapp_enabled,
          whatsapp_number: body.whatsapp_number,
          updated_at: new Date().toISOString()
        })
        .eq('id', existing.id)
        .select()
        .single();
    } else {
      // Create new settings
      result = await supabase
        .from('notification_settings')
        .insert({
          tenantid: TENANT_ID,
          projectid: PROJECT_ID,
          email_enabled: body.email_enabled,
          email_address: body.email_address,
          whatsapp_enabled: body.whatsapp_enabled,
          whatsapp_number: body.whatsapp_number
        })
        .select()
        .single();
    }

    if (result.error) {
      console.error('Error saving settings:', result.error);
      return NextResponse.json(
        { error: 'Failed to save settings' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, settings: result.data });
  } catch (error) {
    console.error('Error processing settings:', error);
    return NextResponse.json(
      { error: 'Failed to process settings' },
      { status: 500 }
    );
  }
}
