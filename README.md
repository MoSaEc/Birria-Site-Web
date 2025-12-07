# 🌮 Birria - Sitio Web Restaurante

> Sitio web profesional y moderno para restaurante de Birria estilo Jalisco

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/es/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/es/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/es/docs/Web/JavaScript)

## 📁 Estructura del Proyecto

```
Actividad Computacion/
│
├── 📄 Páginas HTML
│   ├── index.html              # Página principal con hero, stats, testimonios
│   ├── especialidades.html     # Menú de platillos con cards y precios
│   ├── pedidos.html           # Formulario de pedidos con validación
│   ├── galeria.html           # Galería interactiva + mapa clickeable
│   ├── contacto.html          # Videos, info, horarios, redes sociales
│   └── menu-print.html        # Menú optimizado para impresión/PDF
│
├── 🎨 estilos/ - Sistema CSS Modular
│   ├── base.css              # Variables, reset, tipografía, layout base
│   ├── navegacion.css        # Navbar fija con scroll effects + footer
│   ├── componentes.css       # Botones, cards, badges, hero, decorativos
│   ├── index.css            # Estilos específicos página inicio
│   ├── especialidades.css   # Cards de platillos, ingredientes, nutrición
│   ├── pedidos.css          # Forms mejorados, radio, checkbox, proceso
│   ├── galeria.css          # Grid de imágenes, mapa, tabla platillos
│   └── contacto.css         # Info cards, videos, horarios, social
│
├── ⚡ js/ - JavaScript
│   ├── animations.js        # Scroll animations, validación, lightbox, parallax
│   └── audio-persistente.js # Sistema de audio continuo entre páginas
│
├── 🖼️ imágenes/ - Recursos Visuales
│   ├── hero_*.png           # Imágenes hero para cada página
│   ├── tacos_birria_*.png   # Fotos de platillos
│   ├── quesabirria_*.png
│   ├── consome_birria_*.png
│   └── ... (más imágenes de birria)
│
├── 📋 documentos/
│   └── menu-birria.pdf      # Menú completo descargable
│
├── 🎬 multimedia/
│   └── (videos y audio opcionales)
│
└── 📖 README.md             # Este archivo
```

## ✨ Características Principales

### 🎨 Diseño Profesional
- **Sistema CSS Modular**: 8 archivos organizados por función para fácil mantenimiento
- **Responsive Design**: Optimizado para móvil, tablet y desktop
- **Animaciones Fluidas**: Fade-in al scroll, hover effects, micro-animaciones
- **Tipografía Premium**: Bebas Neue (títulos) + Montserrat (cuerpo)
- **Hero Sections**: Cada página con imagen de fondo única y overlay oscuro

### ⚡ JavaScript Avanzado
- **Scroll Animations**: IntersectionObserver para animaciones al scroll
- **Form Validation**: Validación en tiempo real con feedback visual
- **Lightbox Profesional**: Galería de imágenes con zoom y navegación
- **Parallax Effects**: Efectos parallax en elementos seleccionados
- **Lazy Loading**: Carga optimizada de imágenes
- **Counter Animations**: Contadores animados para estadísticas

### 📱 Páginas Implementadas

| Página | Descripción | Características Clave |
|--------|-------------|----------------------|
| **Index** | Página principal | Hero, estadísticas, testimonios, historia, galería preview |
| **Especialidades** | Menú completo | Cards de platillos, badges, precios, niveles de picante, ingredientes |
| **Pedidos** | Sistema de pedidos | Formulario avanzado, validación, pasos del proceso, PDF descargable |
| **Galería** | Fotos del restaurante | Mapa interactivo clickeable, tabla de menú, grid de imágenes con lightbox |
| **Contacto** | Información | Videos de YouTube, horarios, redes sociales, servicio a domicilio |

## 🎨 Sistema de Diseño

### Paleta de Colores
```css
--color-rojo-principal: #C92A2A;     /* Birria, pasión */
--color-rojo-oscuro: #8B1A1A;        /* Profundidad */
--color-naranja-calido: #E67700;      /* Especias, energía */
--color-verde-suave: #2F9E44;         /* Frescura, cilantro */
--color-crema: #FFE8CC;               /* Tortillas, calidez */
--color-texto-principal: #1A1A1A;     /* Texto principal */
```

