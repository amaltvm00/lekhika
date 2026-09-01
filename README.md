# Pratilipi FM MVP - Audio Literature Platform

An immersive, high-performance audio literature and serialized storytelling web application built with **React**, **Vite**, and **Tailwind CSS**.

---

## 🌟 Overview & Features

- **Master Catalog & Categorized Carousels**: Explore serialized audio literature across genres including **Romance**, **Horror**, and **Sci-Fi**.
- **Instant Playback Audio Engine**: Clicking any story or episode immediately streams and activates the master audio engine.
- **Persistent Sticky Audio Deck**: Full-featured audio player at the bottom of the screen with play/pause, 10s skip/rewind, precision seek scrubber, VU audio channel meter, and volume slider.
- **Creator Studio**: Publish original stories with custom titles, creator metadata, categories, cover art, and audio streams.
- **Session Persistence**: Audio catalog state and creator uploads are automatically persisted across browser reloads using `localStorage` (`pratilipi_tracks`).
- **Interactive Story Modals**: Inspect episode chapters, play counts, ratings, and synopsis details.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript / JSX
- **Build Tool**: Vite
- **Styling**: Tailwind CSS (Dark Mode Design System)
- **Icons**: Lucide React
- **Audio**: Web Audio API + HTML5 Audio Engine

---

## 🚀 Local Development Setup

### 1. Clone or Extract the Repository
```bash
git clone https://github.com/your-username/pratilipi-fm-mvp.git
cd pratilipi-fm-mvp
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or the port displayed in your terminal) in your browser.

### 4. Build for Production
```bash
npm run build
```
This compiles and bundles the production-ready static assets into the `dist/` directory.

---

## 🌐 Deployment Guide

### Option A: Deploy to Netlify

#### Drag & Drop (Fastest)
1. Run `npm run build`.
2. Go to [Netlify Drop](https://app.netlify.com/drop).
3. Drag and drop the generated `dist/` folder into the Netlify dashboard.

#### Netlify CLI / Git Integration
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- If you use client-side routing, create a `public/_redirects` file with:
  ```text
  /*    /index.html   200
  ```

---

### Option B: Deploy to GitHub Pages

1. In `package.json`, install `gh-pages` if desired or use GitHub Actions:
   ```bash
   npm install --save-dev gh-pages
   ```
2. In `vite.config.js` or `vite.config.ts`, set the `base` property to your repo name:
   ```javascript
   export default defineConfig({
     base: '/pratilipi-fm-mvp/',
     // ...
   });
   ```
3. Add a deploy script to `package.json`:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
4. Run:
   ```bash
   npm run deploy
   ```
5. In your GitHub repository settings under **Pages**, set the source branch to `gh-pages`.

---

## 📄 License
MIT License
