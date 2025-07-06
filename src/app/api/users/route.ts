import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import bcrypt from 'bcryptjs';

export async function GET() {
  const { data: users, error } = await supabase.from('users').select('*');

  if (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }

  return NextResponse.json({ users });
}

export async function POST(req: NextRequest) {
  const { email, fullName, password, role } = await req.json();

  const { data: existing } = await supabase.from('users').select('*').eq('email', email).single();
  if (existing) return NextResponse.json({ error: 'Email already exists' }, { status: 400 });

  const passwordHash = await bcrypt.hash(password, 10);

  const { error } = await supabase.from('users').insert([
    { email, full_name: fullName, password_hash: passwordHash, role }
  ]);

  if (error) return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });

  return NextResponse.json({ success: true });
}
