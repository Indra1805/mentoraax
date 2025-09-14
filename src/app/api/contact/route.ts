// app/api/contact/route.ts
import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabaseServer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;
    if (!name || !email || !message) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });

    // Insert into contacts table using service role key (server)
    const { data, error } = await supabaseServer
      .from('contacts')
      .insert([{ name, email, message }]);

    if (error) {
      console.error(error);
      return NextResponse.json({ error: 'DB error' }, { status: 500 });
    }
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
