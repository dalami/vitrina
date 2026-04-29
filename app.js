// =============================================
//  SELECTO — LÓGICA DE LA APP
//  No necesitás editar este archivo.
//  Los datos están en data.js
// =============================================

const SLIDE_LABELS = ['Producto', 'Lifestyle', 'Branding', 'Packaging', 'Promo'];
const PLAN_ORDER = { premium: 0, featured: 1, basic: 2 };

let currentFilter = 'all';
let currentSearch = '';
let carouselIndex = 0;
let currentImages = [];

// ---------- PLANES ----------
function getPlanLabel(plan) {
  if (plan === 'premium')  return { text: 'Premium',   bg: '#1A1814', color: '#fff' };
  if (plan === 'featured') return { text: 'Destacado',  bg: '#C9A84C', color: '#fff' };
  return                          { text: 'Básico',    bg: '#EDE8DC', color: '#7A756A' };
}

// ---------- RENDER CARD ----------
function renderCard(e) {
  const plan = getPlanLabel(e.plan);
  const img = e.images && e.images.length > 0 ? e.images[0] : 'img/placeholder.jpg';
  return `
    <div class="card fade-up"
         data-id="${e.id}"
         data-cat="${e.rubro}"
         data-nombre="${e.nombre.toLowerCase()}"
         data-plan="${e.plan}"
         onclick="openModal(${e.id})">
      <div class="card-image">
        <img src="${img}" alt="${e.nombre}" loading="lazy">
        <div class="card-badges">
          <span class="badge badge-cat">${e.rubro}</span>
          ${e.plan === 'featured' ? '<span class="badge badge-featured">Destacado</span>' : ''}
          ${e.plan === 'premium'  ? '<span class="badge badge-premium">Premium</span>'   : ''}
        </div>
      </div>
      <div class="card-body">
        <div class="card-title">${e.nombre}</div>
        <div class="card-tagline">${e.tagline}</div>
        <div class="card-meta">
          ${e.ubicacion ? `<span class="card-meta-item">📍 ${e.ubicacion}</span>` : ''}
          <span class="card-meta-item">${e.envios ? '🚚 Envíos' : '🏪 Local'}</span>
        </div>
        <div class="card-footer">
          <div class="card-links">
            <a class="card-link-btn" href="https://wa.me/${e.whatsapp}" target="_blank"
               onclick="event.stopPropagation()" title="WhatsApp">💬</a>
            <a class="card-link-btn" href="https://instagram.com/${e.instagram}" target="_blank"
               onclick="event.stopPropagation()" title="Instagram">📷</a>
            ${e.web ? `<a class="card-link-btn" href="${e.web}" target="_blank"
               onclick="event.stopPropagation()" title="Web">🌐</a>` : ''}
          </div>
          
        </div>
      </div>
    </div>`;
}
//<span class="card-plan">${plan.text}</span>
// ---------- FILTROS Y BÚSQUEDA ----------
function getFiltered() {
  let list = [...EMPRENDIMIENTOS].sort((a, b) => PLAN_ORDER[a.plan] - PLAN_ORDER[b.plan]);

  if (currentFilter !== 'all') {
    list = list.filter(e => e.rubro === currentFilter);
  }
  if (currentSearch) {
    const q = currentSearch.toLowerCase();
    list = list.filter(e =>
      e.nombre.toLowerCase().includes(q) ||
      e.rubro.toLowerCase().includes(q) ||
      (e.ubicacion && e.ubicacion.toLowerCase().includes(q)) ||
      e.tagline.toLowerCase().includes(q) ||
      e.desc.toLowerCase().includes(q)
    );
  }
  return list;
}

function renderGrid() {
  const grid = document.getElementById('grid');
  const noRes = document.getElementById('no-results');
  const filtered = getFiltered();

  if (filtered.length === 0) {
    grid.innerHTML = '';
    noRes.classList.add('visible');
  } else {
    noRes.classList.remove('visible');
    grid.innerHTML = filtered.map(renderCard).join('');
    document.getElementById('grid-count').textContent =
      `${filtered.length} emprendimiento${filtered.length !== 1 ? 's' : ''}`;
    observeFadeUp();
  }

  document.getElementById('stat-total').textContent = EMPRENDIMIENTOS.length;
}

function filterCat(el) {
  currentFilter = el.dataset.cat;
  document.querySelectorAll('.category-pill').forEach(p => p.classList.remove('active'));
  el.classList.add('active');
  renderGrid();
}

function doSearch() {
  currentSearch = document.getElementById('search-input').value.trim();
  renderGrid();
}

function sortCards(val) {
  const grid = document.getElementById('grid');
  const cards = [...grid.querySelectorAll('.card')];
  if (val === 'az') {
    cards.sort((a, b) => a.dataset.nombre.localeCompare(b.dataset.nombre));
  } else {
    cards.sort((a, b) => PLAN_ORDER[a.dataset.plan] - PLAN_ORDER[b.dataset.plan]);
  }
  cards.forEach(c => grid.appendChild(c));
}

