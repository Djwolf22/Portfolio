# Portfolio — How To Add Stuff

Plain HTML/CSS/JS. No build step. Edit a file, save, `git add . && git commit -m "..." && git push`,
Cloudflare redeploys in about a minute.

---

## File map

```
index.html                          Home
about.html                          Certs, education, toolkit, story
experience.html                     Work history timeline
projects.html                       Project cards (rendered from JS data)
Endpoint-Deployment-Case-Study.html Case study page
assets/css/main.css                 ALL styling for every page
assets/js/main.js                   ALL behavior for every page
assets/js/projects-data.js          Project card content  <-- edit this for new projects
assets/files/                       Resume + certificate PDFs
assets/images/                      Project preview images
```

Two rules that keep things simple:
1. **All styling lives in `main.css`.** Change it once, every page updates.
2. **All behavior lives in `main.js`.** It self-detects what's on the page, so a page without a
   console just skips the console code. You never need to edit it to add normal content.

---

## Add a new project

Open `assets/js/projects-data.js` and add an object to the `PROJECTS` array. That's the whole job —
`projects.html` renders the cards automatically.

```js
{
    title: "Your Project Name",
    description: "One or two sentences on what it was and why it mattered.",
    bullets: [
        "First concrete detail or outcome.",
        "Second concrete detail or outcome."
    ],
    tech: "Skills: tool one, tool two, tool three",
    link: "https://github.com/you/repo",     // external URL, or "some-page.html" for an internal page
    image: "assets/images/your-image.png",   // optional, shows on card hover
    ctaLabel: "Read full case study"         // optional, defaults to "View project"
}
```

Field notes:
- `link` — external URLs (`https://...`) open in a new tab automatically. Internal pages open in the
  same tab. Leave it out entirely and the card renders as non-clickable.
- `image` — drop the file in `assets/images/` first. It reveals as a background on hover.
- `bullets` and `tech` are optional. Omit them and they just don't render.

---

## Add a new job to Experience

Open `experience.html`, copy an existing `<article class="timeline-item reveal">` block, and paste it
in the right chronological spot (newest at the top).

```html
<article class="timeline-item reveal">
    <div class="timeline-date">Month Year &mdash; Month Year</div>
    <div class="timeline-content">
        <h2>Job Title</h2>
        <h3>Company Name | City, ST</h3>
        <ul>
            <li>What you did, specific and concrete.</li>
            <li>Another thing you did.</li>
        </ul>
    </div>
</article>
```

Keep the `reveal` class — that's what makes it fade in on scroll.

---

## Add a new certification

Open `about.html`, find the certifications timeline, copy a `timeline-item` block. Newest first.

```html
<article class="timeline-item reveal">
    <div class="timeline-date">Mon Year</div>
    <div class="timeline-content">
        <h2>Certification Name</h2>
        <ul class="tag-list">
            <li>Domain One</li>
            <li>Domain Two</li>
        </ul>
        <a class="cta-link" href="assets/files/your-cert.pdf" target="_blank">View Certificate &rarr;</a>
    </div>
</article>
```

Put the PDF in `assets/files/` first.

---

## Add a whole new page

1. Copy `contact.html` (it's the simplest) and rename it.
2. Replace everything between `<main class="wrap">` and `</main>` with your content.
3. Update the `<title>` tag.
4. Add a link to it in the `<ul id="mainMenu">` block — **on every page**, so nav stays consistent.
5. On the new page, put `class="active"` on its own nav link and remove it from the others.

---

## Components you can reuse

Drop any of these inside a `<section class="section">`.

**Section heading**
```html
<p class="section-label">// Your Label</p>
<h2 class="section-heading">Your heading here.</h2>
```

**Plain panel**
```html
<div class="panel reveal">
    <p>Content goes here.</p>
</div>
```

**Two columns** (stacks automatically on mobile)
```html
<div class="split">
    <div class="panel reveal">Left</div>
    <div class="panel reveal">Right</div>
</div>
```

**Staggered cards** — the offset asymmetric layout from Home and About.
Uses exactly three items; `item-1/2/3` control the widths and offsets.
```html
<div class="stagger-grid">
    <div class="stagger-item item-1">
        <span class="idx">01</span>
        <h3>Title</h3>
        <p>Body text.</p>
    </div>
    <div class="stagger-item item-2">...</div>
    <div class="stagger-item item-3">...</div>
</div>
```

**Tag pills**
```html
<div class="security-strip">
    <span>KQL</span><span>SPL</span><span>Sentinel</span>
</div>
```

**Table**
```html
<div class="table-wrap reveal">
    <table>
        <thead><tr><th>Column</th><th>Column</th></tr></thead>
        <tbody><tr><td>Value</td><td>Value</td></tr></tbody>
    </table>
</div>
```

**Console panel** — the typing terminal box. IDs matter; `main.js` looks for them.
Only use one console per page.
```html
<div class="console reveal">
    <div class="console-top">
        <span class="dot"></span><span class="dot"></span><span class="dot"></span>
        <span class="title">panel-name</span>
    </div>
    <p class="line">&gt; <span id="typeLine1" class="type-target" data-text="command --here"></span></p>
    <dl id="consoleList" style="opacity:0; transition:opacity 0.5s ease;">
        <dt>Label</dt><dd>Value</dd>
    </dl>
    <p class="line">local time: <span id="liveClock">--:--:--</span></p>
    <p class="line">status: <span class="highlight" id="typeLine2" data-text="status text"></span></p>
</div>
```
Change the typed text via the `data-text` attributes. Drop the `liveClock` line if you don't want a clock.

**Animated counter** — counts up from zero when scrolled into view.
```html
<span data-count-to="3">0</span>+ yrs
```

---

## The `reveal` class

Add `class="reveal"` to anything you want to fade in on scroll. Multiple siblings stagger
automatically (2nd waits 0.08s, 3rd 0.16s, 4th 0.24s).

Don't put it on something above the fold that should be visible immediately.

---

## Changing colors

Everything derives from variables at the top of `main.css`:

```css
:root{
  --bg: #070912;        /* page background */
  --panel: rgba(15, 24, 43, 0.88);
  --text: #f5f8ff;
  --muted: #a8b4cc;     /* body/secondary text */
  --cyan: #55e7ff;      /* primary accent */
  --amber: #ffca6a;     /* secondary accent */
}
```

Change one value, it updates site-wide. If you change `--cyan`, also search `main.css` for
`85,231,255` — that's the same color in rgba form used in the glow effects, and it won't
follow the variable.

---

## Turning down the motion

The site has a lot going on. If you want it calmer, in `main.css`:

- **Cursor spotlight** — delete or comment out the `.spotlight` rule
- **Floating cards** — remove `animation: card-float 4.5s ease-in-out infinite;` from `.stagger-item`
- **Background orbs** — lower `opacity` on `.bg-orb` (currently `0.85`), or raise the animation
  durations on `.bg-orb.one` / `.bg-orb.two` to slow them
- **Grid drift** — raise `15s` in `body::before` to something like `40s`
- **Glowing headline** — remove `animation: text-glow ...` from `h1.mega .line2 .accent`
- **3D card tilt** — in `main.js`, delete the "3D tilt on cards" block

Anyone with reduced-motion enabled in their OS already gets all animation disabled automatically.

---

## Notes

- The site is always dark. It doesn't respond to light/dark mode, the palette is hardcoded.
- Page width is capped at 1240px with a 70px left offset for the vertical spine label.
  Below 900px that offset drops and the spine label hides.
- The nav is duplicated across every page. Change it in one place, change it everywhere.
