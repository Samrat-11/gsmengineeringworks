TruckPro Services — Prototype website

What is included:
- `index.html` — homepage prototype with hero, services, gallery and contact form
- `services.html` — detailed Services page (Repair, Fabrication, Engine Works)
- `gallery.html` — full gallery page with lightbox
- `styles.css` — prototype styling (responsive)
- `script.js` — small interactions (mobile nav, lightbox, contact alert)
- `img/` — folder for your photos (currently using external placeholders)

How to preview:
1. Open `index.html` in your browser (double-click or use the Live Server extension).
2. Replace placeholder images with your photos in `img/` and update the image `src` attributes.

Next steps I recommend:
- Provide your logo, brand colors, and copy so I can replace placeholders and fine-tune the design.
- Choose a form provider (Formspree/Netlify) or provide server details so I can hook up the contact form — see configuration steps below.
- Provide your address so I can add a precise Google Maps embed, or paste the embed iframe src from Google Maps into `index.html`.

Configure the contact form (Formspree):
1. Sign up at https://formspree.io and create a new form — copy the form endpoint like `https://formspree.io/f/xxxx`.
2. Open `index.html` and replace the `action` attribute on the form with your endpoint.
3. The site already uses JS to POST the form and show status messages; no further changes are required.

Configure Netlify Forms:
1. If you host on Netlify, enable Forms and add `data-netlify="true"` to the `<form>` element and include `<input type="hidden" name="form-name" value="contact">` inside the form.
2. Remove the `action` attribute so Netlify captures submissions via HTML.
3. Netlify will display submissions in your site dashboard.

Google Maps:
- To embed a specific location, open Google Maps, find your business, click Share → Embed a map → copy the iframe embed code and replace the iframe `src` in `index.html` with your URL.

If you want, I can finish the configuration for you — send the Formspree endpoint and your address and I will finalize the form and map integration.

If you're happy with the layout, I'll proceed to make the site production-ready (image optimization, accessibility fixes, multi-page structure and deployment instructions).

Assets & image optimization:
- Drop your logo and full-resolution photos into `img/` and update `index.html` and `gallery.html` image `src` attributes.
- I can optimize images (resize, generate webp, and create responsive srcset) and replace the placeholder SVGs with optimized images.
- Naming convention I use: `photo-name@1x.jpg`, `photo-name@2x.jpg`, `photo-name.webp` to keep things clear.

Accessibility & testing:
- I ran basic accessibility improvements: added a skip link, focus-visible styles, keyboard handling for the gallery lightbox (Esc, left/right), and improved ARIA on interactive controls.
- Next I will run cross-device manual checks (mobile/tablet/desktop) and run an automated accessibility audit (axe or Lighthouse) and fix any remaining issues.

Deployment options:

- Netlify (recommended):
  1. Drag-and-drop the site folder to https://app.netlify.com/drop OR connect your GitHub repo and select the branch.
  2. To use Netlify Forms, edit the form in `index.html` and add `data-netlify="true"` and `<input type="hidden" name="form-name" value="contact">`.
  3. Example `netlify.toml` (already included) configures the publish directory for a static site.

- Vercel:
  1. Connect your GitHub repo at https://vercel.com/import and deploy. Vercel serves static sites out-of-the-box.
  2. For form handling use Formspree or a serverless function.

- GitHub Pages / Static hosting:
  1. Zip the repository and upload to your hosting provider, or push to a branch and enable GitHub Pages.

I included `netlify.toml` and `DEPLOY.md` with exact steps. Tell me which provider you prefer and I will configure deploy settings and test the form submission flow if you give me the Formspree endpoint or Netlify access.