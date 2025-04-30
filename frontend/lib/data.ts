export const products = [
  {
    id: "gift-box-1",
    name: "Caja Deluxe para el Día del Padre",
    description:
      "Una caja de regalo premium para papá con todo lo que necesita para un día perfecto. Incluye snacks gourmet, una taza personalizada y más.",
    price: 89.99,
    compareAtPrice: 99.99,
    images: ["/box-image.png"],
    isNew: false,
    isOnSale: true,
    isComingSoon: false,
    categories: ["fathers-day", "for-football-fans"],
    occasions: ["fathers-day"],
    options: ["Estándar", "Premium", "Deluxe"],
    contents: [
      "Taza",
      "Remera",
      "Billetera de cuero",
      "Muestra de cerveza artesanal",
      "Mezcla de frutos secos gourmet",
    ],
    soldCount: 342,
  },
  // {
  //   id: "gift-box-2",
  //   name: "Caja de Spa para el Día de la Madre",
  //   description:
  //     "Consiente a mamá con un día de spa en casa con esta lujosa caja de regalo llena de productos premium para el baño y el cuerpo.",
  //   price: 79.99,
  //   image: "/box-image.png",
  //   rating: 4.9,
  //   reviewCount: 89,
  //   isNew: false,
  //   isBestseller: true,
  //   isOnSale: false,
  //   categories: ["mothers-day"],
  //   occasions: ["mothers-day", "birthday"],
  //   options: ["Lavanda", "Rosa", "Cítricos"],
  //   contents: [
  //     "Bombas de baño artesanales (3)",
  //     "Exfoliante corporal orgánico",
  //     "Vela aromática",
  //     "Toalla de baño suave",
  //     "Set de mascarillas faciales",
  //   ],
  //   reviews: [
  //     {
  //       name: "Sarah L.",
  //       rating: 5,
  //       comment:
  //         "¡Mi mamá estaba encantada con este regalo! Todo olía increíble.",
  //     },
  //     {
  //       name: "Emily R.",
  //       rating: 5,
  //       comment: "Productos de alta calidad y empaque hermoso.",
  //     },
  //   ],
  //   createdAt: "2023-02-10T00:00:00Z",
  //   soldCount: 278,
  // },
  // {
  //   id: "gift-box-3",
  //   name: "Caja Paraíso del Gamer",
  //   description:
  //     "El regalo definitivo para gamers con snacks, accesorios y artículos temáticos para mejorar su experiencia de juego.",
  //   price: 69.99,
  //   image: "/box-image.png",
  //   rating: 4.7,
  //   reviewCount: 56,
  //   isNew: true,
  //   isBestseller: false,
  //   isOnSale: false,
  //   categories: ["for-gamers", "birthday"],
  //   occasions: ["birthday", "graduation"],
  //   options: ["PC Gamer", "Consola Gamer"],
  //   contents: [
  //     "Alfombrilla para mouse de gaming",
  //     "Muestra de bebidas energéticas",
  //     "Mezcla de snacks para gaming",
  //     "Fundas para control",
  //     "Calcetines temáticos de gaming",
  //   ],
  //   reviews: [
  //     {
  //       name: "Alex T.",
  //       rating: 5,
  //       comment:
  //         "¡Regalo perfecto para mi amigo gamer! La alfombrilla es de calidad increíble.",
  //     },
  //     {
  //       name: "Ryan K.",
  //       rating: 4,
  //       comment: "Gran selección de artículos. Compraría de nuevo.",
  //     },
  //   ],
  //   createdAt: "2023-03-05T00:00:00Z",
  //   soldCount: 156,
  // },
  // {
  //   id: "gift-box-4",
  //   name: "Caja Gourmet para Chef",
  //   description:
  //     "Una selección curada de ingredientes y herramientas premium para el entusiasta de la cocina en tu vida.",
  //   price: 99.99,
  //   image: "/box-image.png",
  //   rating: 4.6,
  //   reviewCount: 42,
  //   isNew: false,
  //   isBestseller: false,
  //   isOnSale: false,
  //   categories: ["for-cooks", "housewarming"],
  //   occasions: ["housewarming", "wedding"],
  //   options: ["Italiana", "Asiática", "Mediterránea"],
  //   contents: [
  //     "Aceite de oliva artesanal",
  //     "Colección de especias gourmet",
  //     "Utensilios de cocina de madera",
  //     "Sal marina premium",
  //     "Libro de recetas",
  //   ],
  //   reviews: [
  //     {
  //       name: "Maria C.",
  //       rating: 5,
  //       comment:
  //         "La calidad de todo en esta caja es excepcional. Perfecto para un entusiasta de la cocina.",
  //     },
  //     {
  //       name: "David P.",
  //       rating: 4,
  //       comment:
  //         "Gran selección de artículos esenciales para cocinar. Las especias son increíbles.",
  //     },
  //   ],
  //   createdAt: "2023-04-20T00:00:00Z",
  //   soldCount: 98,
  // },
  // {
  //   id: "gift-box-5",
  //   name: "Caja para Fanáticos del Fútbol",
  //   description:
  //     "Todo lo que un entusiasta del fútbol necesita para el día del partido, incluyendo artículos temáticos del equipo y snacks.",
  //   price: 59.99,
  //   compareAtPrice: 69.99,
  //   image: "/box-image.png",
  //   rating: 4.5,
  //   reviewCount: 38,
  //   isNew: false,
  //   isBestseller: false,
  //   isOnSale: true,
  //   categories: ["for-football-fans", "fathers-day"],
  //   occasions: ["birthday", "fathers-day"],
  //   options: null,
  //   contents: [
  //     "Bufanda del equipo",
  //     "Mezcla de snacks para el partido",
  //     "Portavasos aislante",
  //     "Abrebotellas con colores del equipo",
  //     "Pelota antiestrés con forma de fútbol",
  //   ],
  //   reviews: [
  //     {
  //       name: "Thomas B.",
  //       rating: 4,
  //       comment:
  //         "Gran regalo para cualquier fanático del fútbol. La bufanda es de buena calidad.",
  //     },
  //     {
  //       name: "James L.",
  //       rating: 5,
  //       comment:
  //         "¡Perfecto para los días de partido! Todo es útil y divertido.",
  //     },
  //   ],
  //   createdAt: "2023-05-15T00:00:00Z",
  //   soldCount: 112,
  // },
  // {
  //   id: "gift-box-6",
  //   name: "Caja para Amantes del Mate",
  //   description:
  //     "Un set completo para entusiastas del mate, que incluye una calabaza tradicional, bombilla y variedades premium de yerba mate.",
  //   price: 49.99,
  //   image: "/box-image.png",
  //   rating: 4.9,
  //   reviewCount: 27,
  //   isNew: true,
  //   isBestseller: false,
  //   isOnSale: false,
  //   categories: ["for-mate-drinkers"],
  //   occasions: ["birthday", "housewarming"],
  //   options: ["Tradicional", "Moderno"],
  //   contents: [
  //     "Mate de calabaza artesanal",
  //     "Bombilla de acero inoxidable",
  //     "Selección premium de yerba mate",
  //     "Galletitas para mate",
  //     "Estuche de transporte",
  //   ],
  //   reviews: [
  //     {
  //       name: "Laura M.",
  //       rating: 5,
  //       comment:
  //         "Set de mate auténtico y de alta calidad. Regalo perfecto para cualquier amante del mate.",
  //     },
  //     {
  //       name: "Carlos R.",
  //       rating: 5,
  //       comment:
  //         "La calabaza es hermosa y la selección de yerba mate es excelente.",
  //     },
  //   ],
  //   createdAt: "2023-06-10T00:00:00Z",
  //   soldCount: 76,
  // },
  // {
  //   id: "gift-box-7",
  //   name: "Caja de Alegría Navideña",
  //   description:
  //     "Difunde el espíritu navideño con esta caja de regalo festiva llena de golosinas y decoraciones navideñas.",
  //   price: 79.99,
  //   image: "/box-image.png",
  //   rating: 4.7,
  //   reviewCount: 52,
  //   isNew: false,
  //   isBestseller: true,
  //   isOnSale: false,
  //   categories: ["christmas"],
  //   occasions: ["christmas"],
  //   options: null,
  //   contents: [
  //     "Adorno navideño artesanal",
  //     "Mezcla gourmet de chocolate caliente",
  //     "Selección de galletas navideñas",
  //     "Vela aromática festiva",
  //     "Calcetines navideños cómodos",
  //   ],
  //   reviews: [
  //     {
  //       name: "Jennifer K.",
  //       rating: 5,
  //       comment:
  //         "¡Perfecto regalo navideño! Todo es muy festivo y de alta calidad.",
  //     },
  //     {
  //       name: "Robert T.",
  //       rating: 4,
  //       comment:
  //         "Hermosamente empaquetado y el chocolate caliente es delicioso.",
  //     },
  //   ],
  //   createdAt: "2023-07-05T00:00:00Z",
  //   soldCount: 203,
  // },
  // {
  //   id: "gift-box-8",
  //   name: "Caja de Celebración de Cumpleaños",
  //   description:
  //     "Haz que su cumpleaños sea especial con esta divertida caja de regalo llena de golosinas y artículos para fiestas.",
  //   price: 54.99,
  //   image: "/box-image.png",
  //   rating: 4.8,
  //   reviewCount: 64,
  //   isNew: false,
  //   isBestseller: false,
  //   isOnSale: false,
  //   categories: ["birthday"],
  //   occasions: ["birthday"],
  //   options: ["Niños", "Adultos"],
  //   contents: [
  //     "Velas para pastel de cumpleaños",
  //     "Confeti explosivo",
  //     "Galletas gourmet de pastel de cumpleaños",
  //     "Tarjeta de cumpleaños",
  //     "Gorro de fiesta y matasuegras",
  //   ],
  //   reviews: [
  //     {
  //       name: "Michelle P.",
  //       rating: 5,
  //       comment:
  //         "¡Le envié esto a mi amiga para su cumpleaños y le encantó! Todo era perfecto.",
  //     },
  //     {
  //       name: "Brian S.",
  //       rating: 4,
  //       comment:
  //         "Divertida caja de regalo con artículos de buena calidad. ¡Las galletas fueron un éxito!",
  //     },
  //   ],
  //   createdAt: "2023-08-12T00:00:00Z",
  //   soldCount: 187,
  // },
];

export const featuredProducts = products
  .filter((product) => product.isNew)
  .slice(0, 4);
