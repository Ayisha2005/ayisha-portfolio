import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

// In-memory cache to prevent spam/duplicate submissions within 60 seconds
const recentSubmissions = new Map<string, number>();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // 1. Input Validation
    if (!name || !name.trim()) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email address is required' }, { status: 400 });
    }
    if (!message || !message.trim()) {
      return NextResponse.json({ error: 'Message content is required' }, { status: 400 });
    }

    // 2. Duplicate Check / Anti-Spam
    const submissionKey = `${email.toLowerCase()}:${message.trim().toLowerCase()}`;
    const now = Date.now();
    const lastSubmitted = recentSubmissions.get(submissionKey);

    if (lastSubmitted && now - lastSubmitted < 60000) {
      return NextResponse.json(
        { error: 'Duplicate submission detected. Please wait a minute before sending again.' },
        { status: 429 }
      );
    }
    recentSubmissions.set(submissionKey, now);

    // 3. Store in Supabase if configured
    let savedToSupabase = false;
    if (supabase) {
      const { error } = await supabase.from('contact_submissions').insert([
        {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          subject: subject ? subject.trim() : 'General Portfolio Contact',
          message: message.trim(),
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
        message: `Thank you, ${name}! Your message has been received.`,
        savedToSupabase,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Server error processing contact request', details: error?.message },
      { status: 500 }
    );
  }
}
