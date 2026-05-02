import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Evita middleware em API, `_next`, `favicon`/assets com extensão e arquivos do Vercel
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
