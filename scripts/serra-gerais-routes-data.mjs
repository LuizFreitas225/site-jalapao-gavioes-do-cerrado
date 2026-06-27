/** Dados consolidados a partir dos PDFs em Site/Site_/roteiros/Serra Gerais/ */

export const packageInfo = {
  included: [
    "Hospedagens durante a expedição (café da manhã incluso)",
    "Taxa de visitação — acesso aos atrativos",
    "Almoço e jantar durante a expedição",
    "Transporte em veículos 4×4",
    "Guia credenciado ao órgão responsável",
    "Água mineral e cooler disponível",
  ],
  notIncluded: [
    "Bebidas alcoólicas e bebidas durante as refeições",
    "Hospedagem e alimentação em Palmas-TO",
    "Frigobar e outros gastos de natureza pessoal",
    "Taxa ambiental",
    "Qualquer item não listado na seção incluso",
    "Passagem aérea",
  ],
};

export const routes = [
  {
    id: "roteiro-4-dias",
    name: "Roteiro Completo",
    days: 4,
    subtitle:
      "Quatro dias entre cânions, cachoeiras, rios cristalinos e a Lagoa da Serra no sul do Tocantins",
    highlights: [
      "Arco do Sol",
      "Cânion Encantado",
      "Cidade de Pedras",
      "Rio Azuis",
      "Lagoa da Serra",
    ],
    base: "Ponte Alta / Pindorama → Dianópolis → Aurora",
    days_detail: [
      {
        title: "1º Dia",
        items: [
          "Saída de Palmas",
          "Arco do Sol",
          "Almoço",
          "Cachoeira do Urubu Rei",
          "Cachoeira da Cortina",
          "Check-in na pousada",
          "Jantar",
        ],
      },
      {
        title: "2º Dia",
        items: [
          "Café da manhã",
          "Cânion Encantado (aprox. 11 km de trilhas com escadaria)",
          "Almoço",
          "Cidade de Pedras",
          "Cachoeira dos Pelados",
          "Check-in na pousada",
          "Jantar",
        ],
      },
      {
        title: "3º Dia",
        items: [
          "Café da manhã",
          "Praia do Puçá",
          "Praia do Pequizeiro",
          "Almoço",
          "Rio Azuis",
          "Check-in na pousada",
          "Jantar",
        ],
      },
      {
        title: "4º Dia",
        items: [
          "Café da manhã",
          "Lagoa da Serra",
          "Almoço",
          "Retorno a Palmas",
        ],
      },
    ],
  },
  {
    id: "roteiro-5-dias",
    name: "Roteiro Aventureiro",
    days: 5,
    subtitle:
      "Um dia a mais para Pedra Furada e Lagoa do Japonês, além dos principais atrativos da Serra Gerais",
    highlights: [
      "Pedra Furada",
      "Lagoa do Japonês",
      "Arco do Sol",
      "Cânion Encantado",
      "Rio Azuis e Lagoa da Serra",
    ],
    base: "Ponte Alta / Pindorama → Dianópolis → Aurora",
    days_detail: [
      {
        title: "1º Dia",
        items: [
          "Saída de Palmas",
          "Pedra Furada",
          "Almoço",
          "Lagoa do Japonês",
          "Check-in na pousada",
          "Jantar",
        ],
      },
      {
        title: "2º Dia",
        items: [
          "Café da manhã",
          "Arco do Sol",
          "Almoço",
          "Cachoeira do Urubu Rei",
          "Cachoeira da Cortina",
          "Check-in na pousada",
          "Jantar",
        ],
      },
      {
        title: "3º Dia",
        items: [
          "Café da manhã",
          "Cânion Encantado (aprox. 11 km de trilhas com escadaria)",
          "Almoço",
          "Cidade de Pedras",
          "Cachoeira dos Pelados",
          "Check-in na pousada",
          "Jantar",
        ],
      },
      {
        title: "4º Dia",
        items: [
          "Café da manhã",
          "Praia do Puçá",
          "Praia do Pequizeiro",
          "Almoço",
          "Rio Azuis",
          "Check-in na pousada",
          "Jantar",
        ],
      },
      {
        title: "5º Dia",
        items: [
          "Café da manhã",
          "Lagoa da Serra",
          "Almoço",
          "Retorno a Palmas",
        ],
      },
    ],
  },
];
