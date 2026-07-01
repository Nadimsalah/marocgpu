import { NextResponse } from 'next/server';
import supabase from '../../../db';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      // If table doesn't exist, return empty array instead of failing
      if (error.code === 'PGRST116' || error.message.includes('public.products')) {
        return NextResponse.json([]);
      }
      throw error;
    }
    return NextResponse.json(data || []);
  } catch (error) {
    console.error('API Products GET error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    // Exclude id so DB auto-generates it
    const { id, ...productData } = body;
    const { data, error } = await supabase
      .from('products')
      .insert([productData])
      .select();

    if (error) throw error;
    return NextResponse.json(data[0]);
  } catch (error) {
    console.error('API Products POST error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select();

    if (error) throw error;
    return NextResponse.json(data[0]);
  } catch (error) {
    console.error('API Products PUT error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
