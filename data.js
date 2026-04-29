// =============================================================
//  SELECTO — BASE DE DATOS DE EMPRENDIMIENTOS
//  Este es el único archivo que necesitás editar.
//
//  CÓMO AGREGAR UN EMPRENDIMIENTO:
//  1. Copiá el bloque de ejemplo de abajo
//  2. Pegalo al final de la lista (antes del ] final)
//  3. Completá los campos
//  4. Guardá y subí a Vercel
//
//  IMÁGENES:
//  - Foto propia subida a /img/:       "img/nombredearchivo.jpg"
//  - Link externo (Drive, Instagram):  "https://..."
//  - Podés mezclar ambos en el mismo emprendimiento
//
//  PLAN:    "basic" | "featured" | "premium"
//  ENVIOS:  true | false
//  CAMPOS OPCIONALES: ubicacion, email, web → podés poner null
// =============================================================

const EMPRENDIMIENTOS = [
  // ----------------------------------------------------------
  // EJEMPLO COMPLETO (copiá este bloque para agregar uno nuevo)
  // ----------------------------------------------------------
  {
    id: 1,
    nombre: "Magnético Fotoimanes",
    rubro: "Regalos", // Gastronomía | Deco | Regalos | Moda | Servicios | Belleza | Eventos | Digital
    tagline:
      "Fotoimanes personalizados para eventos, recuerdos y regalos únicos.",
    desc: "Creamos fotoimanes personalizados de alta calidad, ideales para casamientos, cumpleaños, recuerdos de viaje y regalos corporativos. Cada imán es una pieza única que queda en la heladera como un recuerdo eterno.",
    ubicacion: "Pinamar", // o null si no querés mostrar
    envios: true,
    whatsapp: "5492254459668", // código de país + número, sin + ni espacios
    instagram: "magnetico.fotoimanes", // solo el usuario, sin @
    email: "pedidos.magnetico@gmail.com", // o null
    web: "https://magnetico-fotoimanes.com", // o null
    plan: "featured",
    images: [
      // Hasta 5 imágenes. Orden sugerido: Producto, Lifestyle, Branding, Packaging, Promo
      "img/magnetico/m4.jpg",
      "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&q=80",
      "img/magnetico-branding.jpg", // ejemplo de foto propia en carpeta /img/
    ],
  },

  {
    id: 2,
    nombre: "Don Diego",
    rubro: "Gastronomía",
    tagline: "Sous vide premium. Bondiola, osobuco y delicias al Malbec.",
    desc: "Emprendimiento gastronómico de alto nivel ubicado en Pinamar. Especialistas en cocción sous vide con cortes premium como bondiola desmechada y osobuco al Malbec. Perfecto para reuniones y eventos.",
    ubicacion: "Pinamar, Buenos Aires",
    envios: true,
    whatsapp: "5492254414211",
    instagram: "dondiegopinamar",
    email: "diegoalami@gmail.com",
    web: "https://don-diego.vercel.app/",
    plan: "premium",
    images: [
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
      "img/dondiego/dd1.png",
      "img/dondiego/dd2.png",
      "https://images.unsplash.com/photo-1607099574399-9cfd18c5b8a4?w=800&q=80",
    ],
  },

  {
    id: 3,
    nombre: "Casa Botánica",
    rubro: "Deco",
    tagline: "Plantas de interior, macetas artesanales y accesorios de deco.",
    desc: "Selección curada de plantas de interior, macetas artesanales hechas a mano y accesorios para transformar cualquier espacio. Asesoramos en el armado de rincones verdes únicos.",
    ubicacion: "Palermo, CABA",
    envios: false,
    whatsapp: "5491100000003",
    instagram: "casabotanica",
    email: null,
    web: null,
    plan: "basic",
    images: [
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80",
      "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=800&q=80",
    ],
  },

  {
    id: 4,
    nombre: "Ritual Studio",
    rubro: "Belleza",
    tagline: "Cosméticos naturales y rituales de cuidado consciente.",
    desc: "Productos de belleza naturales, formulados sin parabenos ni sulfatos. Desde aceites faciales hasta mascarillas de arcilla, todo pensado para un ritual de cuidado consciente y sostenible.",
    ubicacion: "San Telmo, CABA",
    envios: true,
    whatsapp: "5491100000004",
    instagram: "ritualstudio.ar",
    email: "hola@ritualstudio.com",
    web: "https://ritualstudio.com",
    plan: "basic",
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80",
      "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&q=80",
    ],
  },

  {
    id: 5,
    nombre: "Lúa Cerámica",
    rubro: "Deco",
    tagline: "Cerámica artesanal de autor. Piezas únicas hechas a mano.",
    desc: "Cada pieza de Lúa es única, modelada a mano en arcilla de alta temperatura. Tazas, cuencos, floreros y objetos decorativos con carácter propio y poética minimalista.",
    ubicacion: "Belgrano, CABA",
    envios: true,
    whatsapp: "5491100000005",
    instagram: "lua.ceramica",
    email: null,
    web: null,
    plan: "basic",
    images: [
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80",
      "https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=800&q=80",
    ],
  },

  {
    id: 6,
    nombre: "Figura Estudio",
    rubro: "Moda",
    tagline:
      "Ropa de diseño independiente. Ediciones limitadas con telas naturales.",
    desc: "Diseño de autor con ediciones limitadas. Usamos telas naturales y procesos de producción lenta para crear prendas que duran y tienen historia. Anti fast-fashion desde el día uno.",
    ubicacion: "Villa Crespo, CABA",
    envios: true,
    whatsapp: "5491100000006",
    instagram: "figuraestudio",
    email: "hola@figuraestudio.com",
    web: "https://figuraestudio.com",
    plan: "basic",
    images: [
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80",
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&q=80",
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80",
    ],
  },

  {
    id: 7,
    nombre: "Celebra Eventos",
    rubro: "Eventos",
    tagline: "Ambientaciones únicas para bodas, cumples y eventos privados.",
    desc: "Diseñamos experiencias visuales para eventos que merecen ser recordados. Ambientaciones florales, mesas de dulces, carteles y props personalizados para cada ocasión.",
    ubicacion: "Mar del Plata",
    envios: false,
    whatsapp: "5491100000007",
    instagram: "celebra.eventos",
    email: "eventos@celebra.com",
    web: null,
    plan: "basic",
    images: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80",
    ],
  },

  {
    id: 8,
    nombre: "Pixel & Co",
    rubro: "Digital",
    tagline: "Diseño web y branding para emprendedores que quieren destacarse.",
    desc: "Agencia boutique de diseño digital. Creamos sitios web, identidades de marca y estrategias visuales para emprendedores y marcas que quieren contar su historia de forma auténtica.",
    ubicacion: "100% remoto",
    envios: false,
    whatsapp: "5491100000008",
    instagram: "pixelco.ar",
    email: "hello@pixelco.ar",
    web: "https://pixelco.ar",
    plan: "basic",
    images: [
      "https://images.unsplash.com/photo-1545670723-196ed0954986?w=800&q=80",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    ],
  },
  {
    id: 9,
    nombre: "Keepcalmassage",
    rubro: "Masajes", // Gastronomía | Deco | Regalos | Moda | Servicios | Belleza | Eventos | Digital
    tagline: "Masajes relajantes y descontracturantes.",
    desc: "Mas vale prevenir que curar",
    ubicacion: "Pinamar", // o null si no querés mostrar
    envios: false,
    whatsapp: "549225461626", // código de país + número, sin + ni espacios
    instagram: "keepcalmassage", // solo el usuario, sin @
    email: null, // o null
    web: null, // o null
    plan: "basic",
    images: [
      // Hasta 5 imágenes. Orden sugerido: Producto, Lifestyle, Branding, Packaging, Promo
      "img/keepcalm/kc1.jpeg",
      // ejemplo de foto propia en carpeta /img/
    ],
  },
  {
    id: 10,
    nombre: "Sublimarte",
    rubro: "Sublimados", // Gastronomía | Deco | Regalos | Moda | Servicios | Belleza | Eventos | Digital
    tagline: "Tus ideas, en objetos únicos",
    desc: "Todo personalizado para vos o para regalar",
    ubicacion: "Pinamar", // o null si no querés mostrar
    envios: true,
    whatsapp: "5492254111111", // código de país + número, sin + ni espacios
    instagram: "sublimarte.ok", // solo el usuario, sin @
    email: null, // o null
    web: null, // o null
    plan: "basic",
    images: [
      // Hasta 5 imágenes. Orden sugerido: Producto, Lifestyle, Branding, Packaging, Promo
      "img/sublimarte/sublimarte1.jpeg",
      // ejemplo de foto propia en carpeta /img/
    ],
  },

  {
    id: 11,
    nombre: "La Duena Moda",
    rubro: "Moda", // Gastronomía | Deco | Regalos | Moda | Servicios | Belleza | Eventos | Digital
    tagline: "Somos fabricantes y mayoristas de indumentaria femenina",
    desc: "Vendemos por internet",
    ubicacion: "Pinamar", // o null si no querés mostrar
    envios: true,
    whatsapp: "5492254111111", // código de país + número, sin + ni espacios
    instagram: "la_dueña_moda", // solo el usuario, sin @
    email: null, // o null
    web: null, // o null
    plan: "basic",
    images: [
      // Hasta 5 imágenes. Orden sugerido: Producto, Lifestyle, Branding, Packaging, Promo
      "img/laduena/laduena.jpeg",
      // ejemplo de foto propia en carpeta /img/
    ],
  },

  {
    id: 12,
    nombre: "Keramike Artesanias",
    rubro: "Regalos", // Gastronomía | Deco | Regalos | Moda | Servicios | Belleza | Eventos | Digital
    tagline: "Bienvenidos a Keramike artesanias",
    desc: "Pintura en porcelana, tablas de madera, cuchillos, cesteria y mucho más.",
    ubicacion: "Pinamar", // o null si no querés mostrar
    envios: true,
    whatsapp: "5492254111111", // código de país + número, sin + ni espacios
    instagram: "keramike.carilo", // solo el usuario, sin @
    email: null, // o null
    web: null, // o null
    plan: "basic",
    images: [
      // Hasta 5 imágenes. Orden sugerido: Producto, Lifestyle, Branding, Packaging, Promo
      "img/keramike/keramike1.jpeg",
      // ejemplo de foto propia en carpeta /img/
    ],
  },

  {
    id: 13,
    nombre: "Accesorios Pilar",
    rubro: "Accesorios", // Gastronomía | Deco | Regalos | Moda | Servicios | Belleza | Eventos | Digital
    tagline: "Bienvenidos a Accesorios Pilar",
    desc: "Busca tu estilo.",
    ubicacion: "Pinamar", // o null si no querés mostrar
    envios: true,
    whatsapp: "5492254111111", // código de país + número, sin + ni espacios
    instagram: "accesorios.pilar24", // solo el usuario, sin @
    email: null, // o null
    web: null, // o null
    plan: "basic",
    images: [
      // Hasta 5 imágenes. Orden sugerido: Producto, Lifestyle, Branding, Packaging, Promo
      "img/accesoriosPilar/AccesorioPilar1.jpeg",
      // ejemplo de foto propia en carpeta /img/
    ],
  },

   {
    id: 14,
    nombre: "Blume Blume",
    rubro: "Velas", // Gastronomía | Deco | Regalos | Moda | Servicios | Belleza | Eventos | Digital
    tagline: "Hecho a mano con amor",
    desc: "Velas - Difusores - Home Spray.",
    ubicacion: "Pinamar", // o null si no querés mostrar
    envios: true,
    whatsapp: "5492254111111", // código de país + número, sin + ni espacios
    instagram: "blumebyflor", // solo el usuario, sin @
    email: null, // o null
    web: null, // o null
    plan: "basic",
    images: [
      // Hasta 5 imágenes. Orden sugerido: Producto, Lifestyle, Branding, Packaging, Promo
      "img/blume/blume1.jpeg",
      // ejemplo de foto propia en carpeta /img/
    ],
  },

  {
    id: 15,
    nombre: "Vuela Alondra",
    rubro: "Accesorios", // Gastronomía | Deco | Regalos | Moda | Servicios | Belleza | Eventos | Digital
    tagline: "Gargantillas, pulseras , tobilleras , aros , vinchas",
    desc: "Accesorios.",
    ubicacion: "Pinamar", // o null si no querés mostrar
    envios: true,
    whatsapp: "5492254111111", // código de país + número, sin + ni espacios
    instagram: "vuela.alondra", // solo el usuario, sin @
    email: null, // o null
    web: null, // o null
    plan: "basic",
    images: [
      // Hasta 5 imágenes. Orden sugerido: Producto, Lifestyle, Branding, Packaging, Promo
      "img/vuelaalondra/vuelaalondra1.jpeg",
      // ejemplo de foto propia en carpeta /img/
    ],
  },
  // Seguí agregando acá ↓ (copiá el bloque de ejemplo de arriba)
];
