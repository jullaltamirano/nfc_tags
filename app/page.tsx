"use client";

import Link from "next/link";
import { ArrowRight, Check, ChevronRight, CircleCheck, MessageCircle, QrCode as QrCodeIcon, ScanLine, Wifi } from "lucide-react";

const products = [
  {
    name: "Tarjeta NFC",
    eyebrow: "La favorita de tu equipo",
    description: "Llévala siempre contigo y convierte cada atención en una nueva oportunidad de reseña.",
    price: "S/ 29.90",
    accent: "bg-[#10263f]",
  },
  {
    name: "Acrílico de counter",
    eyebrow: "Visible en cada visita",
    description: "Un punto de contacto elegante para que tus clientes dejen su opinión antes de irse.",
    price: "S/ 49.90",
    accent: "bg-[#d7dde0]",
  },
];

const benefits = [
  [
    "Más confianza",
    "Las reseñas positivas hacen que nuevos clientes elijan tu negocio con seguridad.",
  ],
  [
    "Más visibilidad",
    "Google toma en cuenta la cantidad y calidad de tus reseñas para posicionarte mejor.",
  ],
  [
    "Más conversiones",
    "Una excelente reputación digital se transforma en más visitas, reservas y ventas.",
  ],
];

const whatsapp = "https://wa.me/51999999999?text=Hola%2C%20quiero%20cotizar%20tarjetas%20NFC";

const BrandMark = () => {
  return (
    <span className="inline-flex size-7 rotate-45 items-center justify-center rounded-lg bg-[#10263f]" aria-hidden="true">
      <span className="size-2.5 rounded-[3px] bg-white" />
    </span>
  );
}

