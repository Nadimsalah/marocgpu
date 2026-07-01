"use client";

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://vdytxvhxpdejdbgqozyk.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_QgoWn84wkrdpXSgSkrbFsg_z--jJ0OV";

const clientSupabase = createClient(supabaseUrl, supabaseAnonKey);

if (typeof window !== "undefined") {
  const originalFetch = window.fetch;
  window.fetch = async function (input, init) {
    const url = typeof input === "string" ? input : input.url;

    if (url.startsWith('/api/products')) {
      try {
        const method = init?.method || 'GET';
        if (method === 'GET') {
          const { data, error } = await clientSupabase
            .from('products')
            .select('*')
            .order('id', { ascending: false });
          if (error) throw error;
          return new Response(JSON.stringify(data), { status: 200, headers: { 'Content-Type': 'application/json' } });
        } else if (method === 'POST') {
          const body = JSON.parse(init.body);
          const { id, ...payload } = body;
          const { data, error } = await clientSupabase
            .from('products')
            .insert([payload])
            .select();
          if (error) throw error;
          return new Response(JSON.stringify(data[0]), { status: 200, headers: { 'Content-Type': 'application/json' } });
        } else if (method === 'PUT') {
          const body = JSON.parse(init.body);
          const { id, ...updates } = body;
          const { data, error } = await clientSupabase
            .from('products')
            .update(updates)
            .eq('id', id)
            .select();
          if (error) throw error;
          return new Response(JSON.stringify(data[0]), { status: 200, headers: { 'Content-Type': 'application/json' } });
        }
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
      }
    }

    if (url.startsWith('/api/orders')) {
      try {
        const method = init?.method || 'GET';
        if (method === 'GET') {
          const { data, error } = await clientSupabase
            .from('orders')
            .select('*')
            .order('created_at', { ascending: false });
          if (error) throw error;
          return new Response(JSON.stringify(data), { status: 200, headers: { 'Content-Type': 'application/json' } });
        } else if (method === 'POST') {
          const body = JSON.parse(init.body);
          const { data, error } = await clientSupabase
            .from('orders')
            .insert([body])
            .select();
          if (error) throw error;
          return new Response(JSON.stringify(data[0]), { status: 200, headers: { 'Content-Type': 'application/json' } });
        } else if (method === 'PUT') {
          const body = JSON.parse(init.body);
          const { id, ...updates } = body;
          const { data, error } = await clientSupabase
            .from('orders')
            .update(updates)
            .eq('id', id)
            .select();
          if (error) throw error;
          return new Response(JSON.stringify(data[0]), { status: 200, headers: { 'Content-Type': 'application/json' } });
        }
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
      }
    }

    if (url.startsWith('/api/customers')) {
      try {
        const method = init?.method || 'GET';
        if (method === 'GET') {
          const { data, error } = await clientSupabase
            .from('customers')
            .select('*')
            .order('joined', { ascending: false });
          if (error) throw error;
          return new Response(JSON.stringify(data), { status: 200, headers: { 'Content-Type': 'application/json' } });
        } else if (method === 'POST') {
          const body = JSON.parse(init.body);
          const { email, name, phone, city, spent, orders, joined } = body;

          const { data: existing } = await clientSupabase
            .from('customers')
            .select('*')
            .eq('email', email)
            .maybeSingle();

          let result;
          if (existing) {
            const { data, error } = await clientSupabase
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
            const { data, error } = await clientSupabase
              .from('customers')
              .insert([{ email, name, phone, city, spent: Number(spent || 0), orders: orders || 1, joined }])
              .select();
            if (error) throw error;
            result = data[0];
          }
          return new Response(JSON.stringify(result), { status: 200, headers: { 'Content-Type': 'application/json' } });
        }
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
      }
    }

    return originalFetch.apply(this, arguments);
  };
}
