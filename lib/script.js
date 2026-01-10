// Mobile nav toggle
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion){ document.documentElement.classList.add('reduce-motion'); }

const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');
if (navToggle) {
  navToggle.setAttribute('aria-expanded','false');
  navToggle.setAttribute('aria-controls','main-nav');
}
if (navList) { navList.id = 'main-nav'; }
navToggle?.addEventListener('click', ()=>{
  const open = navList.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
});

// Close mobile nav with Escape
document.addEventListener('keydown', (e)=>{
  if (e.key === 'Escape'){
    if (navList && navList.classList.contains('open')){ navList.classList.remove('open'); navToggle?.setAttribute('aria-expanded','false'); }
  }
});
// Lightbox for gallery (click, keyboard navigation, and focus management)
const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const lightboxClose = document.querySelector('.lightbox-close');
let currentIndex = -1;

function openLightbox(index){
  const img = galleryItems[index];
  if (!img) return;
  currentIndex = index;
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt || '';
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden','false');
  lightbox.focus();
}

galleryItems.forEach((img, idx) => {
  img.addEventListener('click', () => openLightbox(idx));
  img.addEventListener('keydown', (e)=>{ if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(idx); } });
});

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e)=>{ if(e.target === lightbox) closeLightbox(); });

function closeLightbox(){
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden','true');
  lightboxImg.src = '';
  currentIndex = -1;
}

// Keyboard navigation inside lightbox
document.addEventListener('keydown', (e)=>{
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') { closeLightbox(); }
  if (e.key === 'ArrowRight') { openLightbox((currentIndex + 1) % galleryItems.length); }
  if (e.key === 'ArrowLeft') { openLightbox((currentIndex - 1 + galleryItems.length) % galleryItems.length); }
});
// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Form handler: submits to form action via fetch, supports Formspree (AJAX) and allows Netlify to handle forms natively
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', async (e) => {
    // If using Netlify (no action or data-form-provider="netlify"), allow default browser submission
    if (!form.action || form.dataset.formProvider === 'netlify') {
      return; // let Netlify handle the form submission
    }

    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    const statusEl = form.querySelector('.form-status');
    submitBtn.disabled = true;
    statusEl.textContent = 'Sending...';
    try {
      const action = form.action;
      const formData = new FormData(form);
      const res = await fetch(action, {
        method: form.method || 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData
      });
      if (res.ok) {
        form.reset();
        statusEl.textContent = 'Thanks! Your message has been sent.';
      } else {
        const data = await res.json().catch(()=>null);
        statusEl.textContent = (data && data.error) ? `Error: ${data.error}` : 'There was a problem sending your message. Please try again later.';
      }
    } catch (err) {
      statusEl.textContent = 'Network error — please try again later.';
    } finally {
      submitBtn.disabled = false;
    }
  });
}