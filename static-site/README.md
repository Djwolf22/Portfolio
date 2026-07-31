# Dominik Rimpel — Static Portfolio

A static (no server, no PHP) version of the portfolio. Same design and content as the
PHP version, just multi-page HTML instead of `?page=` routing — works on any static host.

## Adding new content over time

**New project:** open `assets/js/projects-data.js` and add one object to the `PROJECTS`
array (a template is commented at the bottom of the file). No HTML editing needed —
`projects.html` renders cards from this file automatically.

**New page:** copy any existing `.html` file (e.g. `about.html`), replace the content
inside `<main>...</main>`, and add a link to it in the `<ul class="menu">` block on
every page (search-and-replace across files makes this quick).

**Any style change:** everything shared (colors, fonts, spacing, card styles) lives in
one place — `assets/css/main.css` — so a change there applies site-wide instantly.

## Files
- `index.html`, `about.html`, `experience.html`, `projects.html`, `contact.html`
- `assets/css/main.css`, `assets/js/main.js`, `assets/files/Dominik-Rimpel-Resume.pdf`

## Before you deploy: hook up the contact form
This version has no backend, so the contact form needs a free form service. Recommended: [Formspree](https://formspree.io).

1. Sign up free at formspree.io and create a new form.
2. Copy the endpoint it gives you (looks like `https://formspree.io/f/abcd1234`).
3. Open `contact.html` and replace `YOUR_FORM_ID` in this line:
   ```html
   <form id="contactForm" method="POST" action="https://formspree.io/f/YOUR_FORM_ID" novalidate>
   ```
4. Submissions will land in your Formspree inbox/email. Free tier covers 50 submissions/month.

If you'd rather skip a form service entirely, you can change the form to a plain
`mailto:` link instead — simpler, but it opens the visitor's email client rather than
submitting silently.

## Deploy option A — GitHub Pages (free)
1. Create a new GitHub repo (e.g. `portfolio`).
2. Upload all files in this folder to the repo (keep the folder structure).
3. Repo → Settings → Pages → set source to the `main` branch, root folder.
4. Your site goes live at `https://YOUR_USERNAME.github.io/portfolio/`.

## Deploy option B — Netlify (free)
1. Go to netlify.com → sign up (GitHub login is fastest).
2. Drag this whole folder onto the Netlify dashboard ("Deploy manually" / drag-and-drop).
3. You get a live URL immediately (e.g. `random-name.netlify.app`); you can rename it
   or attach a custom domain for free in Site Settings.

Both options are free forever for a static site like this — no billing surprises.
