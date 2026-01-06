---
title: "Migrando de WordPress a Astro: Evolución Técnica en 2025"
description: "Guía completa para migrar sitios web desde WordPress a Astro. Performance, mantenibilidad, costos y mejoras en SEO después de la migración paso a paso."
author: "Camilo Salazar Ocampo"
pubDate: 2024-12-20
heroImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80"
category: "Web Development"
tags: ["WordPress", "Astro", "JAMstack", "SSG", "migration"]
readingTime: 11
featured: true
---

## ¿Por Qué Migrar de WordPress?

### Problemas de WordPress
- 🐢 Lento: Promedio 2-3s (vs Astro <500ms)
- 💾 Pesado: BD + PHP + plugins = complejidad
- 🔒 Seguridad: Vulnerabilidades plugins + updates constantes
- 💰 Costos: Hosting + plugins premium + mantenimiento
- 📉 SEO: Plugins ralentizan crawling

### Ventajas de Astro
- ⚡ Ultra rápido: <500ms load time
- 🎯 SEO nativo: Content Collections + SSG
- 🔐 Seguro: No hay servidor PHP/DB
- 💵 Económico: Hosting estático ($0-20/mes)
- 🚀 Moderno: Markdown + componentes reutilizables

## Comparativa de Performance

| Métrica | WordPress | Astro |
|---------|-----------|-------|
| **First Paint** | 2.1s | 0.3s |
| **LCP** | 3.2s | 1.1s |
| **FID** | 250ms | 45ms |
| **CLS** | 0.25 | 0.02 |
| **Tamaño HTML** | 450KB | 25KB |
| **Requests** | 80+ | 12 |
| **PageSpeed Score** | 42 | 98 |

## Plan de Migración (7 Días)

### Día 1: Exportar Contenido

```bash
# Exportar posts de WordPress como XML
# Dashboard > Tools > Export

# Convertir XML a Markdown (herramienta)
npx wordpress-export-to-markdown \
  --input wordpress-export.xml \
  --output ./content/posts
```

### Día 2: Estructurar en Astro

```
src/
├── content/
│   └── blog/
│       ├── 01-primer-post.md
│       └── config.ts
├── layouts/
│   ├── Layout.astro
│   └── BlogLayout.astro
├── pages/
│   ├── index.astro
│   └── blog/
│       ├── index.astro
│       └── [slug].astro
└── assets/
    └── images/
```

### Día 3-4: Crear Layouts

```astro
// src/layouts/BlogLayout.astro
---
import Layout from './Layout.astro';

const { frontmatter } = Astro.props;
---

<Layout title={frontmatter.title}>
  <article class="prose">
    <h1>{frontmatter.title}</h1>
    <p class="text-gray-600">
      Por {frontmatter.author} • {frontmatter.pubDate}
    </p>
    <slot />
  </article>
</Layout>
```

### Día 5: Implementar Rutas Dinámicas

```astro
// src/pages/blog/[slug].astro
---
import { getCollection } from 'astro:content';
import BlogLayout from '../../layouts/BlogLayout.astro';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map(post => ({
    params: { slug: post.slug },
    props: { post }
  }));
}

const { post } = Astro.props;
const { Content } = await post.render();
---

<BlogLayout frontmatter={post.data}>
  <Content />
</BlogLayout>
```

### Día 6: Implementar Redirects

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  redirects: {
    '/old-post-slug': '/blog/new-post-slug',
    '/about-us': '/about',
    '/contact-form': '/contact'
  }
});
```

### Día 7: Desplegar y Validar

```bash
# Build local
npm run build

# Deploy a Vercel
vercel deploy --prod

# Verificar redirects
curl -I https://tudominio.com/old-post-slug
# Debe devolver 301 → /blog/new-post-slug
```

## Migración de Imágenes

```astro
// ✅ BIEN: Usar Image component de Astro
import { Image } from 'astro:assets';
import myImage from '../assets/image.jpg';

<Image 
  src={myImage} 
  alt="Description"
  format="webp"
  quality={80}
/>

// ✅ BIEN: URLs remotas optimizadas
<Image
  src="https://cdn.example.com/image.jpg"
  alt="Description"
  width={800}
  height={600}
/>
```

## SEO Checklist Post-Migración

```astro
// ✅ Metadata automática
import { getCollection } from 'astro:content';

const post = await getPost(slug);

<head>
  <title>{post.data.title} | Camilo Salazar</title>
  <meta name="description" content={post.data.description}>
  <meta property="og:title" content={post.data.title}>
  <meta property="og:description" content={post.data.description}>
  <meta property="og:image" content={post.data.image}>
  <meta name="twitter:card" content="summary_large_image">
  <link rel="canonical" href={Astro.request.url}>
</head>
```

## Validaciones Post-Migración

```bash
# 1. Verificar sitemap
curl https://tudominio.com/sitemap.xml | head -20

# 2. Revisar robots.txt
curl https://tudominio.com/robots.txt

# 3. Auditar con Lighthouse
npm install -g lighthouse
lighthouse https://tudominio.com --view

# 4. Pruebas de crawlability
npx sitemap-validator https://tudominio.com/sitemap.xml
```

## Caso Real: Migración Exitosa

### Antes (WordPress)
- Hosting: $20/mes
- Plugins: $50/mes
- Mantenimiento: 5h/mes
- PageSpeed: 42
- Ranking principales keywords: Página 2

### Después (Astro)
- Hosting: $0 (Vercel free tier)
- Plugins: $0
- Mantenimiento: 1h/mes
- PageSpeed: 98
- Ranking principales keywords: Página 1

**Ahorro**: $70/mes + 4h/mes + ranking mejorado

## Herramientas de Ayuda

| Herramienta | Uso |
|------------|-----|
| **wordpress-export-to-markdown** | Convertir WP → MD |
| **Astro Content Collections** | Gestionar contenido |
| **Vercel** | Deploy automático |
| **Cloudflare** | DNS + caching |

## Casos Donde Quedarse en WordPress

- Tienda e-commerce grande (WooCommerce)
- Equipo sin experiencia técnica
- Necesitas plugin específico sin alternativa
- Cliente requiere admin panel visual

---

**Conclusión**: Para blogs y sitios de contenido, Astro es superior en todos los aspectos. La migración es simple en 7 días con beneficios inmediatos.