### Componentes Reutilizables
- **Botones**: Primary, Secondary, Large (con hover effects)
- **Cards**: Con bordes, sombras, hover transform
- **Badges**: Normal, Popular, Success, Outline
- **Elementos Decorativos**: Líneas, divisores, highlight boxes
- **Hero Sections**: Con overlay y parallax

## 🚀 Instalación y Uso

### Visualización Local

**Opción 1: Python HTTP Server** (Recomendado)
```bash
# Abre terminal en la carpeta del proyecto
python -m http.server 8000

# Abre en navegador:
http://localhost:8000
```

**Opción 2: Live Server (VS Code)**
```bash
# 1. Instala extensión "Live Server" en VS Code
# 2. Click derecho en index.html
# 3. Selecciona "Open with Live Server"
```

### Deploy en GitHub Pages

```bash
# 1. Crear repositorio en GitHub
git init
git add .
git commit -m "Initial commit - Birria website"
git branch -M main
git remote add origin https://github.com/usuario/birria-website.git
git push -u origin main

# 2. Habilitar GitHub Pages
# Settings → Pages → Source: main branch → Save

# 3. Tu sitio estará en:
# https://usuario.github.io/birria-website
```

## 📝 Funcionalidades por Página

### 🏠 Index (Inicio)
- Hero con imagen de fondo y CTAs
- Estadísticas animadas (30+ años, 10k+ clientes, 4.8★)
- Testimonios de clientes
- Historia del restaurante
- Preview de galería
- Newsletter signup

### 🌮 Especialidades
- Cards de platillos con imágenes HD
- Badges (Popular, Best Seller)
- Niveles de picante visuales (🌶️)
- Descripción de ingredientes
- Sección "Ingredientes de Calidad"
- CTAs para ordenar

### 🛒 Pedidos
- Proceso de pedido en 3 pasos visualizado
- Formulario completo con validación
- Selección de tamaño (Individual/Familiar/Evento)
- Checkboxes para platillos múltiples
- Campo condicional para dirección (domicilio)
- Descarga de menú PDF
- Validación en tiempo real

### 📸 Galería
- **Mapa interactivo clickeable**: Proceso de preparación (Marinado, Cocción, Servido) con overlays visuales
- Tabla de platillos populares con imágenes
- Grid de fotos de platillos (4 columnas)
- Grid de fotos del restaurante (6 fotos)
- Lightbox con zoom para todas las imágenes

### 📞 Contacto
- 2 videos de YouTube embebidos (recetas de birria)
- Cards de información (email, teléfono, ubicación)
- Enlaces a redes sociales
- Horarios de atención con colores distintos
- Información de servicio a domicilio
- CTA final para pedidos

## 🛠️ Tecnologías Utilizadas

| Tecnología | Uso | Versión |
|------------|-----|---------|
| **HTML5** | Estructura semántica | - |
| **CSS3** | Estilos, Grid, Flexbox, Custom Properties | - |
| **JavaScript** | Interactividad, validación, animaciones | ES6+ |
| **Google Fonts** | Tipografía (Bebas Neue, Montserrat) | - |

## 🎯 Optimizaciones Implementadas

- ✅ CSS modular para mantenimiento fácil
- ✅ Lazy loading de imágenes
- ✅ Animaciones optimizadas con IntersectionObserver
- ✅ Código JavaScript organizado en clases
- ✅ Imágenes hero optimizadas para web
- ✅ Formularios con validación del lado del cliente
- ✅ Estructura de carpetas profesional

## 📞 Información del Restaurante

**Birria - Auténtica Birria Estilo Jalisco**

- 📍 **Dirección**: Av. Revolución #456, Guadalajara, Jalisco
- 📞 **Teléfono**: +52 (33) 1234-5678
- 📧 **Email**: pedidos@birria.com

**Horarios:**
- Lunes a Jueves: 11:00 AM - 9:00 PM
- Viernes y Sábado: 11:00 AM - 11:00 PM
- Domingo: 10:00 AM - 8:00 PM

**Servicio a Domicilio:**
- Área de cobertura: 10 km
- Pedido mínimo: $200 MXN
- Tiempo estimado: 45-60 minutos

---

## 📄 Licencia

Este proyecto fue creado para fines educativos.

---

**Hecho con ❤️ y mucho sabor | 2024**
