---
title: "SEO y Performance Web: Cómo Lograr 95+ en PageSpeed Insights con Astro"
description: "Estrategias de optimización web con Astro y Vercel. Core Web Vitals, lazy loading, optimización de imágenes y técnicas avanzadas de SEO técnico para obtener puntuaciones máximas."
author: "Camilo Salazar Ocampo"
pubDate: 2025-01-10
heroImage: "https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e?auto=format&fit=crop&w=1600&q=80"
category: "Web Development"
tags: ["SEO", "performance", "web vitals", "Astro", "Vercel", "optimization"]
readingTime: 10
featured: true
---

## Por Qué PageSpeed Importa

- **Ranking SEO**: Google prioriza sitios rápidos
- **Conversión**: +1s de carga = -7% de conversiones
- **UX**: Usuarios abandonan en <3 segundos

## Core Web Vitals: Las Tres Métricas Críticas

### 1. **LCP** (Largest Contentful Paint) < 2.5s
Tiempo hasta que se renderiza el elemento más grande visible.

```astro
<!-- ✅ BIEN: Precargar fuentes críticas -->
<link rel="preload" as="font" href="/fonts/inter.woff2" crossorigin>

<!-- ✅ BIEN: Images con loading="lazy" -->
<img src="hero.webp" loading="lazy" alt="Hero">

<!-- ❌ MAL: Imágenes grandes sin optimizar -->
<img src="large-image.jpg" alt="Photo">
```

### 2. **FID** (First Input Delay) < 100ms
Tiempo de respuesta a la primera interacción del usuario.

```astro
---
// ✅ Usar content collections para SSG
import { getCollection } from 'astro:content';
const posts = await getCollection('blog');
---
```

### 3. **CLS** (Cumulative Layout Shift) < 0.1
Cambios inesperados en el layout durante carga.

```css
/* ✅ BIEN: Reservar espacio para imágenes */
img {
  aspect-ratio: 16 / 9;
  width: 100%;
  height: auto;
}

/* ❌ MAL: Altura sin reservar */
img { width: 100%; }
```

## Técnicas de Optimización Avanzada

### Imágenes Optimizadas

```astro
---
import { Image } from 'astro:assets';
import heroImg from '../assets/hero.jpg';
---

<!-- Astro optimiza automáticamente -->
<Image 
  src={heroImg}
  alt="Hero"
  format="webp"
  quality={80}
/>
```

### Preload y Prefetch

```astro
<!-- Preload críticas -->
<link rel="preload" as="image" href="/hero.webp">

<!-- Prefetch siguientes páginas -->
<link rel="prefetch" href="/blog">
</link>

<!-- DNS Prefetch para CDN -->
<link rel="dns-prefetch" href="https://cdn.example.com">
```

### Code Splitting Automático

```astro
---
// ✅ Astro carga solo el JS necesario
import HeavyComponent from '../components/Heavy.astro';
---
```

## Configuración Vercel para Máximo Performance

```json
{
  "buildCommand": "astro build",
  "outputDirectory": "./dist",
  "env": {
    "ASTRO_TELEMETRY_DISABLED": "true"
  },
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

## Checklist SEO Técnico

- ✅ `<title>` único y descriptivo (<60 caracteres)
- ✅ `<meta name="description">` (<160 caracteres)
- ✅ Estructura H1 → H2 → H3 jerárquica
- ✅ URLs amigables y descriptivas
- ✅ Open Graph para compartir en redes
- ✅ Sitemap XML generado
- ✅ Robots.txt configurado
- ✅ Schema.json para rich snippets
- ✅ Mobile friendly responsive
- ✅ HTTPS en todo el sitio

## Resultado Real: marceanahata.com

| Métrica | Antes | Después |
|---------|-------|---------|
| **Performance** | 62 | 98 |
| **LCP** | 3.2s | 1.1s |
| **FID** | 250ms | 45ms |
| **CLS** | 0.25 | 0.02 |
| **SEO Score** | 78 | 100 |

## Herramientas de Monitoreo

1. **Lighthouse**: Auditoría local
2. **PageSpeed Insights**: Rendimiento real
3. **Web.dev/measure**: Análisis completo
4. **GTmetrix**: Waterfall detallado

---

**Conclusión**: Con Astro + Vercel + optimizaciones correctas, lograr 95+ es completamente alcanzable y mejora significativamente conversiones.
