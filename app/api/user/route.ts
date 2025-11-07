import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("userId")?.value;
    if (!userId) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

    const supabase = getSupabaseAdmin();
    const { data, error, status } = await supabase
      .from("users")
      .select("id, email, name, hasCompletedQuiz, termsVersion, termsAcceptedAt")
      .eq("id", userId)
      .maybeSingle();

    if (error || !data) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: status || 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    return NextResponse.json({ error: "Erro ao buscar usuário" }, { status: 500 });
  }
}
