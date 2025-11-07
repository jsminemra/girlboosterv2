'use client';
import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    (async () => {
      // garante que o cookie exista (opcional: sincroniza a partir do localStorage)
      const lsId = localStorage.getItem('userId');
      if (lsId) {
        await fetch('/api/auth/sync-user-id', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: lsId }),
        });
      }

      const res = await fetch('/api/user', { cache: 'no-store' });
      if (!res.ok) { router.replace('/login'); return; }

      const user = await res.json();
      const CURRENT_TERMS_VERSION = Number(process.env.NEXT_PUBLIC_CURRENT_TERMS_VERSION ?? 1);
      const accepted = !!user?.termsAcceptedAt && (user?.termsVersion ?? 0) >= CURRENT_TERMS_VERSION;

      if (user?.hasCompletedQuiz && !accepted) {
        router.replace('/termos-de-uso'); return;
      }

      setOk(true);
    })();
  }, [router]);

  if (!ok) return <div className="flex h-dvh items-center justify-center text-sm text-gray-600">carregando...</div>;
  return <>{children}</>;
}