// ---------- MODAL ----------
function openModal(id) {
  const e = EMPRENDIMIENTOS.find(x => x.id === id);
  if (!e) return;

  currentImages = e.images || [];
  carouselIndex = 0;

  // Carrusel
  const track = document.getElementById('carousel-track');
  track.style.transform = 'translateX(0)';
  track.innerHTML = currentImages.map((src, i) =>
    `<div class="carousel-slide"><img src="${src}" alt="Foto ${i + 1}" loading="lazy"></div>`
  ).join('');

  const dots = document.getElementById('carousel-dots');
  dots.innerHTML = currentImages.map((_, i) =>
    `<div class="carousel-dot ${i === 0 ? 'active' : ''}" onclick="goSlide(${i})"></div>`
  ).join('');

  updateCarouselLabel();

  // Ocultar flechas si hay una sola imagen
  document.querySelectorAll('.carousel-btn').forEach(btn => {
    btn.style.display = currentImages.length <= 1 ? 'none' : 'flex';
  });

  // Info
  document.getElementById('m-rubro').textContent = e.rubro.toUpperCase();
  document.getElementById('m-nombre').textContent = e.nombre;
  document.getElementById('m-desc').textContent = e.desc;

  const plan = getPlanLabel(e.plan);
  const pb = document.getElementById('m-plan-badge');
  pb.textContent = plan.text;
  pb.style.background = plan.bg;
  pb.style.color = plan.color;

  document.getElementById('m-info-grid').innerHTML = `
    ${e.ubicacion ? `<div class="modal-info-item"><div class="modal-info-label">Ubicación</div><div class="modal-info-value">📍 ${e.ubicacion}</div></div>` : ''}
    <div class="modal-info-item"><div class="modal-info-label">Envíos</div><div class="modal-info-value">${e.envios ? '🚚 A todo el país' : '🏪 Solo local'}</div></div>
    <div class="modal-info-item"><div class="modal-info-label">Categoría</div><div class="modal-info-value">${e.rubro}</div></div>
    <div class="modal-info-item"><div class="modal-info-label">Plan</div><div class="modal-info-value">${plan.text}</div></div>
  `;

  document.getElementById('m-contact').innerHTML = `
    <a class="contact-btn wa" href="https://wa.me/${e.whatsapp}" target="_blank">💬 WhatsApp</a>
    <a class="contact-btn ig" href="https://instagram.com/${e.instagram}" target="_blank">📷 Instagram</a>
    ${e.email ? `<a class="contact-btn em" href="mailto:${e.email}">✉️ Email</a>` : ''}
    ${e.web   ? `<a class="contact-btn web" href="${e.web}" target="_blank">🌐 Visitar web oficial</a>` : ''}
  `;

  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

function closeModalOverlay(e) {
  if (e.target === document.getElementById('modal-overlay')) closeModal();
}

// ---------- CARRUSEL ----------
function updateCarousel() {
  document.getElementById('carousel-track').style.transform = `translateX(-${carouselIndex * 100}%)`;
  document.querySelectorAll('.carousel-dot').forEach((d, i) => d.classList.toggle('active', i === carouselIndex));
  updateCarouselLabel();
}
function updateCarouselLabel() {
  document.getElementById('carousel-label').textContent = SLIDE_LABELS[carouselIndex] || `Foto ${carouselIndex + 1}`;
}
function carouselNext() { carouselIndex = (carouselIndex + 1) % currentImages.length; updateCarousel(); }
function carouselPrev() { carouselIndex = (carouselIndex - 1 + currentImages.length) % currentImages.length; updateCarousel(); }
function goSlide(i)      { carouselIndex = i; updateCarousel(); }

// ---------- MENÚ MÓVIL ----------
function toggleMenu() {
  document.querySelector('.nav-links').classList.toggle('open');
}

// ---------- ANIMACIONES SCROLL ----------
function observeFadeUp() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.08 });
  document.querySelectorAll('.fade-up:not(.visible)').forEach(el => obs.observe(el));
}

// ---------- CONTADOR HERO ----------
function animateCount(el, target) {
  let n = 0;
  const step = () => { n += Math.ceil((target - n) / 6); el.textContent = n; if (n < target) requestAnimationFrame(step); else el.textContent = target; };
  requestAnimationFrame(step);
}

// ---------- WHATSAPP PLANES ----------
function openWhatsApp() {
  window.open('https://wa.me/5492254414211?text=Hola! Quiero publicar en Selecto.', '_blank');
}

// ---------- EVENTOS ----------
document.getElementById('search-input').addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(); });
document.getElementById('search-input').addEventListener('input', e => { if (!e.target.value) { currentSearch = ''; renderGrid(); } });
document.getElementById('modal-close-btn').addEventListener('click', closeModal);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
  if (document.getElementById('modal-overlay').classList.contains('open')) {
    if (e.key === 'ArrowRight') carouselNext();
    if (e.key === 'ArrowLeft')  carouselPrev();
  }
});

// ---------- INIT ----------
renderGrid();
setTimeout(() => animateCount(document.getElementById('stat-total'), EMPRENDIMIENTOS.length), 600);
const cats = [...new Set(EMPRENDIMIENTOS.map(e => e.rubro))];
document.getElementById('stat-cats').textContent = cats.length;