# Jalapão Gaviões do Cerrado

Site da agência de roteiros no Jalapão, Chapada das Mesas e Serra Gerais. A página está em português, inglês e espanhol. O contato é só pelo WhatsApp.

## Como rodar

```bash
npm install
npm run dev
```

Abra [http://localhost:3000/pt](http://localhost:3000/pt).

Para o cPanel da HostGator, rode `npm run build`. A pasta `out` (copiada também para `public_html`) é o site pronto: envie o conteúdo dela para a `public_html` do domínio, incluindo o `index.html` e o `.htaccess`. O domínio precisa estar na raiz, porque os caminhos começam com `/`.

O número do WhatsApp fica em `lib/constants.ts` e pode ser trocado pela variável `NEXT_PUBLIC_WHATSAPP_PHONE` (só dígitos, com o 55). O modelo está em `.env.example`. O número atual é (63) 98403-3075. O contato na página é só o botão do WhatsApp.
