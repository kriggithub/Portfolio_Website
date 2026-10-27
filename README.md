# Kurt Riggin — Portfolio Website

Personal site for Kurt Riggin: Biostatistician, YouTube Creator, and Technology & AI Enthusiast.

**Live site:** https://kriggithub.github.io/Portfolio_Website/

## Pages

- **Home** — hero section and About Me
- **Academic Work** — GitHub repositories, data analysis projects, and biostatistics work
- **YouTube / Business** — YouTube content and business contact

## Tech

A static site with no build step: plain HTML, CSS, and JavaScript, hosted on GitHub Pages.

```
index.html         Page shell, nav, footer, meta tags, CSP
styles/global.css  All styling (dark mode)
js/content.js      HTML for each page view
js/app.js          View switching and navigation
js/effects.js      Background canvas and interactive effects
images/            Site images (.webp)
Kurt_Riggin_CV.pdf Downloadable resume
```

## Running locally

Serve the folder with any static file server, for example:

```sh
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Deploying

Pushes to `main` are published by GitHub Pages.
