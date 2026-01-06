# Sistema de Blog con Markdown

## Cómo Agregar Nuevos Artículos

### 1. Crear Archivo Markdown

Crea un nuevo archivo en `src/content/blog/` con el siguiente formato:

```
07-nombre-del-articulo.md
```

**Importante**: Usa números consecutivos al inicio del nombre para mantener el orden.

### 2. Estructura del Archivo

```markdown
---
title: "Título del Artículo"
description: "Descripción breve para SEO (160 caracteres aprox)"
author: "Camilo Salazar Ocampo"
pubDate: 2025-01-20
category: "Categoría Principal"
tags: ["tag1", "tag2", "tag3"]
readingTime: 12
featured: true
---

# Contenido del Artículo

## Sección 1
Texto normal aquí.

## Sección 2
Puedes usar **bold**, *italic*, `code`, etc.

### Código Destacado

\`\`\`python
# Ejemplo de código
def hello_world():
    print("Hola Mundo")
\`\`\`

### Tablas

| Columna 1 | Columna 2 |
|-----------|-----------|
| Dato 1    | Dato 2    |

### Listas

- Punto 1
- Punto 2
  - Subpunto

```

### 3. Campos del Frontmatter

| Campo | Tipo | Requerido | Notas |
|-------|------|-----------|-------|
| `title` | string | ✅ | Máx 60 caracteres para SEO |
| `description` | string | ✅ | Máx 160 caracteres |
| `author` | string | ❌ | Default: "Camilo Salazar Ocampo" |
| `pubDate` | date | ✅ | Formato: YYYY-MM-DD |
| `category` | string | ✅ | Ej: "Data Engineering", "Web Development" |
| `tags` | array | ✅ | Array de strings para búsqueda |
| `readingTime` | number | ❌ | Minutos aproximados |
| `featured` | boolean | ❌ | Default: false, muestra en inicio |

### 4. Validación SEO

- ✅ Título único y descriptivo
- ✅ Meta description con keywords
- ✅ Mínimo 5 tags relevantes
- ✅ Estructura H1 → H2 → H3 jerárquica
- ✅ Enlaces internos a otros artículos
- ✅ Imágenes con alt text (opcional)

### 5. Publicación Automática

Una vez guardado el archivo `.md` en `src/content/blog/`:

1. El artículo aparece automáticamente en `/blog`
2. Se genera URL amigable: `/blog/07-nombre-del-articulo`
3. Se añade al feed RSS: `/blog/rss.xml`
4. Se indexa automáticamente para búsqueda

## Estructura de Carpetas

```
src/
├── content/
│   ├── config.ts          # Esquema de validación
│   └── blog/
│       ├── 01-...md
│       ├── 02-...md
│       └── 06-...md
├── pages/
│   └── blog/
│       ├── index.astro     # Listado de artículos
│       ├── [slug].astro    # Página individual
│       └── rss.xml.js      # Feed RSS
└── layouts/
    └── BlogLayout.astro    # Layout de artículos
```

## Ejemplo Completo

```markdown
---
title: "Apache Spark: Procesamiento Distribuido a Escala"
description: "Guía práctica para dominar Apache Spark. Transformaciones, acciones y optimización de jobs en cluster."
author: "Camilo Salazar Ocampo"
pubDate: 2025-01-25
category: "Data Engineering"
tags: ["spark", "distributed", "big-data", "scala", "optimization"]
readingTime: 14
featured: false
---

## Introducción

Apache Spark es el motor de procesamiento distribuido más utilizado...

## Conceptos Fundamentales

### RDD (Resilient Distributed Dataset)
Estructura inmutable que permite...

\`\`\`scala
val rdd = sc.textFile("data.txt")
val counts = rdd
  .flatMap(line => line.split(" "))
  .map(word => (word, 1))
  .reduceByKey(_ + _)
\`\`\`

## Conclusión

Spark permite procesar datos a escala...
```

## SEO + Performance

- 📱 Totalmente responsive
- 🚀 Páginas < 50KB
- ⚡ LCP < 1.5s
- 🔍 SEO 100/100 en Lighthouse
- 📡 Feed RSS automático
- 🔗 Breadcrumbs navegables
- 🏷️ Tags filtrable

## Testing Local

```bash
# Desarrollo
npm run dev

# Ver blog
http://localhost:4321/blog

# Ver artículo
http://localhost:4321/blog/01-medallion-architecture

# Feed RSS
http://localhost:4321/blog/rss.xml
```

## Build & Deploy

```bash
# Build para producción
npm run build

# Archivos generados en /dist
# Deploy a Vercel / Netlify automáticamente
```

---

**¡Importante!**: Cada vez que agregues un nuevo `.md`, se genera automáticamente la página y se actualiza el listado del blog. No requiere configuración manual.
