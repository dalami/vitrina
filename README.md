# Selecto — Guía de uso

## Estructura del proyecto

```
selecto/
├── index.html      ← estructura de la página (no tocar)
├── style.css       ← diseño visual (no tocar)
├── app.js          ← lógica de filtros, modal, etc. (no tocar)
├── data.js         ← ✅ ACÁ cargás y editás todo
└── img/            ← carpeta para fotos propias
    ├── mi-foto.jpg
    └── ...
```

---

## ¿Cómo agregar un emprendimiento?

1. Abrí `data.js` en VS Code
2. Copiá este bloque y pegalo antes del `];` final:

```js
{
  id: 99,                               // número único, siempre diferente
  nombre: "Nombre del Emprendimiento",
  rubro: "Gastronomía",                 // ver rubros abajo
  tagline: "Frase corta de 1 línea.",
  desc: "Descripción completa para el modal. 2-3 oraciones.",
  ubicacion: "Ciudad, Provincia",       // o null para no mostrar
  envios: true,                         // true o false
  whatsapp: "5491112345678",            // código país + número, sin + ni espacios
  instagram: "usuario",                 // solo el usuario, sin @
  email: "correo@ejemplo.com",          // o null
  web: "https://miweb.com",            // o null
  plan: "basic",                        // "basic" | "featured" | "premium"
  images: [
    "img/mi-foto-1.jpg",               // foto propia en carpeta /img/
    "https://link-externo.com/foto.jpg" // o link de Drive/Instagram/etc.
  ]
},
```

3. Guardá el archivo
4. Subí a Vercel (arrastrá la carpeta o usá `vercel --prod`)

---

## Rubros disponibles

```
Gastronomía | Deco | Regalos | Moda | Servicios | Belleza | Eventos | Digital
```

## Planes

| Plan       | Badge        | Prioridad en grid |
|------------|--------------|-------------------|
| `premium`  | Negro        | 1° lugar          |
| `featured` | Dorado       | 2° lugar          |
| `basic`    | Sin badge    | 3° lugar          |

---

## ¿Cómo subir fotos propias?

1. Copiá la foto a la carpeta `img/`
2. Usá el nombre sin espacios ni acentos: `mi-producto.jpg`
3. Referenciarla como `"img/mi-producto.jpg"` en data.js

**Tamaño recomendado:** 800×600px, formato JPG o WebP, menos de 200kb.

## ¿Y si el emprendedor me manda un link de Google Drive?

Asegurate de que el link sea público y termine en `&export=view` o usá un link de imagen directa.
Para links de Instagram, usá la URL directa de la imagen (botón derecho → copiar dirección de imagen).

---

## Subir a Vercel (primera vez)

1. Instalá Vercel CLI: `npm i -g vercel`
2. En la carpeta del proyecto: `vercel`
3. Seguí los pasos, elegí el nombre del proyecto

## Actualizar después de editar data.js

```bash
vercel --prod
```

O simplemente arrastrá la carpeta a vercel.com/new (drag & drop).
