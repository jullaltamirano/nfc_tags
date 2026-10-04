import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(
  request: Request,
  context: {
    params: Promise<{ cardId: string }>;
  }
) {
  const { cardId } = await context.params;

  // 1. Buscar la tarjeta
  const { data: card, error: cardError } = await supabase
    .from("nfc")
    .select("id, code, location_id, redirect_url, is_active, is_configured, employee_id")
    .eq("code", cardId)
    .single();

  // 2. Si no existe
  if (cardError || !card) {
    return new NextResponse("Tarjeta no encontrada", {
      status: 404,
    });
  }

  // 3. Si está desactivada
  if (!card.is_active) {
    return new NextResponse("Tarjeta inactiva", {
      status: 410,
    });
  }

  // 4. Si la tarjeta todavía no está configurada,
  // redirigir al setup antes de registrar el scan
  if (!card.is_configured) {
    const setupUrl = new URL(`/setup/${cardId}`, request.url);

    return NextResponse.redirect(setupUrl);
  }

  // 4. Registrar el scan
  const { error: scanError } = await supabase
    .from("nfc_scans")
    .insert({
      nfc_id: card.id,
      location_id: card.location_id,
      employee_id: card.employee_id,
    });

  if (scanError) {
    console.error("Error registrando scan:", scanError);
  }

  // 5. Redireccionar
  return NextResponse.redirect(card.redirect_url);
}