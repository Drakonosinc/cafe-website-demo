# Cafetería Demo · Café de especialidad

Sitio web de muestra de una sola página para **Cafetería Demo**, desarrollado con **HTML, CSS y JavaScript puro**, sin frameworks, sin librerías externas, sin CDN y con ilustraciones propias en SVG. Todos los textos, precios, horarios, dirección y teléfono son **100 % ficticios** y de carácter ilustrativo.

## Características principales

- **Carga rápida y cero dependencias externas:** sin fuentes remotas, sin scripts de terceros y con peso total liviano.
- **Paleta cálida y contraste AA:** variables CSS en tonos crema, espresso y terracota con relación de contraste mínima 4.5:1 en todo el texto.
- **Menú desacoplado en `data/menu.js`:** categorías (*Cafés*, *Fríos*, *Pastelería*, *Salado*) con pestañas accesibles por teclado y mouse.
- **Galería ilustrada con lightbox accesible:** 8 ilustraciones SVG propias, navegación con flechas, cierre con `Esc` y foco contenido en el diálogo.
- **Contacto offline y mapa ilustrado en SVG:** validación de formulario en el navegador sin envío de datos reales.
- **SEO técnico y privacidad de demo:** `lang="es-AR"`, `<meta name="robots" content="noindex">`, Open Graph básico, favicon SVG y datos estructurados JSON-LD (`CafeOrCoffeeShop`).

## Estructura del proyecto

```text
.
├── .gitignore          # Exclusiones locales de artefactos temporales
├── index.html          # Documento semántico de una sola página
├── styles.css          # Variables CSS, maquetación responsive y animaciones
├── app.js              # Navegación móvil, pestañas de menú, lightbox, formulario y reveal
├── data/
│   └── menu.js         # Único archivo editable para actualizar categorías, ítems y precios
├── assets/
│   ├── favicon.svg
│   ├── hero-cafeteria.svg
│   ├── galeria-*.svg   # 8 ilustraciones SVG para la galería
│   └── mapa-ubicacion.svg
├── README.md
└── PROJECT.md
```

## Cómo editar el menú (`data/menu.js`)

No necesitás tocar `index.html`, `styles.css` ni `app.js` para cambiar productos o precios. Abrí `data/menu.js` con cualquier editor de texto:

1. **Cambiar un nombre, descripción o precio:** buscá el ítem dentro del arreglo `items` y editá sus propiedades `name`, `description` o `price` (número entero en pesos, por ejemplo `3200` se mostrará como `$ 3.200`).
2. **Agregar un producto nuevo:** copiá un bloque existente dentro de `items`, asignale un `id` único (sin espacios) y asegurate de que `category` coincida con una de las categorías definidas en `categories` (`"cafes"`, `"frios"`, `"pasteleria"` o `"salado"`).
3. **Editar etiquetas:** modificá el arreglo `tags` (por ejemplo `["vegano"]`, `["sin TACC"]` o `[]` si no lleva etiquetas).
4. **Guardar y recargar:** guardá `data/menu.js` y recargá el navegador para ver el cambio reflejado al instante.

```js
{
  id: "flat-white-nuevo",
  category: "cafes",
  name: "Flat White doble",
  description: "Doble espresso con leche texturizada.",
  price: 4300,
  tags: ["de la casa"]
}
```

## Cómo probar en local

Podés abrir `index.html` directamente en el navegador o levantar un servidor estático simple:

```bash
python -m http.server 8080
```

Luego abrí `http://localhost:8080/` en tu navegador.

## Cómo publicar en GitHub Pages

Todas las rutas son relativas (`styles.css`, `app.js`, `data/menu.js`, `assets/...`), por lo que funciona tanto en un dominio raíz como en una subcarpeta de proyecto (`https://usuario.github.io/nombre-del-repo/`):

1. Subí todos los archivos del repositorio a GitHub (por ejemplo, en la rama `main`).
2. En el repositorio de GitHub, entrá a **Settings → Pages**.
3. En **Build and deployment → Source**, seleccioná **Deploy from a branch**.
4. Elegí la rama `main` y la carpeta `/ (root)`, y presioná **Save**.
5. En unos minutos GitHub Pages publicará la URL estática de la demo.
