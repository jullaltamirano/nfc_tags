"use client";

import { useRef, useState } from "react";
import GooglePlaceIdFinder, {
  type SelectedGooglePlace,
} from '@/components/GooglePlaceIdFinder';
import type { FormEvent } from "react";
import { supabase } from "@/lib/supabase";

function getMapsUrl(placeId: string) {
  const params = new URLSearchParams({ placeid: placeId });

  return `https://search.google.com/local/writereview?${params.toString()}`;
}

export default function PlaceIdSetup() {
  const [savedUrl, setSavedUrl] = useState("");
  const [selectedPlace, setSelectedPlace] = useState<SelectedGooglePlace | null>(null);
  const [ isLoading, setIsLoading ] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if(!selectedPlace) {
      return;
    }

    const value = selectedPlace?.id || "";

    setIsLoading(true);

    console.log(getMapsUrl(value));
    console.log(window.location.pathname.split("/").pop());

    const { data: existingCard, error: fetchError } = await supabase
      .from("nfc")
      .select("*")
      .eq("code", window.location.pathname.split("/").pop())
      .single();

      console.log(existingCard)

    const { error: scanError } = await supabase
      .from("nfc")
      .update({ redirect_url: getMapsUrl(value), is_configured: true })
      .eq("code", window.location.pathname.split("/").pop());

    if (scanError) {
      console.error("Error actualizando tarjeta:", scanError);
      setIsLoading(false);
      return;
    }

    const redirectUrl = `/card/${window.location.pathname.split("/").pop()}`;
    setSavedUrl(redirectUrl);
    setIsLoading(false);
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[radial-gradient(ellipse_at_12%_12%,rgba(207,231,215,0.55),transparent_32%),radial-gradient(ellipse_at_90%_88%,rgba(227,236,215,0.55),transparent_30%),#f6f8f5] px-5 py-12 font-sans text-[#17231f]">
      <section className="w-full max-w-[600px] rounded-[22px] border border-[#e1e8e2]/90 bg-white/[0.96] px-[22px] py-7 shadow-[0_24px_70px_rgba(30,54,41,0.09),0_2px_8px_rgba(30,54,41,0.03)] sm:px-[42px] sm:py-9" aria-labelledby="setup-title">

        <p className="mb-[9px] mt-7 text-[10px] font-bold tracking-[1.25px] text-[#176b4b] sm:mt-[34px]">CONFIGURA TU TARJETA</p>
        <h1 id="setup-title" className="max-w-[440px] text-[clamp(27px,5vw,34px)] font-extrabold leading-[1.17] tracking-[-1.2px]">
          CONECTA TU TARJETA CON TU NEGOCIO
        </h1>
        <p className="mb-7 mt-3 text-[14px] leading-[1.65] text-[#69756f]">
          Sigue estos pasos para que quien acerque su teléfono llegue a tu negocio en Google Maps.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <ol className="m-0 flex list-none flex-col p-0">
            <li className="relative grid grid-cols-[34px_minmax(0,1fr)] gap-[14px] pb-6 after:absolute after:bottom-px after:left-4 after:top-[34px] after:w-px after:bg-[#dce6df] after:content-['']">
              <span className="z-10 grid size-[34px] place-items-center rounded-full border border-[#d9e7dd] bg-[#f1f7f2] text-[13px] font-bold text-[#176b4b]" aria-hidden="true">1</span>
              <div className="min-w-0 pt-0.5">
                <h2 className="text-[14px] font-bold leading-[1.5]">Busca tu negocio en el mapa</h2>
                <GooglePlaceIdFinder onPlaceSelected={setSelectedPlace} />

                {selectedPlace && (
                  <aside className="mt-2">
                    <p className="text-xs">{selectedPlace.name}</p>
                    <p className="text-xs">{selectedPlace.address}</p>
                  </aside>
                )}
              </div>
            </li>

            <li className="grid grid-cols-[34px_minmax(0,1fr)] gap-[14px] pb-6">
              <span className="z-10 grid size-[34px] place-items-center rounded-full border border-[#d9e7dd] bg-[#f1f7f2] text-[13px] font-bold text-[#176b4b]" aria-hidden="true">2</span>
              <div className="min-w-0 pt-0.5">
                <h2 className="text-[14px] font-bold leading-[1.5]">Guarda la configuración</h2>
                <p className="mt-1 text-[12px] leading-[1.55] text-[#69756f]">Confirma que el negocio seleccionado es el correcto, esta acción es irreversible</p>
              </div>
            </li>
          </ol>

          <button 
            className="cursor-pointer flex h-12 w-full items-center justify-center gap-[9px] rounded-[10px] bg-[#176b4b] text-[13px] font-bold text-white transition hover:-translate-y-px hover:bg-[#12583e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#176b4b]/25"
            type="submit"
            disabled={!selectedPlace}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" aria-hidden="true" />
                Confirmando...
              </span>
            ) : (
              <span>Confirmar mi enlace <span aria-hidden="true">→</span></span>
            )}
          </button>
        </form>

        {savedUrl && (
          <div className="mt-[18px] flex gap-3 rounded-[11px] border border-[#cfe5d4] bg-[#f1f8f1] p-[14px] text-[12px] leading-[1.5] text-[#234c32]" role="status">
            <span className="grid size-[22px] shrink-0 place-items-center rounded-full bg-[#176b4b] text-[13px] font-bold text-white" aria-hidden="true">✓</span>
            <div>
              <p><strong className="font-bold">Tarjeta configurada con éxito!</strong></p>
              <a className="font-bold text-[#176b4b] no-underline hover:underline" href={savedUrl} target="_blank" rel="noreferrer">Ver enlace de destino ↗</a>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
