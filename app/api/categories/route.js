import { NextResponse } from 'next/server';
import supabase from '../../../db';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      if (error.code === 'PGRST116' || error.message.includes('public.categories')) {
        return NextResponse.json([]);
      }
      throw error;
    }
    return NextResponse.json(data || []);
  } catch (error) {
    console.error('API Categories GET error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { data, error } = await supabase
      .from('categories')
      .insert([body])
      .select();

    if (error) throw error;
    return NextResponse.json(data[0]);
  } catch (error) {
    console.error('API Categories POST error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const name = searchParams.get('name');

    let query = supabase.from('categories').delete();
    if (id) {
      query = query.eq('id', id);
    } else if (name) {
      query = query.eq('name', name);
    } else {
      return NextResponse.json({ error: 'Missing id or name query parameter' }, { status: 400 });
    }

    const { data, error } = await query.select();
    if (error) throw error;
    return NextResponse.json(data[0] || { success: true });
  } catch (error) {
    console.error('API Categories DELETE error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
