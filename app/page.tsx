import { routing } from "@/i18n/routing";

const home = `/${routing.defaultLocale}/`;

/** Exportação estática: o Apache do cPanel redireciona, e esta página cobre o acesso direto. */
export default function RootPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-brand-cream px-4 text-center text-brand-earth">
      <meta httpEquiv="refresh" content={`0; url=${home}`} />
      <p className="text-lg">Abrindo o site…</p>
      <a className="font-semibold text-brand-navy underline" href={home}>
        Entrar em Jalapão Gaviões do Cerrado
      </a>
      <script
        dangerouslySetInnerHTML={{
          __html: `location.replace(${JSON.stringify(home)})`,
        }}
      />
    </main>
  );
}
