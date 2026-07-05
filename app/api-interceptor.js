"use client";

import { useEffect } from "react";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://vdytxvhxpdejdbgqozyk.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_QgoWn84wkrdpXSgSkrbFsg_z--jJ0OV";

const clientSupabase = createClient(supabaseUrl, supabaseAnonKey);

function fetchAndCacheProducts() {
  if (typeof window === "undefined") return;
  clientSupabase
    .from('products')
    .select('*')
    .order('id', { ascending: false })
    .then(({ data, error }) => {
      if (!error && data) {
        try {
          sessionStorage.setItem('cache_api_products', JSON.stringify(data));
        } catch (e) {}
      }
    });
}

function fetchAndCacheSettings() {
  if (typeof window === "undefined") return;
  clientSupabase
    .from('settings')
    .select('value')
    .eq('key', 'site_settings')
    .single()
    .then(({ data, error }) => {
      if (!error && data?.value) {
        try {
          sessionStorage.setItem('cache_api_settings', JSON.stringify(data.value));
        } catch (e) {}
      }
    });
}

export default function InterceptorLoader() {
  useEffect(() => {
    if (typeof window !== "undefined" && !window.fetch.__intercepted) {
      const originalFetch = window.fetch;
      window.fetch = async function (input, init) {
        let url = "";
        if (typeof input === "string") {
          url = input;
        } else if (input && typeof input === "object" && typeof input.url === "string") {
          url = input.url;
        } else if (input && typeof input.href === "string") {
          url = input.href;
        } else if (input && typeof input.toString === "function") {
          url = input.toString();
        }

        if (url.startsWith('/api/products')) {
          try {
            const method = init?.method || 'GET';
            if (method === 'GET') {
              try {
                const cached = sessionStorage.getItem('cache_api_products');
                if (cached) {
                  const parsed = JSON.parse(cached);
                  fetchAndCacheProducts();
                  return new Response(JSON.stringify(parsed), { status: 200, headers: { 'Content-Type': 'application/json' } });
                }
              } catch (e) {}

              const { data, error } = await clientSupabase
                .from('products')
                .select('*')
                .order('id', { ascending: false });
              if (error) throw error;
              try {
                sessionStorage.setItem('cache_api_products', JSON.stringify(data));
              } catch (e) {}
              return new Response(JSON.stringify(data), { status: 200, headers: { 'Content-Type': 'application/json' } });
            } else if (method === 'POST') {
              try {
                sessionStorage.removeItem('cache_api_products');
              } catch (e) {}
              const body = JSON.parse(init.body);
              const { id, ...payload } = body;
              let result = await clientSupabase
                .from('products')
                .insert([payload])
                .select();

              if (result.error) {
                const cleanPayload = { ...payload };
                let retried = false;
                if (result.error.message.includes("pdf") || result.error.message.includes("schema cache")) {
                  delete cleanPayload.pdf;
                  retried = true;
                }
                if (result.error.message.includes("inquiry_only") || result.error.message.includes("schema cache")) {
                  delete cleanPayload.inquiry_only;
                  retried = true;
                }
                if (retried) {
                  result = await clientSupabase
                    .from('products')
                    .insert([cleanPayload])
                    .select();
                }
              }

              if (result.error) throw result.error;
              return new Response(JSON.stringify(result.data[0]), { status: 200, headers: { 'Content-Type': 'application/json' } });
            } else if (method === 'PUT') {
              try {
                sessionStorage.removeItem('cache_api_products');
              } catch (e) {}
              const body = JSON.parse(init.body);
              const { id, ...updates } = body;
              let result = await clientSupabase
                .from('products')
                .update(updates)
                .eq('id', id)
                .select();

              if (result.error) {
                const cleanUpdates = { ...updates };
                let retried = false;
                if (result.error.message.includes("pdf") || result.error.message.includes("schema cache")) {
                  delete cleanUpdates.pdf;
                  retried = true;
                }
                if (result.error.message.includes("inquiry_only") || result.error.message.includes("schema cache")) {
                  delete cleanUpdates.inquiry_only;
                  retried = true;
                }
                if (retried) {
                  result = await clientSupabase
                    .from('products')
                    .update(cleanUpdates)
                    .eq('id', id)
                    .select();
                }
              }

              if (result.error) throw result.error;
              return new Response(JSON.stringify(result.data[0]), { status: 200, headers: { 'Content-Type': 'application/json' } });
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

        if (url.startsWith('/api/categories')) {
          try {
            const method = init?.method || 'GET';
            if (method === 'GET') {
              const { data, error } = await clientSupabase
                .from('categories')
                .select('*')
                .order('name', { ascending: true });
              if (error) {
                if (error.code === 'PGRST116' || error.message.includes('public.categories')) {
                  return new Response(JSON.stringify([]), { status: 200, headers: { 'Content-Type': 'application/json' } });
                }
                throw error;
              }
              return new Response(JSON.stringify(data || []), { status: 200, headers: { 'Content-Type': 'application/json' } });
            } else if (method === 'POST') {
              const body = JSON.parse(init.body);
              const { data, error } = await clientSupabase
                .from('categories')
                .insert([body])
                .select();
              if (error) throw error;
              return new Response(JSON.stringify(data[0]), { status: 200, headers: { 'Content-Type': 'application/json' } });
            } else if (method === 'DELETE') {
              const parsedUrl = new URL(url, window.location.origin);
              const id = parsedUrl.searchParams.get('id');
              const name = parsedUrl.searchParams.get('name');

              let query = clientSupabase.from('categories').delete();
              if (id) {
                query = query.eq('id', id);
              } else if (name) {
                query = query.eq('name', name);
              } else {
                return new Response(JSON.stringify({ error: 'Missing id or name query parameter' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
              }

              const { data, error } = await query.select();
              if (error) throw error;
              return new Response(JSON.stringify(data[0] || { success: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
            }
          } catch (err) {
            return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
          }
        }
        if (url.startsWith('/api/settings')) {
          try {
            const method = init?.method || 'GET';
            if (method === 'GET') {
              try {
                const cached = sessionStorage.getItem('cache_api_settings');
                if (cached) {
                  const parsed = JSON.parse(cached);
                  fetchAndCacheSettings();
                  return new Response(JSON.stringify(parsed), { status: 200, headers: { 'Content-Type': 'application/json' } });
                }
              } catch (e) {}

              const { data, error } = await clientSupabase
                .from('settings')
                .select('value')
                .eq('key', 'site_settings')
                .single();
              if (error) {
                if (error.code === 'PGRST116') {
                  return new Response(JSON.stringify({}), { status: 200, headers: { 'Content-Type': 'application/json' } });
                }
                throw error;
              }
              const settingsVal = data?.value || {};
              try {
                sessionStorage.setItem('cache_api_settings', JSON.stringify(settingsVal));
              } catch (e) {}
              return new Response(JSON.stringify(settingsVal), { status: 200, headers: { 'Content-Type': 'application/json' } });
            } else {
              try {
                sessionStorage.removeItem('cache_api_settings');
              } catch (e) {}
              return originalFetch.apply(this, arguments);
            }
          } catch (err) {
            return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
          }
        }

        if (url.startsWith('/api/inquiries')) {
          try {
            const method = init?.method || 'GET';
            if (method === 'GET') {
              const { data, error } = await clientSupabase
                .from('inquiries')
                .select('*')
                .order('created_at', { ascending: false });
              if (error) {
                if (error.code === 'PGRST116' || error.code === '42P01' || error.message.includes('inquiries')) {
                  return new Response(JSON.stringify([]), { status: 200, headers: { 'Content-Type': 'application/json' } });
                }
                throw error;
              }
              return new Response(JSON.stringify(data || []), { status: 200, headers: { 'Content-Type': 'application/json' } });
            } else if (method === 'POST') {
              const body = JSON.parse(init.body);
              const { data, error } = await clientSupabase
                .from('inquiries')
                .insert([body])
                .select();
              if (error) {
                if (error.code === '42P01' || error.message.includes('inquiries')) {
                  const mockSaved = { id: Date.now(), ...body, created_at: new Date().toISOString() };
                  return new Response(JSON.stringify(mockSaved), { status: 200, headers: { 'Content-Type': 'application/json' } });
                }
                throw error;
              }
              return new Response(JSON.stringify(data[0]), { status: 200, headers: { 'Content-Type': 'application/json' } });
            }
          } catch (err) {
            return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
          }
        }

        return originalFetch.apply(this, arguments);
      };
      window.fetch.__intercepted = true;
    }
  }, []);

  return null;
}
