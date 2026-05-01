// =============================================
//  HECHO — LÓGICA DE LA APP
//  No necesitás editar este archivo.
//  Los datos están en data.js
// =============================================

const SLIDE_LABELS = ["Producto", "Lifestyle", "Branding", "Packaging", "Promo"];
const PLAN_ORDER = { premium: 0, featured: 1, basic: 2 };

let currentFilter = "all";
let currentSearch = "";
let carouselIndex = 0;
let currentImages = [];

// ---------- SEO DINÁMICO ----------
function setSEO({ title, desc, image, url }) {
  document.title = title;
  const setMeta = (sel, attr, val) => {
    let el = document.querySelector(sel);
    if (!el) { el = document.createElement('meta'); document.head.appendChild(el); }
    el.setAttribute(attr, val);
  };
  setMeta('meta[name="description"]',        'content', desc);
  setMeta('meta[property="og:title"]',       'content', title);
  setMeta('meta[property="og:description"]', 'content', desc);
  setMeta('meta[property="og:image"]',       'content', image || '');
  setMeta('meta[property="og:url"]',         'content', url || window.location.href);
  setMeta('meta[property="og:type"]',        'content', 'website');
  setMeta('meta[name="twitter:card"]',       'content', 'summary_large_image');
  setMeta('meta[name="twitter:title"]',      'content', title);
  setMeta('meta[name="twitter:description"]','content', desc);
}

function injectSchema(e) {
  document.querySelectorAll('script[type="application/ld+json"]').forEach(s => s.remove());
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": e.nombre,
    "description": e.desc,
    "image": e.images?.[0] || '',
    "address": { "@type": "PostalAddress", "addressLocality": e.ubicacion || '' },
    "telephone": e.whatsapp ? `+${e.whatsapp}` : undefined,
    "url": e.web || window.location.href,
    "sameAs": [`https://instagram.com/${e.instagram}`].filter(Boolean)
  };
  const s = document.createElement('script');
  s.type = 'application/ld+json';
  s.textContent = JSON.stringify(schema);
  document.head.appendChild(s);
}

function injectBaseSEOMeta() {
  const head = document.head;
  const metas = [
    ['name',     'description', 'Descubrí emprendimientos independientes con identidad propia. Gastronomía, deco, regalos, moda y más.'],
    ['property', 'og:title',    'Hecho — Directorio de Emprendimientos'],
    ['property', 'og:description', 'Productos, servicios y emprendimientos seleccionados en un solo lugar.'],
    ['property', 'og:type',     'website'],
    ['name',     'robots',      'index, follow'],
    ['name',     'theme-color', '#F5F0E8'],
  ];
  metas.forEach(([attr, name, content]) => {
    if (!document.querySelector(`meta[${attr}="${name}"]`)) {
      const m = document.createElement('meta');
      m.setAttribute(attr, name);
      m.setAttribute('content', content);
      head.appendChild(m);
    }
  });
  if (!document.querySelector('link[rel="canonical"]')) {
    const link = document.createElement('link');
    link.rel = 'canonical';
    link.href = window.location.origin + window.location.pathname;
    head.appendChild(link);
  }
}

// ---------- PLANES ----------
function getPlanLabel(plan) {
  if (plan === "premium")  return { text: "Premium",  bg: "#1A1814", color: "#fff" };
  if (plan === "featured") return { text: "Destacado", bg: "#C9A84C", color: "#fff" };
  return                          { text: "Básico",   bg: "#EDE8DC", color: "#7A756A" };
}

// ---------- WHATSAPP URL ----------
function buildWhatsAppUrl(whatsapp, mensaje) {
  const tel = whatsapp.toString().trim().replace(/\D/g, '');
  return `https://api.whatsapp.com/send?phone=${tel}&text=${encodeURIComponent(mensaje)}`;
}

