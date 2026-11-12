# Jalapão Gaviões do Cerrado

Site da agência de roteiros no Jalapão, Chapada das Mesas e Serra Gerais. A página está em português, inglês e espanhol. O contato é só pelo WhatsApp.

## Como rodar

```bash
npm install
npm run dev
```

Abra [http://localhost:3000/pt](http://localhost:3000/pt).

O número do WhatsApp fica em `lib/constants.ts` e pode ser trocado pela variável `NEXT_PUBLIC_WHATSAPP_PHONE` (só dígitos, com o 55). O modelo está em `.env.example`. O número atual é (63) 98403-3075.

A foto do início já vai comprimida (`public/images/hero/`). No celular o navegador baixa a versão de cerca de 40 KB; no computador, a de cerca de 200 KB. O texto do topo está no HTML, então a primeira tela aparece antes da foto terminar de baixar.

## Logo

O selo do menu continua no tamanho da faixa, para os links, as redes e o idioma caberem no celular. Uma cópia maior aparece no início da página, sobre a foto, para a marca ser lida sem esticar o menu.
