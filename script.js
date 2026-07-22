const NUMERO_WHATSAPP = "593981992990"; // Número para recibir pedidos de prueba
const COSTO_ENVIO_BASE = 3.50;
const MINIMO_ENVIO_GRATIS = 40.00;

// Catálogo enriquecido con estrellas, stock e ingredientes
const productos = [
  { 
    id: 1, 
    nombre: "Aceite de Argán Orgánico (50ml)", 
    categoria: "cosmetica", 
    precio: 22.00, 
    rating: 4.9,
    desc: "Hidratación pura prensada en frío para el rostro y cabello. Rico en vitamina E y ácidos grasos esenciales.", 
    tags: ["100% Orgánico", "Vegano"], 
    img: "https://images.unsplash.com/photo-1608248597261-e4d99433612f?auto=format&fit=crop&q=80&w=600" 
  },
  { 
    id: 2, 
    nombre: "Crema Facial Hidratante (60g)", 
    categoria: "cosmetica", 
    precio: 28.00, 
    rating: 4.8,
    desc: "Nutrición profunda formulada con manteca de karité, aloe vera puro y extracto de manzanilla.", 
    tags: ["100% Orgánico"], 
    img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=600" 
  },
  { 
    id: 3, 
    nombre: "Jabón Artesanal de Lavanda (110g)", 
    categoria: "cosmetica", 
    precio: 8.50, 
    rating: 4.7,
    desc: "Elaborado a mano mediante saponificación en frío. Limpia suavemente reduciendo la irritación.", 
    tags: ["Artesanal", "Vegano"], 
    img: "https://images.unsplash.com/photo-1607006344380-b6775a0824a7?auto=format&fit=crop&q=80&w=600" 
  },
  { 
    id: 4, 
    nombre: "Cápsulas de Cúrcuma Curcumin (90 caps.)", 
    categoria: "suplementos", 
    precio: 35.00, 
    rating: 5.0,
    desc: "Potente antiinflamatorio y antioxidante natural suplementado con piperina para máxima absorción.", 
    tags: ["Suplemento Puro"], 
    img: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=600" 
  },
  { 
    id: 5, 
    nombre: "Infusión de Hierbas Silvestres (100g)", 
    categoria: "tes", 
    precio: 12.00, 
    rating: 4.6,
    desc: "Mezcla digestiva de menta, toronjil y flor de azahar seleccionados de cultivos agroecológicos.", 
    tags: ["100% Orgánico"], 
    img: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=600" 
  },
  { 
    id: 6, 
    nombre: "Serum Facial Revitalizante (30ml)", 
    categoria: "cosmetica", 
    precio: 32.00, 
    rating: 4.9,
    desc: "Ácido hialurónico vegetal concentrado con vitamina C para iluminar y reafirmar la piel.", 
    tags: ["Best Seller", "Vegano"], 
    img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600" 
  }
];

let carrito = JSON.parse(localStorage.getItem('vidaverde_cart')) || [];
let categoriaActual = 'todos';

function renderProductos(lista) {
  const grid = document.getElementById('grid-productos');
  if (!grid) return;
  grid.innerHTML = '';

  if (lista.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full py-12 text-center text-stone-400">
        <i data-lucide="package-open" class="w-10 h-10 mx-auto mb-2 opacity-50"></i>
        <p class="text-sm font-medium">No se encontraron productos en esta sección.</p>
      </div>`;
    lucide.createIcons();
    return;
  }

  lista.forEach(p => {
    const tagsHtml = p.tags.map(t => `<span class="bg-stone-100 text-stone-600 text-[10px] px-2 py-0.5 rounded-md font-medium">${t}</span>`).join(' ');

    grid.innerHTML += `
      <div class="product-card fade-up bg-white rounded-2xl border border-stone-200/80 p-3 flex flex-col justify-between">
        <div>
          <div class="aspect-square rounded-xl overflow-hidden bg-stone-100 mb-3 relative group">
            <img src="${p.img}" alt="${p.nombre}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy">
            <span class="absolute top-2 right-2 bg-white/90 backdrop-blur-md text-stone-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
              ★ ${p.rating}
            </span>
          </div>
          
          <h4 class="font-bold text-stone-900 text-xs sm:text-sm leading-snug line-clamp-1">${p.nombre}</h4>
          <p class="text-stone-500 text-[11px] mt-1 leading-normal line-clamp-2">${p.desc}</p>
          
          <div class="flex gap-1 mt-2 flex-wrap">
            ${tagsHtml}
          </div>

          <p class="font-bold text-stone-900 text-sm sm:text-base mt-2.5">$${p.precio.toFixed(2)}</p>
        </div>

        <div class="grid grid-cols-2 gap-2 mt-3.5">
          <button onclick="verDetalleModal(${p.id})" class="w-full bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold py-2 rounded-xl text-xs transition">
            Detalles
          </button>
          <button onclick="agregarAlCarrito(${p.id})" class="w-full bg-brand-green hover:bg-brand-green-dark text-white font-semibold py-2 rounded-xl text-xs transition shadow-xs flex items-center justify-center gap-1 button-soft">
            <span>Añadir</span>
          </button>
        </div>
      </div>
    `;
  });

  document.getElementById('resultados-texto').innerText = `Mostrando ${lista.length} producto(s)`;
  if (window.lucide) lucide.createIcons();

  requestAnimationFrame(() => {
    document.querySelectorAll('.product-card.fade-up').forEach((card, index) => {
      setTimeout(() => card.classList.add('visible'), index * 40);
    });
  });
}

function seleccionarCategoria(cat, btn) {
  categoriaActual = cat;
  document.querySelectorAll('.cat-btn').forEach(b => {
    b.className = "cat-btn w-full text-left px-3 py-2 rounded-xl flex justify-between items-center transition hover:bg-stone-200/60 text-stone-600";
  });
  if (btn) {
    btn.className = "cat-btn active w-full text-left px-3 py-2 rounded-xl flex justify-between items-center transition bg-brand-green text-white font-semibold";
  }
  filtrarProductos();
}

function setNavActiva(hash) {
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === hash) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

function iniciarNavActiva() {
  const secciones = document.querySelectorAll('section[id]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setNavActiva(`#${entry.target.id}`);
      }
    });
  }, {
    rootMargin: '-110px 0px -70% 0px',
    threshold: 0.2
  });

  secciones.forEach(section => observer.observe(section));

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        setNavActiva(href);
      }
    });
  });
}

