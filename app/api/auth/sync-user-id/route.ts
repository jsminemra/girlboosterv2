import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { userId } = await req.json().catch(() => ({}));
  if (!userId) return NextResponse.json({ error: 'Faltando userId' }, { status: 400 });

  const res = NextResponse.json({ ok: true });
  res.cookies.set('userId', userId, { path: '/', httpOnly: false });
  return res;
}
