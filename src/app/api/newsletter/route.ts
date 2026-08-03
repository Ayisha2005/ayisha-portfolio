import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

const subscribedEmails = new Set<string>();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email address is required' }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();

    if (subscribedEmails.has(cleanEmail)) {
      return NextResponse.json(
        { error: 'This email is already subscribed!' },
        { status: 409 }
      );
    }
    subscribedEmails.add(cleanEmail);

    let savedToSupabase = false;
    if (supabase) {
      const { error } = await supabase.from('newsletter_subscribers').insert([
        {
          email: cleanEmail,
          created_at: new Date().toISOString(),
        },
      ]);
      if (!error) {
        savedToSupabase = true;
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Successfully subscribed to project updates!',
        savedToSupabase,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Server error subscribing to newsletter', details: error?.message },
      { status: 500 }
    );
  }
}