function filtrarProductos() {
  const input = document.getElementById('search-input');
  const texto = input ? input.value.toLowerCase() : '';
  
  let filtrados = productos.filter(p => {
    const coincideCat = (categoriaActual === 'todos') || (p.categoria === categoriaActual);
    const coincideTexto = p.nombre.toLowerCase().includes(texto) || p.desc.toLowerCase().includes(texto);
    return coincideCat && coincideTexto;
  });

  renderProductos(filtrados);
}

function limpiarBuscador() {
  document.getElementById('search-input').value = '';
  filtrarProductos();
}

function ordenarProductos() {
  const modo = document.getElementById('sort-select').value;
  let copia = [...productos];

  if (modo === 'price-asc') copia.sort((a, b) => a.precio - b.precio);
  else if (modo === 'price-desc') copia.sort((a, b) => b.precio - a.precio);
  else if (modo === 'rating') copia.sort((a, b) => b.rating - a.rating);

  renderProductos(copia);
}

// MODAL DETALLES DE PRODUCTO
function verDetalleModal(id) {
  const p = productos.find(x => x.id === id);
  if (!p) return;

  document.getElementById('modal-img').src = p.img;
  document.getElementById('modal-title').innerText = p.nombre;
  document.getElementById('modal-price').innerText = `$${p.precio.toFixed(2)}`;
  document.getElementById('modal-desc').innerText = p.desc;
  document.getElementById('modal-tag').innerText = p.tags[0] || 'Natural';
  document.getElementById('modal-stars').innerHTML = `★ ${p.rating} / 5.0 (Reseñas Verificadas)`;

  const btn = document.getElementById('modal-add-btn');
  btn.onclick = () => {
    agregarAlCarrito(p.id);
    cerrarModalProducto();
  };

  document.getElementById('product-modal').classList.remove('hidden');
}

function cerrarModalProducto() {
  document.getElementById('product-modal').classList.add('hidden');
}

// GESTIÓN DEL CARRITO CON LOCALSTORAGE Y CANTIDADES
function agregarAlCarrito(id) {
  const item = carrito.find(p => p.id === id);
  const prod = productos.find(p => p.id === id);

  if (item) item.cantidad++;
  else carrito.push({ ...prod, cantidad: 1 });

  guardarYActualizarCarrito();
  mostrarToast(`"${prod.nombre}" añadido al carrito`);
}

function cambiarCantidad(id, delta) {
  const item = carrito.find(p => p.id === id);
  if (!item) return;

  item.cantidad += delta;
  if (item.cantidad <= 0) {
    carrito = carrito.filter(p => p.id !== id);
  }
  guardarYActualizarCarrito();
}

function eliminarProducto(id) {
  carrito = carrito.filter(p => p.id !== id);
  guardarYActualizarCarrito();
}

function animarContadorCarrito() {
  const cartCount = document.getElementById('cart-count');
  if (!cartCount) return;
  cartCount.classList.add('cart-count-pulse');
  setTimeout(() => cartCount.classList.remove('cart-count-pulse'), 350);
}

function guardarYActualizarCarrito() {
  localStorage.setItem('vidaverde_cart', JSON.stringify(carrito));
  actualizarCarritoUI();
  animarContadorCarrito();
}

