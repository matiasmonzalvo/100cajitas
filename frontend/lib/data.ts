export const products = [
  {
    id: "gift-box-1",
    name: "Caja Deluxe para el Día del Padre",
    description:
      "Una caja de regalo premium para papá con todo lo que necesita para un día perfecto. Incluye snacks gourmet, una taza personalizada y más.",
    price: 29999.99,
    compareAtPrice: 99.99,
    coverImage: "/box-image.png",
    images: [
      {
        id: "main",
        url: "/box-image.png",
        alt: "Vista principal de la caja de regalo",
      },
      {
        id: "mug",
        url: "https://images.pexels.com/photos/1793034/pexels-photo-1793034.jpeg",
        alt: "Taza",
        itemId: "mug",
      },
      {
        id: "tshirt",
        url: "https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg",
        alt: "Remera",
        itemId: "tshirt",
      },
      {
        id: "wallet",
        url: "/billetera-wilson.jpg",
        alt: "Billetera",
        itemId: "wallet",
      },
      {
        id: "llavero",
        url: "/billetera-wilson.jpg",
        alt: "Billetera",
        itemId: "llavero",
      },
    ],
    variantImages: {
      mug: {
        "design-1":
          "https://images.pexels.com/photos/1793034/pexels-photo-1793034.jpeg",
        "design-2":
          "https://images.pexels.com/photos/1793035/pexels-photo-1793035.jpeg",
        "design-3":
          "https://images.pexels.com/photos/1793036/pexels-photo-1793036.jpeg",
      },
      tshirt: {
        "model-1": {
          black:
            "https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg",
          white:
            "https://images.pexels.com/photos/1656685/pexels-photo-1656685.jpeg",
          blue: "https://images.pexels.com/photos/1656686/pexels-photo-1656686.jpeg",
        },
        "model-2": {
          black:
            "https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg",
          white:
            "https://images.pexels.com/photos/1656685/pexels-photo-1656685.jpeg",
          blue: "https://images.pexels.com/photos/1656686/pexels-photo-1656686.jpeg",
        },
        "model-3": {
          black:
            "https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg",
          white:
            "https://images.pexels.com/photos/1656685/pexels-photo-1656685.jpeg",
          blue: "https://images.pexels.com/photos/1656686/pexels-photo-1656686.jpeg",
        },
      },
      wallet: {
        classic: "/billetera-wilson.jpg",
        slim: "/billetera-ona.webp",
        bifold:
          "https://images.pexels.com/photos/2079440/pexels-photo-2079440.jpeg",
      },
    },
    isNew: false,
    isOnSale: true,
    isComingSoon: false,
    categories: ["fathers-day", "for-football-fans"],
    occasions: ["fathers-day"],
    options: ["Estándar", "Premium", "Deluxe"],
    items: [
      {
        id: "mug",
        name: "Taza",
        description: "Taza de cerámica de alta calidad con diseños exclusivos.",
        customizable: true,
        options: {
          design: {
            label: "Diseño",
            required: true,
            values: [
              { id: "design-1", name: "Diseño #1" },
              { id: "design-2", name: "Diseño #2" },
              { id: "design-3", name: "Diseño #3" },
            ],
          },
        },
      },
      {
        id: "tshirt",
        name: "Remera",
        description: "Remera 100% algodón con diseños exclusivos para papá.",
        customizable: true,
        options: {
          model: {
            label: "Modelo",
            required: true,
            values: [
              { id: "model-1", name: "Modelo #1" },
              { id: "model-2", name: "Modelo #2" },
              { id: "model-3", name: "Modelo #3" },
            ],
          },
          size: {
            label: "Talle",
            required: true,
            values: [
              { id: "s", name: "S" },
              { id: "m", name: "M" },
              { id: "l", name: "L" },
              { id: "xl", name: "XL" },
            ],
          },
          color: {
            label: "Color",
            required: true,
            values: [
              { id: "black", name: "Negro", colorCode: "#000000" },
              { id: "white", name: "Blanco", colorCode: "#FFFFFF" },
              { id: "blue", name: "Azul", colorCode: "#0047AB" },
            ],
          },
        },
      },
      {
        id: "wallet",
        name: "Billetera de cuero",
        description:
          "Billetera artesanal de cuero genuino en diferentes modelos.",
        customizable: true,
        options: {
          model: {
            label: "Modelo",
            required: true,
            values: [
              { id: "classic", name: "Clásica" },
              { id: "slim", name: "Slim" },
              { id: "bifold", name: "Bi-fold" },
            ],
          },
        },
      },
      {
        id: "beer",
        name: "Muestra de cerveza artesanal",
        description: "Selección de cervezas artesanales premium.",
        customizable: false,
      },
      {
        id: "keychain",
        name: "Llavero",
        description: "Llavero metálico personalizado.",
        customizable: false,
      },
    ],
    contents: [
      "Taza",
      "Remera",
      "Billetera de cuero",
      "Muestra de cerveza artesanal",
      "Llavero",
    ],
    soldCount: 342,
  },
];
