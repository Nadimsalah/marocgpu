import { NextResponse } from 'next/server';
import supabase from '../../../db';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .order('id', { ascending: false });

    if (error) {
      if (error.code === 'PGRST116' || error.code === '42P01' || error.message.includes('inquiries')) {
        return NextResponse.json([]);
      }
      throw error;
    }
    return NextResponse.json(data || []);
  } catch (error) {
    console.error('API Inquiries GET error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { data, error } = await supabase
      .from('inquiries')
      .insert([body])
      .select();

    if (error) throw error;
    return NextResponse.json(data[0]);
  } catch (error) {
    console.error('API Inquiries POST error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
