import { FALLBACK_WHATSAPP_PHONE } from "./constants";

export function whatsappDigits(): string {
  return (
    process.env.NEXT_PUBLIC_WHATSAPP_PHONE?.replace(/\D/g, "") ??
    FALLBACK_WHATSAPP_PHONE
  );
}

export function buildWhatsAppHref(message?: string): string {
  const phone = whatsappDigits();
  const base = `https://wa.me/${phone}`;
  if (!message?.trim()) return base;
  const params = new URLSearchParams({ text: message.trim() });
  return `${base}?${params.toString()}`;
}
