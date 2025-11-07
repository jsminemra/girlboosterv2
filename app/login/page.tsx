"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        name: formData.name,
        email: formData.email,
      });

      if (res?.ok) {
        // salva no sessionStorage para a página de termos e outras telas
        sessionStorage.setItem(
          "user",
          JSON.stringify({ name: formData.name, email: formData.email })
        );

        // 🔽 DECISÃO DE ROTA: consulta direto no banco
        try {
          const r = await fetch("/api/user-status", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: formData.email }),
            cache: "no-store",
          });

          if (!r.ok) {
            // fallback seguro se der qualquer erro
            router.push("/home");
            return;
          }

          const s = await r.json(); // { hasCompletedQuiz, hasAcceptedTerms }
          const quizCompleted = !!s?.hasCompletedQuiz;
          const termsAccepted = !!s?.hasAcceptedTerms;

          if (!quizCompleted) {
            router.push("/quiz");
          } else if (!termsAccepted) {
            router.push("/termos-de-uso");
          } else {
            router.push("/home");
          }
        } catch {
          router.push("/home");
        }
      } else {
        if (res?.error) setError(res.error);
        else setError("Usuário não encontrado");
      }
    } catch (err) {
      console.error("Erro no signIn:", err);
      setError("Erro inesperado. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image src="/LOGO 1.png" alt="Logo" width={220} height={80} priority />
        </div>

        <div className="bg-gray-900 rounded-lg p-8">
          <h2 className="text-white text-2xl font-bold mb-2 text-center">Faça seu login</h2>
          <p className="text-gray-400 text-center mb-6">Entre com seu nome e e-mail de compra</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Digite seu nome"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <input
              type="email"
              placeholder="Digite seu e-mail"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            {error && (
              <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-2 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-3 px-6 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Entrando..." : "Acessar meu treino"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
