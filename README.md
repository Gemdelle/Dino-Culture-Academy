# 0. 🦖 Dino Culture Academy

**React 18 · TypeScript · Vite** · **Construcción de Software** (UB) · Museo web de dinosaurios: **mapa por eras**, **galerías con escaneo X-Ray**, **biblioteca con libros** y **minijuegos** (puzzles + memoria).

Repo: [Gemdelle/Dino-Culture-Academy](https://github.com/Gemdelle/Dino-Culture-Academy)

---

## 1. 📋 Resumen

**Dino Culture Academy** es un museo interactivo de dinosaurios en el navegador: recorrés la historia geológica como si fueras un visitante en 3 períodos, pasás por salas con dinosaurios, podés ver sus esqueletos con el escaneo tipo radiografía, leer material en la biblioteca, ¡hasta jugar minijuegos: puzzleaurus o memodyn! La idea es **unir contenido educativo y juego liviano** en una sola app (SPA), pensada para probarse en local o en **GitHub Pages** sin depender de un backend para disfrutar el circuito principal.

| # | Área | Qué hacés ahí |
|---|------|----------------|
| 🗺️ | **Mapa** | Navegás eras (Triásico / Jurásico / Cretácico) y entrás a periodos. |
| 🖼️ | **Galería / eras** | Ves dinosaurios por periodo; en muchas pantallas podés **escanear** (X-Ray) para explorar el esqueleto y el contenido asociado. |
| 📚 | **Biblioteca** | Elegís **libros** y los leés en modo lectura interactiva. |
| 🎮 | **Games** | **Puzzleaurus** (rompecabezas por dinosaurio y dificultad) y **MemoDyn** (memoria con cartas). |
| 🏠 | **Landing + Nav** | Carousel de galerías, tienda simulada, billetera, perfil; progreso y logros en **localStorage** (demo usable sin backend). |

---

## 2. 🗺️ Mapa y galerías

El **mapa** conecta las eras y los periodos. Desde cada vista de era/galería accedés a los dinosaurios de esa franja temporal. El flujo de **escaneo** (donde esté disponible) está pensado para “ver por dentro” el modelo y acercarte al contenido educativo sin depender de un servidor propio para el core del juego.

---

## 3. 📚 Biblioteca

En **Library** abrís catálogo, elegís un libro y entrás a **Reading** con plantillas por tipo de contenido (texto, imágenes, etc.). Es contenido estático empaquetado en el front.

---

## 4. 🎮 Minijuegos

- **Puzzleaurus:** varios puzzles, niveles fácil / medio / difícil, piezas arrastrables y temporizador.  
- **MemoDyn:** memoria por parejas sobre cartas.

Rutas directas (sin login): **`/games`**, **`/puzzleaurus`**. El resto del museo pide **sesión o invitado** (ver §8).

---

## 5. ▶️ Cómo ejecutar

**Requisito:** Node **≥ 18** y **npm**.

```bash
git clone https://github.com/Gemdelle/Dino-Culture-Academy.git
cd Dino-Culture-Academy
npm install
npm run dev
```

La URL sale en consola (típico `http://localhost:5173`; el script usa `--host` para probar en red local).

| Script | Uso |
|--------|-----|
| `npm run dev` | Desarrollo |
| `npm run build` | `tsc` + build a `dist/` |
| `npm run preview` | Servir el `dist/` local |
| `npm run lint` | ESLint |
| `npm test` | Jest |

---

## 6. 🚀 GitHub Pages

- En **build**, `base` en `vite.config.ts` debe ser **`/<nombre-exacto-del-repo>/`** (hoy: `Dino-Culture-Academy`). En **dev**, `base` es `/`.  
- **Deploy:** workflow **Deploy to GitHub Pages** (pestaña **Actions** del repo, no *Settings → Actions*). Permisos: **Settings → Actions → General → Read and write**. Rama publicada: **`gh-pages`**, carpeta **`/`** en **Settings → Pages**.  
- En Windows, `npm run deploy` (gh-pages) puede fallar con **`ENAMETOOLONG`**; por eso el workflow en **`.github/workflows/deploy-gh-pages.yml`**.  
- Rutas bajo subpath (`/assets/…`, `public/` en puzzles) se resuelven con **`publicAsset()`** + plugin de build; no hace falta tocarlo si no cambiás el nombre del repo.

Demo: `https://gemdelle.github.io/Dino-Culture-Academy/` (ajustá usuario/repo si aplica).

---

## 7. 📁 Estructura del repositorio

```
Dino-Culture-Academy/
├── public/              assets estáticos (img, giph, puzzles, …)
├── src/
│   ├── App.tsx          AppRouter.tsx
│   ├── components/      Nav, XRay, puzzles, libros, …
│   ├── context/         Auth, Progress, Puzzle, Analytics, …
│   ├── pages/public/    Landing, Map, Library, Reading, Games, eras, …
│   ├── services/        auth, analytics, tips, progreso
│   ├── guard/           PrivateGuard, PublicGuard
│   ├── utils/           publicAsset (base URL en Pages)
│   └── shims/           ws-browser (bundle navegador)
├── vite.config.ts       base dev/build + alias ws + plugin prefijo /assets
├── vite-plugin-prefix-public-assets.ts
└── .github/workflows/deploy-gh-pages.yml
```

---

## 8. ⌨️ Cuenta e invitado

1. **`/login`** → **Entrar como invitado / Guest** → acceso al mapa, biblioteca, álbum, games, etc. sin backend de auth.  
2. Login con servidor: si reactivás `API_URL` y los `fetch` en `src/services/auth.service.ts`, volvé a usar cuenta real (hoy pueden estar comentados para demo solo front).

**Opcional:** `.env` con prefijo `VITE_` (Firebase, Supabase, Amplitude). Sin `.env`, la mayoría del museo igual corre; detalle en `src/lib/*` y `src/config/analytics.config.ts`.

---

PRs chicos y con descripción de cómo probar. Licencia / uso académico según tu criterio.
