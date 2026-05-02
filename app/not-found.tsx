import Link from "next/link";

export default function GlobalNotFound() {
  return (
    <html lang="pt-BR">
      <body className="flex min-h-screen flex-col items-center justify-center bg-[#faf6ef] px-4 text-center text-[#2d2319]">
        <h1 className="text-2xl font-semibold">Página não encontrada</h1>
        <p className="mt-2 max-w-md text-sm">
          O endereço pode ter mudado ou o conteúdo não está mais disponível.
        </p>
        <Link
          className="mt-6 rounded-full bg-[#c9a03a] px-5 py-2 text-sm font-semibold text-[#152238]"
          href="/pt"
        >
          Voltar ao início
        </Link>
      </body>
    </html>
  );
}
