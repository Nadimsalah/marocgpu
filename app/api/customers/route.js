import { NextResponse } from 'next/server';
import supabase from '../../../db';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      if (error.code === 'PGRST116' || error.message.includes('public.customers')) {
        return NextResponse.json([]);
      }
      throw error;
    }
    return NextResponse.json(data || []);
  } catch (error) {
    console.error('API Customers GET error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, name, phone, city, spent, orders, joined } = body;
    
    // Check if customer exists first to aggregate metrics
    const { data: existing } = await supabase
      .from('customers')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    let result;
    if (existing) {
      const { data, error } = await supabase
        .from('customers')
        .update({
          name,
          phone,
          city,
          orders: (existing.orders || 0) + (orders || 1),
          spent: Number(existing.spent || 0) + Number(spent || 0)
        })
        .eq('email', email)
        .select();
      if (error) throw error;
      result = data[0];
    } else {
      const { data, error } = await supabase
        .from('customers')
        .insert([{ email, name, phone, city, spent: Number(spent || 0), orders: orders || 1, joined }])
        .select();
      if (error) throw error;
      result = data[0];
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('API Customers POST error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { email, ...updates } = body;
    const { data, error } = await supabase
      .from('customers')
      .update(updates)
      .eq('email', email)
      .select();

    if (error) throw error;
    return NextResponse.json(data[0]);
  } catch (error) {
    console.error('API Customers PUT error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
