/**
 * Datos del menú — Cafetería Demo
 * -------------------------------
 * Editá únicamente este archivo para agregar, modificar o quitar productos,
 * precios y etiquetas sin tocar el HTML, el CSS ni el resto de la aplicación.
 *
 * Estructura de cada ítem:
 *   - id: identificador único en minúsculas (sin espacios)
 *   - category: debe coincidir con el "id" de una de las categorías
 *   - name: nombre visible del producto
 *   - description: descripción breve (1–2 líneas)
 *   - price: precio numérico ficticio en pesos (ej. 3200 -> "$ 3.200")
 *   - tags: arreglo opcional de etiquetas (ej. ["vegano", "sin TACC"])
 */
globalThis.CAFETERIA_MENU = {
  currency: "$",
  note: "Precios expresados en pesos argentinos · Consultá opciones con leche vegetal sin cargo extra.",
  categories: [
    { id: "cafes", label: "Cafés" },
    { id: "frios", label: "Fríos" },
    { id: "pasteleria", label: "Pastelería" },
    { id: "salado", label: "Salado" }
  ],
  items: [
    {
      id: "espresso-doble",
      category: "cafes",
      name: "Espresso doble",
      description: "Extracción equilibrada de nuestro blend de la casa, con notas a cacao amargo y avellana tostada.",
      price: 3200,
      tags: ["clásico", "vegano"]
    },
    {
      id: "flat-white",
      category: "cafes",
      name: "Flat White",
      description: "Doble shot de espresso cubierto con una capa fina y sedosa de leche texturizada.",
      price: 4100,
      tags: ["de la casa"]
    },
    {
      id: "filtrado-v60",
      category: "cafes",
      name: "Filtrado V60 de origen",
      description: "Preparado al momento por goteo manual para resaltar acidez frutal y cuerpo limpio.",
      price: 4600,
      tags: ["origen único", "vegano"]
    },
    {
      id: "cortado-vaso",
      category: "cafes",
      name: "Cortado en vaso",
      description: "Espresso intenso suavizado con un toque justo de leche vaporizada o bebida de avena.",
      price: 3600,
      tags: ["opción vegetal"]
    },
    {
      id: "cold-brew",
      category: "frios",
      name: "Cold Brew 18 horas",
      description: "Infusión en frío de molienda gruesa, perfil achocolatado y amargor muy bajo.",
      price: 4500,
      tags: ["vegano", "sin azúcar"]
    },
    {
      id: "espresso-tonic",
      category: "frios",
      name: "Espresso Tonic",
      description: "Agua tónica bien fría, hielo cristalino, doble espresso y piel de naranja fresca.",
      price: 4800,
      tags: ["vegano", "cítrico"]
    },
    {
      id: "iced-latte-avena",
      category: "frios",
      name: "Latte helado de avena",
      description: "Bebida cremosa de avena barista con doble espresso y un toque sutil de vainilla natural.",
      price: 4900,
      tags: ["vegano"]
    },
    {
      id: "limonada-menta",
      category: "frios",
      name: "Limonada con menta y jengibre",
      description: "Exprimido natural de limón, jengibre rallado y hojas frescas de menta.",
      price: 3900,
      tags: ["vegano", "sin cafeína"]
    },
    {
      id: "medialuna-manteca",
      category: "pasteleria",
      name: "Medialuna de manteca",
      description: "Hojaldrado tibio de fermentación lenta con almíbar ligero de cáscara de limón.",
      price: 2100,
      tags: ["horneado del día"]
    },
    {
      id: "roll-cardamomo",
      category: "pasteleria",
      name: "Roll de cardamomo y canela",
      description: "Masa brioche trenzada a mano con especias aromáticas y azúcar mascabo.",
      price: 3400,
      tags: ["artesanal"]
    },
    {
      id: "budin-cacao-naranja",
      category: "pasteleria",
      name: "Budín de cacao y naranja",
      description: "Miga húmeda a base de aceite de oliva suave, cacao puro y ralladura de naranja.",
      price: 3700,
      tags: ["vegano"]
    },
    {
      id: "tarta-vasca",
      category: "pasteleria",
      name: "Porción de tarta vasca",
      description: "Centro cremoso y superficie caramelizada al horno fuerte, sin base de harina.",
      price: 5200,
      tags: ["sin TACC"]
    },
    {
      id: "toston-palta",
      category: "salado",
      name: "Tostón de palta y semillas",
      description: "Pan de masa madre tostado con palta pisada, limón, sésamo tostado y brotes.",
      price: 6400,
      tags: ["vegano", "masa madre"]
    },
    {
      id: "croissant-relleno",
      category: "salado",
      name: "Croissant de jamón y queso",
      description: "Pieza hojaldrada tibia rellena con queso semi-duro fundido y jamón natural.",
      price: 5800,
      tags: ["clásico"]
    },
    {
      id: "focaccia-tomate",
      category: "salado",
      name: "Focaccia de tomates y romero",
      description: "Fermentación de 24 horas con aceite de oliva, tomates confitados y sal marina.",
      price: 5500,
      tags: ["vegano"]
    },
    {
      id: "sandwich-hongos",
      category: "salado",
      name: "Sándwich tibio de hongos y brie",
      description: "Portobellos salteados al tomillo, queso brie fundido y cebollas caramelizadas en pan rústico.",
      price: 6900,
      tags: ["vegetariano"]
    }
  ]
};
