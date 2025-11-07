'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AcceptActions() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const onAccept = async () => {
    setErr(null);
    setLoading(true);
    try {
      const res = await fetch('/api/terms/accept', { method: 'POST' });
      if (!res.ok) throw new Error(await res.text());
      router.replace('/dashboard'); // ajuste se necessário
    } catch (e: any) {
      setErr(e?.message ?? 'Erro ao registrar aceite.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <label className="flex items-start gap-3 mb-6">
        <input
          type="checkbox"
          className="mt-1 h-5 w-5 rounded border-gray-300"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        <span className="text-sm text-gray-700">
          Eu li e concordo com os Termos de Uso do Girl Booster.
        </span>
      </label>

      {err && <p className="text-sm text-red-600 mb-3">{err}</p>}

      <button
        onClick={onAccept}
        disabled={!checked || loading}
        className="inline-flex items-center rounded-xl px-4 py-2 text-white bg-black disabled:opacity-50"
      >
        {loading ? 'Salvando...' : 'Aceito os Termos'}
      </button>
    </>
  );
}
