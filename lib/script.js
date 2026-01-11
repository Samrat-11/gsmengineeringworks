const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
  document.documentElement.classList.add('reduce-motion');
}

const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');

if (navToggle && navList) {
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-controls', 'main-nav');
  navList.id = 'main-nav';

  navToggle.addEventListener('click', () => {
    const isOpen = navList.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  // Close on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navList.classList.contains('open')) {
      navList.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}
document.querySelectorAll('.nav-list a').forEach(link => {
  link.addEventListener('click', () => {
    navList.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
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