// ---------- QR ----------
function getQRUrl(text, size = 200) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}&bgcolor=FAFAF7&color=1A1814&margin=2`;
}

function downloadQR(empId) {
  const e = EMPRENDIMIENTOS.find(x => x.id === empId);
  if (!e) return;
  const fichaUrl = `${window.location.origin}${window.location.pathname}?emp=${empId}`;
  const qrUrl = getQRUrl(fichaUrl, 400);
  fetch(qrUrl)
    .then(r => r.blob())
    .then(blob => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `qr-${e.nombre.toLowerCase().replace(/\s+/g, '-')}.png`;
      a.click();
      URL.revokeObjectURL(a.href);
    })
    .catch(() => window.open(qrUrl, '_blank'));
}

function showQRModal(empId) {
  const e = EMPRENDIMIENTOS.find(x => x.id === empId);
  if (!e) return;
  const fichaUrl = `${window.location.origin}${window.location.pathname}?emp=${empId}`;
  const qrUrl = getQRUrl(fichaUrl, 300);
  document.getElementById('qr-overlay')?.remove();

  const overlay = document.createElement('div');
  overlay.id = 'qr-overlay';
  overlay.style.cssText = `position:fixed;inset:0;z-index:400;background:rgba(26,24,20,0.75);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:24px;`;
  overlay.innerHTML = `
    <div style="background:#FAFAF7;border-radius:24px;padding:40px 32px;text-align:center;max-width:360px;width:100%;position:relative;box-shadow:0 24px 64px rgba(26,24,20,0.2);">
      <button onclick="document.getElementById('qr-overlay').remove()" style="position:absolute;top:14px;right:14px;background:rgba(26,24,20,0.08);border:none;width:32px;height:32px;border-radius:50%;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;">✕</button>
      <div style="font-family:'DM Serif Display',serif;font-size:24px;margin-bottom:4px;">${e.nombre}</div>
      <div style="font-size:13px;color:#7A756A;margin-bottom:24px;">QR de tu ficha en Hecho</div>
      <img src="${qrUrl}" alt="QR ${e.nombre}" width="200" height="200" style="border-radius:16px;border:1px solid rgba(26,24,20,0.1);margin-bottom:16px;">
      <div style="font-size:12px;color:#7A756A;margin-bottom:24px;line-height:1.6;">Escaneá para ver la ficha · Ideal para imprimir en tarjetas, carteles o folletería</div>
      <button onclick="downloadQR(${empId})" style="background:#1A1814;color:#fff;border:none;border-radius:100px;padding:13px 28px;font-family:'Syne',sans-serif;font-size:14px;font-weight:700;cursor:pointer;width:100%;transition:background 0.2s;">⬇️ Descargar PNG</button>
    </div>`;
  overlay.addEventListener('click', ev => { if (ev.target === overlay) overlay.remove(); });
  document.body.appendChild(overlay);
}

// ---------- RENDER CARD ----------
function renderCard(e) {
  const img = e.images && e.images.length > 0 ? e.images[0] : "img/placeholder.jpg";
  const waMensaje = `Hola ${e.nombre}! Vi tu ficha en Hecho.`;
  return `
    <div class="card fade-up"
         data-id="${e.id}"
         data-cat="${e.rubro}"
         data-nombre="${e.nombre.toLowerCase()}"
         data-plan="${e.plan}"
         onclick="openModal(${e.id})">
      <div class="card-image">
        <img src="${img}" alt="${e.nombre}" loading="lazy" width="400" height="220">
        <div class="card-badges">
          <span class="badge badge-cat">${e.rubro}</span>
          ${e.plan === "featured" ? '<span class="badge badge-featured">Destacado</span>' : ""}
          ${e.plan === "premium"  ? '<span class="badge badge-premium">Premium</span>'   : ""}
        </div>
      </div>
      <div class="card-body">
        <div class="card-title">${e.nombre}</div>
        <div class="card-tagline">${e.tagline}</div>
        <div class="card-meta">
          ${e.ubicacion ? `<span class="card-meta-item">📍 ${e.ubicacion}</span>` : ""}
          <span class="card-meta-item">${e.envios ? "🚚 Envíos" : "🏪 Local"}</span>
        </div>
        <div class="card-footer">
          <div class="card-links">
            <a class="card-link-btn" href="${buildWhatsAppUrl(e.whatsapp, waMensaje)}"
               target="_blank" onclick="event.stopPropagation()" title="WhatsApp">💬</a>
            <a class="card-link-btn" href="https://instagram.com/${e.instagram}"
               target="_blank" onclick="event.stopPropagation()" title="Instagram">📷</a>
            ${e.web ? `<a class="card-link-btn" href="${e.web}"
               target="_blank" onclick="event.stopPropagation()" title="Web">🌐</a>` : ""}
          </div>
        </div>
      </div>
    </div>`;
}

// ---------- FILTROS Y BÚSQUEDA ----------
function getFiltered() {
  let list = [...EMPRENDIMIENTOS].sort((a, b) => PLAN_ORDER[a.plan] - PLAN_ORDER[b.plan]);
  if (currentFilter !== "all") list = list.filter(e => e.rubro === currentFilter);
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
  const grid = document.getElementById("grid");
  const noRes = document.getElementById("no-results");
  const filtered = getFiltered();
  if (filtered.length === 0) {
    grid.innerHTML = "";
    noRes.classList.add("visible");
  } else {
    noRes.classList.remove("visible");
    grid.innerHTML = filtered.map(renderCard).join("");
    document.getElementById("grid-count").textContent =
      `${filtered.length} emprendimiento${filtered.length !== 1 ? "s" : ""}`;
    observeFadeUp();
  }
  document.getElementById("stat-total").textContent = EMPRENDIMIENTOS.length;
}

function filterCat(el) {
  currentFilter = el.dataset.cat;
  document.querySelectorAll(".category-pill").forEach(p => p.classList.remove("active"));
  el.classList.add("active");
  renderGrid();
}

function doSearch() {
  currentSearch = document.getElementById("search-input").value.trim();
  renderGrid();
}

function sortCards(val) {
  const grid = document.getElementById("grid");
  const cards = [...grid.querySelectorAll(".card")];
  if (val === "az") cards.sort((a, b) => a.dataset.nombre.localeCompare(b.dataset.nombre));
  else cards.sort((a, b) => PLAN_ORDER[a.dataset.plan] - PLAN_ORDER[b.dataset.plan]);
  cards.forEach(c => grid.appendChild(c));
}

// ---------- MODAL ----------
function openModal(id) {
  const e = EMPRENDIMIENTOS.find(x => x.id === id);
  if (!e) return;

  setSEO({
    title: `${e.nombre} — Hecho`,
    desc: e.tagline,
    image: e.images?.[0],
    url: `${window.location.origin}${window.location.pathname}?emp=${e.id}`
  });
  injectSchema(e);

  currentImages = e.images || [];
  carouselIndex = 0;

  // Carrusel
  const track = document.getElementById("carousel-track");
  track.style.transform = "translateX(0)";
  track.innerHTML = currentImages.map((src, i) =>
    `<div class="carousel-slide"><img src="${src}" alt="${e.nombre} foto ${i + 1}" loading="lazy" width="780" height="320"></div>`
  ).join("");

  document.getElementById("carousel-dots").innerHTML = currentImages.map((_, i) =>
    `<div class="carousel-dot ${i === 0 ? "active" : ""}" onclick="goSlide(${i})"></div>`
  ).join("");

  updateCarouselLabel();
  document.querySelectorAll(".carousel-btn").forEach(btn => {
    btn.style.display = currentImages.length <= 1 ? "none" : "flex";
  });

  // Textos
  document.getElementById("m-rubro").textContent = e.rubro.toUpperCase();
  document.getElementById("m-nombre").textContent = e.nombre;
  document.getElementById("m-desc").textContent = e.desc;

  const plan = getPlanLabel(e.plan);
  const pb = document.getElementById("m-plan-badge");
  pb.textContent = plan.text;
  pb.style.background = plan.bg;
  pb.style.color = plan.color;

  // ✅ Info grid — UNA SOLA ASIGNACIÓN con WhatsApp personalizado
  const waPersonalizado = buildWhatsAppUrl(
    e.whatsapp,
    `Hola ${e.nombre}! Vi tu perfil en Hecho y me gustaría recibir atención personalizada 😊`
  );

  document.getElementById("m-info-grid").innerHTML = `
    ${e.ubicacion ? `
    <div class="modal-info-item">
      <div class="modal-info-label">Ubicación</div>
      <div class="modal-info-value">📍 ${e.ubicacion}</div>
    </div>` : ''}
    <div class="modal-info-item">
      <div class="modal-info-label">Envíos</div>
      <div class="modal-info-value">${e.envios ? "🚚 A todo el país" : "🏪 Solo local"}</div>
    </div>
    <div class="modal-info-item">
      <div class="modal-info-label">Categoría</div>
      <div class="modal-info-value">${e.rubro}</div>
    </div>
    <a href="${waPersonalizado}" target="_blank"
       style="text-decoration:none;cursor:pointer;transition:background 0.2s;"
       class="modal-info-item modal-atencion">
      <div class="modal-info-label" style="color:#25D366;">✦ Atención personalizada</div>
      <div class="modal-info-value">Consultar ahora →</div>
    </a>
  `;

  // Contacto + QR
  document.getElementById("m-contact").innerHTML = `
    <a class="contact-btn wa"  href="${waPersonalizado}" target="_blank">💬 WhatsApp</a>
    <a class="contact-btn ig"  href="https://instagram.com/${e.instagram}" target="_blank">📷 Instagram</a>
    ${e.email ? `<a class="contact-btn em" href="mailto:${e.email}">✉️ Email</a>` : ""}
    ${e.web   ? `<a class="contact-btn web" href="${e.web}" target="_blank">🌐 Web oficial</a>` : ""}
    <button class="contact-btn qr" onclick="showQRModal(${e.id})" type="button">📲 QR de la ficha</button>
  `;

  document.getElementById("modal-overlay").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  document.getElementById("modal-overlay").classList.remove("open");
  document.body.style.overflow = "";
  setSEO({
    title: "Hecho — Directorio de Emprendimientos",
    desc: "Productos, servicios y emprendimientos seleccionados en un solo lugar.",
  });
}

function closeModalOverlay(e) {
  if (e.target === document.getElementById("modal-overlay")) closeModal();
}

// ---------- CARRUSEL ----------
function updateCarousel() {
  document.getElementById("carousel-track").style.transform = `translateX(-${carouselIndex * 100}%)`;
  document.querySelectorAll(".carousel-dot").forEach((d, i) => d.classList.toggle("active", i === carouselIndex));
  updateCarouselLabel();
}
function updateCarouselLabel() {
  document.getElementById("carousel-label").textContent = SLIDE_LABELS[carouselIndex] || `Foto ${carouselIndex + 1}`;
}
function carouselNext() { carouselIndex = (carouselIndex + 1) % currentImages.length; updateCarousel(); }
function carouselPrev() { carouselIndex = (carouselIndex - 1 + currentImages.length) % currentImages.length; updateCarousel(); }
function goSlide(i)      { carouselIndex = i; updateCarousel(); }

// ---------- MENÚ MÓVIL ----------
function toggleMenu() {
  document.querySelector(".nav-links").classList.toggle("open");
}

// ---------- ANIMACIONES SCROLL ----------
function observeFadeUp() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } });
  }, { threshold: 0.08 });
  document.querySelectorAll(".fade-up:not(.visible)").forEach(el => obs.observe(el));
}

// ---------- CONTADOR HERO ----------
function animateCount(el, target) {
  let n = 0;
  const step = () => { n += Math.ceil((target - n) / 6); el.textContent = n; if (n < target) requestAnimationFrame(step); else el.textContent = target; };
  requestAnimationFrame(step);
}

// ---------- WHATSAPP PLANES ----------
function openWhatsApp() {
  window.open(buildWhatsAppUrl("5492254414211", "Hola! Quiero publicar en Hecho."), "_blank");
}

// ---------- URL → ABRIR MODAL DIRECTO (para QR y links compartidos) ----------
function checkUrlParam() {
  const empId = parseInt(new URLSearchParams(window.location.search).get('emp'));
  if (empId) setTimeout(() => openModal(empId), 350);
}

// ---------- ESTILOS EXTRA ----------
function injectExtraStyles() {
  if (document.getElementById('extra-style')) return;
  const style = document.createElement('style');
  style.id = 'extra-style';
  style.textContent = `
    .contact-btn.qr {
      background: var(--cream);
      color: var(--black);
      border: 1.5px solid var(--border-strong);
      font-family: 'Syne', sans-serif;
      cursor: pointer;
    }
    .contact-btn.qr:hover { background: var(--beige); }
    .modal-atencion:hover { background: #e8f5e9 !important; }
  `;
  document.head.appendChild(style);
}

// ---------- EVENTOS ----------
document.getElementById("search-input").addEventListener("keydown", e => { if (e.key === "Enter") doSearch(); });
document.getElementById("search-input").addEventListener("input",   e => { if (!e.target.value) { currentSearch = ""; renderGrid(); } });
document.getElementById("modal-close-btn").addEventListener("click", closeModal);
document.addEventListener("keydown", e => {
  if (e.key === "Escape") { document.getElementById('qr-overlay')?.remove(); closeModal(); }
  if (document.getElementById("modal-overlay").classList.contains("open")) {
    if (e.key === "ArrowRight") carouselNext();
    if (e.key === "ArrowLeft")  carouselPrev();
  }
});

// ---------- INIT ----------
injectBaseSEOMeta();
injectExtraStyles();
renderGrid();
setTimeout(() => animateCount(document.getElementById("stat-total"), EMPRENDIMIENTOS.length), 600);
const cats = [...new Set(EMPRENDIMIENTOS.map(e => e.rubro))];
document.getElementById("stat-cats").textContent = cats.length;
checkUrlParam();
