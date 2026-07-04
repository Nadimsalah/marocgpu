import { NextResponse } from 'next/server';
import supabase from '../../../db';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('settings')
      .select('value')
      .eq('key', 'site_settings')
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({});
      }
      throw error;
    }

    return NextResponse.json(data?.value || {});
  } catch (error) {
    console.error('API Settings GET error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { data, error } = await supabase
      .from('settings')
      .upsert({ key: 'site_settings', value: body }, { onConflict: 'key' })
      .select();

    if (error) throw error;
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('API Settings POST error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
