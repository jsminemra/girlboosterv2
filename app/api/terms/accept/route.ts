import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Prisma singleton (evita múltiplas conexões em dev)
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };
export const prisma = globalForPrisma.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function POST(req: Request) {
  try {
    const { email } = await req.json().catch(() => ({}));

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email obrigatório' }, { status: 400 });
    }

    // Atualiza diretamente no modelo User (conforme seu schema.prisma)
    const user = await prisma.user.update({
      where: { email },
      data: {
        hasAcceptedTerms: true,
        termsAcceptedAt: new Date(),
      },
      select: { id: true, email: true, hasAcceptedTerms: true, termsAcceptedAt: true },
    });

    return NextResponse.json({ ok: true, user });
  } catch (e: any) {
    // P2025 = registro não encontrado
    if (e?.code === 'P2025') {
      return NextResponse.json({ error: 'Usuária não encontrada' }, { status: 404 });
    }
    console.error('Erro em /api/terms/accept', e);
    return NextResponse.json({ error: 'Erro ao salvar aceite' }, { status: 500 });
  }
}