function actualizarCarritoUI() {
  const container = document.getElementById('cart-items');
  const cartCount = document.getElementById('cart-count');

  if (!container) return;
  container.innerHTML = '';

  let subtotal = 0;
  let count = 0;

  if (carrito.length === 0) {
    container.innerHTML = `
      <div class="py-12 text-center text-stone-400 space-y-2">
        <i data-lucide="shopping-cart" class="w-8 h-8 mx-auto opacity-40"></i>
        <p class="text-xs font-medium">Tu carrito está vacío actualmente.</p>
      </div>`;
  } else {
    carrito.forEach(p => {
      subtotal += p.precio * p.cantidad;
      count += p.cantidad;

      container.innerHTML += `
        <div class="py-3 flex flex-col gap-3 text-xs border-b border-stone-100 last:border-b-0 pb-3">
          <div class="flex justify-between items-start gap-3">
            <div class="flex-1 pr-2">
              <p class="font-bold text-stone-900">${p.nombre}</p>
              <p class="text-stone-500 font-medium">$${p.precio.toFixed(2)} c/u</p>
            </div>
            <button onclick="eliminarProducto(${p.id})" class="text-stone-400 hover:text-stone-700 text-sm font-semibold">
              Eliminar
            </button>
          </div>
          <div class="flex items-center justify-between gap-2 bg-stone-100 px-2 py-1 rounded-lg border border-stone-200">
            <button onclick="cambiarCantidad(${p.id}, -1)" class="text-stone-600 hover:text-black font-bold px-2">-</button>
            <span class="font-bold text-stone-800 text-xs">${p.cantidad}</span>
            <button onclick="cambiarCantidad(${p.id}, 1)" class="text-stone-600 hover:text-black font-bold px-2">+</button>
          </div>
        </div>
      `;
    });
  }

  const envio = (subtotal >= MINIMO_ENVIO_GRATIS || subtotal === 0) ? 0 : COSTO_ENVIO_BASE;
  const total = subtotal + envio;

  if (cartCount) cartCount.innerText = count;
  document.getElementById('cart-subtotal').innerText = `$${subtotal.toFixed(2)}`;
  document.getElementById('cart-shipping').innerText = envio === 0 ? "¡GRATIS!" : `$${envio.toFixed(2)}`;
  document.getElementById('cart-total').innerText = `$${total.toFixed(2)}`;

  if (window.lucide) lucide.createIcons();
}

function toggleCarrito() {
  const modal = document.getElementById('cart-modal');
  if (modal) modal.classList.toggle('hidden');
}

function mostrarToast(mensaje) {
  const toast = document.getElementById('toast');
  const msg = document.getElementById('toast-message');
  if (!toast) return;

  msg.innerText = mensaje;
  toast.classList.remove('opacity-0', 'translate-y-5', 'pointer-events-none');
  toast.classList.add('shadow-2xl');

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-5', 'pointer-events-none');
    toast.classList.remove('shadow-2xl');
  }, 2500);
}

function enviarPedidoWhatsApp() {
  if (carrito.length === 0) return alert("Tu carrito está vacío.");
  const nombre = document.getElementById('client-name').value.trim();
  const direccion = document.getElementById('client-address').value.trim();
  
  if (!nombre || !direccion) {
    return alert("Por favor completa tu nombre y dirección para realizar el despacho.");
  }

  let subtotal = 0;
  let msg = `*NUEVO PEDIDO - VIDA VERDE*\n`;
  msg += `==============================\n`;
  msg += `Cliente: ${nombre}\n`;
  msg += `Dirección de entrega: ${direccion}\n`;
  msg += `Mapa dirección: https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(direccion)}\n`;
  msg += `------------------------------\n`;
  msg += `Detalle de productos:\n`;

  carrito.forEach(p => {
    const itemSub = p.precio * p.cantidad;
    subtotal += itemSub;
    msg += `• ${p.cantidad} x ${p.nombre} - $${itemSub.toFixed(2)}\n`;
  });

  const envio = subtotal >= MINIMO_ENVIO_GRATIS ? 0 : COSTO_ENVIO_BASE;
  const total = subtotal + envio;

  msg += `------------------------------\n`;
  msg += `Subtotal: $${subtotal.toFixed(2)}\n`;
  msg += `Envío: ${envio === 0 ? 'GRATIS' : '$' + envio.toFixed(2)}\n`;
  msg += `*TOTAL A PAGAR: $${total.toFixed(2)}*\n`;
  msg += `==============================\n`;
  msg += `Por favor confirma si deseas proceder con el pedido.`;

  window.open(`https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank');
}

document.addEventListener('DOMContentLoaded', () => {
  renderProductos(productos);
  actualizarCarritoUI();
  iniciarNavActiva();
});
 


