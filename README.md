# Battini Lakshminarayana Goud — Portfolio 🚀

Advanced AI Developer portfolio with glassmorphism design, Three.js neural network hero, physics-based tech stack, and smooth scroll animations.

## Tech Stack
React 18 · TypeScript · Vite · Three.js · React Three Fiber · Rapier Physics · GSAP · Lenis · React Icons

## Features
- 🧠 Three.js Neural Network hero animation (mouse-reactive)
- ⚡ Physics-based tech stack sphere simulation (Rapier)
- 🪟 Full glassmorphism design system
- 🎯 GSAP scroll-triggered animations
- 🌊 Lenis smooth scroll (no paid GSAP plugins!)
- 💫 Custom cursor with glow effects
- 📱 Fully responsive
- 🎨 Typewriter role animation in hero

## Quick Start

```bash
npm install
npm run dev
```

## Customization

### Adding your resume PDF
Place your resume PDF at `public/resume.pdf` and update the href in `SocialIcons.tsx`:
```tsx
<a className="resume-button" href="/resume.pdf" download>
```

### Adding real project screenshots
Place images in `public/images/` and update the `gradient` field in `Projects.tsx` with `<img>` tags.

### Swapping 3D element
The neural network is in `src/components/Landing.tsx` inside the `useEffect`. The Three.js scene can be fully replaced.

### Design tokens
All colors, blur values, and spacing are CSS variables in `src/index.css` under `:root`.

## Build
```bash
npm run build
```

Deploy to Vercel, Netlify, or any static host.

## License
MIT License — customize freely.
