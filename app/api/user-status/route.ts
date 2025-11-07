import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };
export const prisma = globalForPrisma.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function POST(req: Request) {
  try {
    const { email } = await req.json().catch(() => ({}));
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email obrigatório' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        hasCompletedQuiz: true,
        hasAcceptedTerms: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'Usuária não encontrada' }, { status: 404 });
    }

    return NextResponse.json({
      hasCompletedQuiz: !!user.hasCompletedQuiz,
      hasAcceptedTerms: !!user.hasAcceptedTerms,
    });
  } catch (e) {
    console.error('Erro em /api/user-status', e);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
