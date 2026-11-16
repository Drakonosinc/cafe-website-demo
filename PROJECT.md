# PROJECT.md — Registro del proyecto

## Estado

Implementado y verificado en local, listo para publicar en GitHub Pages.

- Estructura estática completa (`index.html`, `styles.css`, `app.js`, `data/menu.js`, `assets/` con 11 ilustraciones SVG, `README.md`, `.gitignore`).
- Contenido, identidad y datos de contacto 100 % ficticios con aviso permanente **"DEMO · CONTENIDO ILUSTRATIVO"**.

## Decisiones técnicas y de diseño

1. **Carga de `data/menu.js` con `<script defer>` clásico en lugar de `fetch()` o módulos ES:**
   Permite que la demo funcione sin errores de CORS tanto publicada en GitHub Pages como abriendo `index.html` directamente desde archivo local (`file://`).
2. **Ilustraciones SVG en archivos separados dentro de `assets/` referenciados con `<img>`:**
   Mantiene el HTML limpio, permite aplicar `width`, `height`, `alt` descriptivo y `loading="lazy"` (excepto en el hero para priorizar el LCP) sin sumar peticiones externas.
3. **Tipografía del sistema + paleta CSS crema/espresso/terracota:**
   Se eligió `"Iowan Old Style", "Palatino Linotype", "Book Antiqua", Palatino, Georgia, serif` para títulos y `system-ui` para cuerpo, evitando latencias de fuentes remotas y saltos de diseño (CLS). Todos los pares de texto/fondo superan el ratio WCAG AA (4.5:1).
4. **Pestaña inicial `"Todos"` además de las 4 categorías en el filtro del menú:**
   Genera las pestañas dinámicamente desde `data/menu.js` incluyendo una vista global inicial y las categorías específicas (`Cafés`, `Fríos`, `Pastelería`, `Salado`) con soporte completo de teclado (`ArrowLeft`, `ArrowRight`, `Home`, `End`).
5. **Etiqueta `<meta name="robots" content="noindex">`:**
   Agregada intencionalmente porque se trata de una demostración pública con datos ficticios que no debe indexarse en buscadores como si fuera un local real. En auditorías de Lighthouse SEO, la comprobación *"Page is blocked from indexing"* / *"crawlable"* figura fallida de forma deliberada por esta etiqueta.
6. **Animaciones con `IntersectionObserver` y `prefers-reduced-motion`:**
   Solo se activan transiciones sutiles de opacidad y desplazamiento corto si el usuario no solicita movimiento reducido; los elementos visibles al cargar se muestran de inmediato.

## Pendientes / próximos pasos si pasa a proyecto real

- Reemplazar nombre, dirección, horarios, teléfono, correo y JSON-LD por los datos reales del comercio.
- Quitar el cartel de demo y retirar `<meta name="robots" content="noindex">` (sumando `canonical` y `og:url` definitivos) antes de publicar el sitio productivo.
- Conectar el formulario de contacto a un servicio de envío real o enlace directo de mensajería si se requiere recepción de consultas.
- Incorporar fotografías optimizadas (`WebP`/`AVIF`) si se desea reemplazar las ilustraciones SVG por fotos reales del local.
