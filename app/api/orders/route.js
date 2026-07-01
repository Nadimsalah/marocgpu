import { NextResponse } from 'next/server';
import supabase from '../../../db';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      if (error.code === 'PGRST116' || error.message.includes('public.orders')) {
        return NextResponse.json([]);
      }
      throw error;
    }
    return NextResponse.json(data || []);
  } catch (error) {
    console.error('API Orders GET error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { data, error } = await supabase
      .from('orders')
      .insert([body])
      .select();

    if (error) throw error;
    return NextResponse.json(data[0]);
  } catch (error) {
    console.error('API Orders POST error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;
    const { data, error } = await supabase
      .from('orders')
      .update(updates)
      .eq('id', id)
      .select();

    if (error) throw error;
    return NextResponse.json(data[0]);
  } catch (error) {
    console.error('API Orders PUT error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