const ProductVisual = ({ accent, small = false }: { accent: string; small?: boolean}) => {
  return (
    <div className={`relative grid ${small ? "h-[285px]" : "h-[400px]"} w-full place-items-center overflow-hidden ${accent} ${small ? "rounded-none" : "rounded-[22px]"} shadow-[25px_30px_55px_rgba(16,38,63,.15)]`}
      aria-label={
        accent.includes("10263f")
          ? "Vista de tarjeta NFC"
          : "Vista de acrílico para counter"
      }
    >
      <div className="absolute inset-0 rotate-12 scale-125 opacity-15 [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className={`z-[1] flex ${small ? "h-[230px] w-[170px] p-4" : "h-[355px] w-[225px] p-5"} rotate-[-8deg] flex-col justify-between rounded-[13px] bg-[#f9faf9] text-[#10263f] shadow-[0_15px_35px_rgba(0,0,0,.13)]`}>
        <div className="flex items-center gap-1.5 text-[10px] font-extrabold tracking-[-.05em]">
          <BrandMark />
          <span>reviewlink</span>
        </div>
        <div className={`${small ? "text-xl" : "text-[27px]"} leading-[.98] tracking-[-.08em]`}>
          Haz que tu<br /><strong className="text-[#87929a]">opinión cuente.</strong>
        </div>
        <div className="flex items-center gap-2 text-[7px] leading-tight text-[#6c7881]">
          <QrCodeIcon className="size-9 text-[#10263f]" />
          <span>Acerca tu celular<br />y déjanos 5 estrellas</span>
        </div>
      </div>
      <div className="absolute bottom-7 right-[28%] z-[2] grid size-10 place-items-center rounded-full bg-[#c9d8e0] text-[#10263f]">
        <Wifi className="size-5" />
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <main className="text-[#10263f]">
      <header className="sticky top-0 z-10 flex h-[82px] items-center justify-between border-b border-[#eef0f2] bg-white px-6 lg:px-[max(24px,calc((100vw-1180px)/2))]">
        <Link href="#inicio" className="flex items-center gap-2.5 text-[21px] font-extrabold tracking-[-.06em]">
          <BrandMark />
          <span>review<span className="text-[#7c8790]">link</span></span>
        </Link>
        <nav className="hidden gap-8 text-[13px] font-semibold text-[#6a747e] md:flex" aria-label="Navegación principal">
          <Link href="#soluciones">Soluciones</Link>
          <Link href="#beneficios">Beneficios</Link>
          <Link href="#precios">Precios</Link>
          <Link href="#contacto">Contacto</Link>
        </nav>
        <Link href={whatsapp} target="_blank" className="flex items-center gap-2 text-[13px] font-bold">
          Quiero cotizar <ArrowRight className="size-4" />
        </Link>
      </header>
      <section id="inicio" className="mx-auto grid min-h-[630px] w-[calc(100%-48px)] max-w-[1180px] items-center gap-10 py-14 md:grid-cols-2">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[.15em] text-[#60707f]">
            <span className="size-2 rounded-full bg-[#2b83b6] ring-4 ring-[#e7f3f9]" />Reputación que trabaja por ti
          </div>
          <h1 className="my-6 max-w-[620px] text-[clamp(42px,5vw,70px)] font-bold leading-[1.02] tracking-[-.065em]">
            Convierte cada visita en una
            <em className="not-italic text-[#83909b]">reseña de 5 estrellas.</em>
          </h1>
          <p className="max-w-[480px] text-[17px] leading-[1.6] text-[#697681]">
            Tarjetas NFC y acrílicos con QR para que tus clientes recomienden tu negocio en Google en segundos.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-7">
            <Link href="#precios" className="inline-flex items-center gap-2 rounded-md bg-[#10263f] px-5 py-3.5 text-[13px] font-bold text-white shadow-lg shadow-[#10263f]/15">
              Ver soluciones <ArrowRight className="size-4" />
            </Link>
            <Link href="#beneficios" className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[#52616e]">
              ¿Por qué funciona? <ChevronRight className="size-4" />
            </Link>
          </div>
          <div className="mt-10 flex items-center gap-3 text-xs text-[#71808b]">
            <span className="flex -space-x-2">
              <i className="grid size-7 place-items-center rounded-full border-2 border-white bg-[#d9e5ea] not-italic">J</i>
              <i className="grid size-7 place-items-center rounded-full border-2 border-white bg-[#bfd0d9] not-italic">M</i>
              <i className="grid size-7 place-items-center rounded-full border-2 border-white bg-[#aabfc9] not-italic">A</i>
            </span>
            Más de <strong>500 negocios</strong> mejorando su reputación
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-[500px]">
          <ProductVisual accent="bg-[#10263f]" />
          <div className="absolute right-0 top-14 rounded-[10px] border border-[#e8ecee] bg-white px-4 py-3 shadow-xl">
            <div className="text-[11px] tracking-[2px] text-[#e2a52e]">
              ★★★★★
            </div>
            <strong className="text-lg">5.0</strong>
            <span className="ml-2 text-[10px] text-[#89939b]">Google Reviews</span>
          </div>
          <div className="absolute bottom-16 left-0 flex items-center gap-2 rounded-[10px] border border-[#e8ecee] bg-white px-4 py-3 text-xs shadow-xl">
            <ScanLine className="size-4 text-[#3b829f]" />
            Acerca tu celular
          </div>
        </div>
      </section>
      <section id="soluciones" className="bg-[#f3f5f6] py-12">
        <div className="mx-auto flex w-[calc(100%-48px)] max-w-[1180px] flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-[.15em] text-[#60707f]">Una experiencia, dos formatos</span>
            <h2 className="mt-3 text-[37px] font-bold leading-tight tracking-[-.055em]">Tu marca, en el momento exacto.</h2>
          </div>
          <p className="max-w-[420px] text-sm leading-relaxed text-[#78848d]">Diseñadas para integrarse naturalmente a tu negocio y hacer que pedir una reseña sea fácil, rápido y elegante.</p>
        </div>
      </section>
      <section id="precios" className="mx-auto w-[calc(100%-48px)] max-w-[1180px] py-24">
        <div className="mb-11 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-[.15em] text-[#60707f]">Elige tu formato</span>
            <h2 className="mt-3 text-[37px] font-bold leading-tight tracking-[-.055em]">
              Pequeños detalles.
              <br /><span className="text-[#85919a]">Grandes resultados.</span>
            </h2>
          </div>
          <p className="max-w-[290px] text-[13px] leading-relaxed text-[#77838c]">
            Incluye NFC + QR personalizado con el enlace directo a tu perfil de Google.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {products.map((product) => (
            <article className="overflow-hidden rounded-[10px] border border-[#e2e7e9]" key={product.name}>
              <ProductVisual accent={product.accent} small={product.name.includes("Acrílico")}/>
              <div className="grid gap-4 p-7">
                <div className="flex justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#8b969e]">{product.eyebrow}</span>
                    <h3 className="mt-1 text-2xl font-bold tracking-[-.05em]">{product.name}</h3>
                  </div>
                  <div className="text-right">
                    <strong className="block text-xl">{product.price}</strong>
                    <span className="text-[10px] text-[#89939b]">por unidad</span>
                  </div>
                </div>
                <p className="text-[13px] leading-relaxed text-[#78838c]">{product.description}</p>
                <Link href={whatsapp} target="_blank" className="flex justify-between border-t border-[#e9edef] pt-4 text-xs font-extrabold text-[#356d8d]">
                  Cotizar este producto <ArrowRight className="size-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section id="beneficios" className="mx-auto grid w-[calc(100%-48px)] max-w-[1180px] gap-12 pb-28 md:grid-cols-2 md:gap-20">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-[.15em] text-[#60707f]">El poder de una buena reseña</span>
          <h2 className="mt-3 text-[37px] font-bold leading-tight tracking-[-.055em]">
            Cuando tus clientes hablan,<br />
            <span className="text-[#85919a]">Google te escucha.</span>
          </h2>
          <p className="mt-6 max-w-[370px] text-sm leading-relaxed text-[#78838c]">
            La reputación online ya no es opcional. Haz que cada experiencia positiva se convierta en una recomendación pública.
          </p>
        </div>
        <div className="border-t border-[#dfe4e8]">
          {benefits.map(([title, text], index) => (
            <div className="grid grid-cols-[42px_1fr_auto] gap-4 border-b border-[#dfe4e8] py-6" key={title}>
              <span className="text-[11px] font-bold text-[#9ca8b0]">0{index + 1}</span>
              <div>
                <h3 className="mb-2 text-[17px] font-bold">{title}</h3>
                <p className="max-w-[300px] text-xs leading-relaxed text-[#7b8790]">
                  {text}
                </p>
              </div>
              <CircleCheck className="size-5 text-[#4e99ae]" />
            </div>
          ))}
        </div>
      </section>
      <section className="overflow-hidden bg-[#10263f] py-20 text-white">
        <div className="mx-auto grid w-[calc(100%-48px)] max-w-[1180px] items-center gap-12 md:grid-cols-2">
          <div className="grid min-h-[280px] place-items-center">
            <div className="rotate-[-8deg] rounded-2xl bg-white p-5 shadow-2xl">
              <div className="grid w-[143px] grid-cols-7 gap-1">
                {Array.from({ length: 49 }).map((_, i) => (
                  <i key={i} className={`size-[17px] ${(i * 7 + i * i) % 5 < 2 || [0, 1, 7, 8, 42, 43, 48, 49].includes(i) ? "bg-[#10263f]" : "bg-white"}`}/>
                ))}
              </div>
            </div>
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-[.15em] text-[#b7cad4]">NFC + QR incluido</span>
            <h2 className="mt-3 max-w-[450px] text-[44px] font-bold leading-tight tracking-[-.055em]">
              Dos formas de llegar a tu reseña.
            </h2>
            <p className="max-w-[430px] text-sm leading-relaxed text-[#a5b3be]">
              El NFC conecta de inmediato. El QR funciona con cualquier cámara. Tu cliente siempre tendrá una forma simple de compartir su experiencia.
            </p>
            <ul className="my-6 flex flex-wrap gap-x-6 gap-y-3 text-xs text-[#dce5ea]">
              <li>
                <Check className="mr-1 inline size-4 text-[#79c1cd]" />
                Sin apps ni descargas
              </li>
              <li>
                <Check className="mr-1 inline size-4 text-[#79c1cd]" />
                Enlace directo a Google
              </li>
              <li>
                <Check className="mr-1 inline size-4 text-[#79c1cd]" />
                Personalizado con tu marca
              </li>
            </ul>
            <Link href="#contacto" className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-3.5 text-[13px] font-bold text-[#10263f]">
              Quiero el mío <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
      <section id="contacto" className="mx-auto w-[calc(100%-48px)] max-w-[1180px] py-24">
        <div className="flex flex-col justify-between gap-8 rounded-xl bg-[#edf1f2] p-7 md:flex-row md:items-center md:p-14">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-[.15em] text-[#60707f]">
              ¿Listo para destacar?
            </span>
            <h2 className="my-4 text-[38px] font-bold leading-tight tracking-[-.055em]">
              ¿Quieres por mayor o iniciar tu propio negocio NFC?
              <br />
              <em className="not-italic text-[#83909b]">Haz clic y conversemos.</em>
            </h2>
            <p className="max-w-[430px] text-sm leading-relaxed text-[#71808b]">
              Cuéntanos cuántas unidades necesitas y te enviamos una cotización personalizada para tu negocio.
            </p>
          </div>
          <div className="flex flex-col items-start gap-4">
            <Link href="/contacto" className="inline-flex items-center gap-2 rounded-md bg-[#10263f] px-5 py-3.5 text-[13px] font-bold text-white">
              <MessageCircle className="size-4" /> Cotizar por mayor{" "}
              <ArrowRight className="size-4" />
            </Link>
            <Link href={whatsapp} target="_blank" className="text-xs font-bold text-[#5c7381]">
              Contacto directo por WhatsApp
            </Link>
          </div>
        </div>
      </section>
      <footer className="border-t border-[#e7ebed] py-7">
        <div className="mx-auto flex w-[calc(100%-48px)] max-w-[1180px] flex-col gap-4 text-xs text-[#8b969e] md:flex-row md:items-center md:justify-between">
          <Link href="#inicio" className="flex items-center gap-2.5 text-[21px] font-extrabold tracking-[-.06em] text-[#10263f]">
            <BrandMark />
            review<span className="text-[#7c8790]">link</span>
          </Link>
          <p>Tu reputación, en buenas manos.</p>
          <span>© 2025 reviewlink</span>
        </div>
      </footer>
    </main>
  );
}
