import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

const CURRENT_TERMS_VERSION = Number(process.env.CURRENT_TERMS_VERSION ?? 1);

export async function POST(req: Request) {
  try {
    // tenta pegar do cookie ou do body (pra funcionar localmente)
    const cookieStore = await cookies();
    let userId = cookieStore.get("userId")?.value;

    if (!userId) {
      const body = await req.json().catch(() => null);
      userId = body?.userId;
    }

    if (!userId) {
      return NextResponse.json({ error: "Usuária não autenticada" }, { status: 401 });
    }

    const { error } = await supabaseAdmin
      .from("users")
      .update({
        termsVersion: CURRENT_TERMS_VERSION,
        termsAcceptedAt: new Date().toISOString(),
      })
      .eq("id", userId);

    if (error) {
      console.error("[terms/accept] erro:", error);
      return NextResponse.json({ error: "Erro ao salvar aceite" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[terms/accept] erro interno:", e);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
