import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const { email, fullName, role } = await req.json();

  const { error } = await supabase
    .from('users')
    .update({ email, full_name: fullName, role })
    .eq('id', id);

  if (error) return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });

  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  const { error } = await supabase.from('users').delete().eq('id', id);

  if (error) return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });

  return NextResponse.json({ success: true });
}
