import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

const CURRENT_TERMS_VERSION = Number(process.env.CURRENT_TERMS_VERSION ?? 1);

export async function POST() {
  try {
    const cookieStore = await cookies();
    const cookieUserId = cookieStore.get("userId")?.value;
    let userId = cookieUserId;

    // opcional: também aceitar via body em dev
    if (!userId) {
      const body = await new Response().json().catch(() => null);
      userId = (body as any)?.userId;
    }

    if (!userId) {
      return NextResponse.json({ error: "Usuária não autenticada" }, { status: 401 });
    }

    const supabase = getSupabaseAdmin();
    const { error } = await supabase
      .from("users")
      .update({
        termsVersion: CURRENT_TERMS_VERSION,
        termsAcceptedAt: new Date().toISOString(),
      })
      .eq("id", userId);

    if (error) {
      console.error("[terms/accept] supabase error:", error);
      return NextResponse.json({ error: "Erro ao salvar aceite" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[terms/accept] POST exception:", e);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
