const NUMERO_WHATSAPP = "19297598940"; // Número para recibir pedidos de prueba +1 (929) 759-8940
const COSTO_ENVIO_BASE = 3.50;
const MINIMO_ENVIO_GRATIS = 40.00;

// Catálogo enriquecido con estrellas, stock e ingredientes
const productos = [
  // Productos añadidos desde catálogo externo (precios temporales $0.00)
  { id: 7, nombre: "Té Divina (50g)", categoria: "tes", precio: 50.00, rating: 4.5, desc: "Infusión aromática seleccionada para bienestar diario.", tags: ["Infusión"], img: "assets/new_images/te_divina.jpg" },
  { id: 8, nombre: "Gano - Cápsulas (90 caps)", categoria: "suplementos", precio: 50.00, rating: 4.6, desc: "Ganoderma Lucidum (Reishi) en cápsulas para apoyo inmunológico.", tags: ["Suplemento", "Reishi"], img: "assets/new_images/gano.jpg" },

  // Suplementos / productos funcionales
  { id: 10, nombre: "Ignite - Cápsulas (60 caps)", categoria: "suplementos", precio: 50.00, rating: 4.6, desc: "Fórmula estimulante para rendimiento y energía.", tags: ["Suplemento"], img: "assets/new_images/ignite.jpg" },
  { id: 11, nombre: "Youth (Juventud colágeno)", categoria: "suplementos", precio: 0.00, rating: 4.7, desc: "Colágeno y nutrientes para piel y articulaciones.", tags: ["Colágeno"], img: "assets/new_images/youth_colageno.jpg" },
  { id: 12, nombre: "Cheat (Chet) - Suplemento", categoria: "suplementos", precio: 0.00, rating: 4.5, desc: "Complemento para apoyo en rutinas específicas.", tags: ["Suplemento"], img: "assets/new_images/cheat.jpg" },

  // Línea de Cafés (varios productos)
  { id: 13, nombre: "Sculpt Black - Café (250g)", categoria: "cafes", precio: 50.00, rating: 4.5, desc: "Café intenso y oscuro con cuerpo robusto.", tags: ["Café"], img: "assets/new_images/sculpt_black.jpg" },
  { id: 14, nombre: "Sculpt Tongkat Ali - Café (250g)", categoria: "cafes", precio: 50.00, rating: 4.4, desc: "Café funcional con extracto de Tongkat Ali.", tags: ["Café", "Funcional"], img: "assets/new_images/sculpt_tongkat_ali.jpg" },
  { id: 15, nombre: "Sculpt Latte - Café (250g)", categoria: "cafes", precio: 50.00, rating: 4.3, desc: "Tostado suave pensado para bebidas con leche.", tags: ["Café", "Latte"], img: "assets/new_images/sculpt_latte.jpg" },
  { id: 16, nombre: "Tongkat Ali - Café (250g)", categoria: "cafes", precio: 50.00, rating: 4.2, desc: "Mezcla con extracto de Tongkat Ali para energía.", tags: ["Café", "Funcional"], img: "assets/new_images/tongkat_ali.jpg" },
  { id: 17, nombre: "Cappuccino - Café (250g)", categoria: "cafes", precio: 50.00, rating: 4.6, desc: "Mezcla clásica para cappuccino cremoso.", tags: ["Café", "Clásico"], img: "assets/new_images/cappuccino.jpg" },
  { id: 18, nombre: "Latte - Café (250g)", categoria: "cafes", precio: 50.00, rating: 4.5, desc: "Tostado equilibrado ideal para latte.", tags: ["Café", "Latte"], img: "assets/new_images/latte.jpg" },
  { id: 19, nombre: "Latte Dorado (Golden Latte) - Café (200g)", categoria: "cafes", precio: 50.00, rating: 4.6, desc: "Mezcla con cúrcuma y especias, sabor suave.", tags: ["Café", "Golden"], img: "assets/new_images/latte_dorado.jpg" },
  { id: 20, nombre: "Latte Verde - Café (200g)", categoria: "cafes", precio: 50.00, rating: 4.4, desc: "Variante con matcha y notas herbales.", tags: ["Café", "Matcha"], img: "assets/new_images/latte_verde.jpg" },
  { id: 21, nombre: "Hazelnut Latte - Café (200g)", categoria: "cafes", precio: 50.00, rating: 4.3, desc: "Aromas de avellana tostada para bebidas dulces.", tags: ["Café", "Saborizado"], img: "assets/new_images/hazelnut_latte.jpg" },
  { id: 22, nombre: "Mocha - Café (250g)", categoria: "cafes", precio: 50.00, rating: 4.5, desc: "Mezcla para bebidas mocha con chocolate natural.", tags: ["Café", "Chocolate"], img: "assets/new_images/mocha.jpg" },
  { id: 23, nombre: "Café Black - Café (250g)", categoria: "cafes", precio: 50.00, rating: 4.6, desc: "Café puro para apreciar cuerpo y amargor.", tags: ["Café"], img: "assets/new_images/cafe_black.jpg" },
  { id: 24, nombre: "Café Divina Hot Chocolate - (15 sobres)", categoria: "cafes", precio: 50.00, rating: 4.5, desc: "Chocolate caliente premium infusionado con Reishi.", tags: ["Café", "Chocolate"], img: "assets/new_images/cafedivina_hot.jpg" }
];

let carrito = JSON.parse(localStorage.getItem('vidaverde_cart')) || [];
let categoriaActual = 'todos';

function actualizarContadoresCategorias() {
  const counts = productos.reduce((acc, p) => {
    acc.todos = (acc.todos || 0) + 1;
    const cat = p.categoria || 'otros';
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  const setIfExists = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.innerText = value;
  };

  setIfExists('count-todos', counts.todos || 0);
  setIfExists('count-cosmetica', counts['cosmetica'] || 0);
  setIfExists('count-suplementos', counts['suplementos'] || 0);
  setIfExists('count-tes', counts['tes'] || 0);
  setIfExists('count-cafes', counts['cafes'] || 0);
}

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
          <div class="aspect-square rounded-xl overflow-hidden bg-stone-100 mb-3 relative group cursor-pointer" onclick="verDetalleModal(${p.id})" tabindex="0" onkeydown="if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); verDetalleModal(${p.id}); }">
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

  const nombreCompleto = document.getElementById('client-name').value.trim();
  const pais = document.getElementById('client-country').value.trim();
  const estado = document.getElementById('client-state').value.trim();
  const direccion = document.getElementById('client-address').value.trim();
  const codigoPostal = document.getElementById('client-postal-code').value.trim();

  if (!nombreCompleto || !pais || !estado || !direccion) {
    return alert("Por favor completa tu nombre completo, país, estado y dirección para realizar el despacho.");
  }

  let subtotal = 0;
  let msg = `*NUEVO PEDIDO - VIDA VERDE*\n`;
  msg += `==============================\n`;
  msg += `Cliente: ${nombreCompleto}\n`;
  msg += `País: ${pais}\n`;
  msg += `Estado: ${estado}\n`;
  msg += `Dirección: ${direccion}\n`;
  if (codigoPostal) msg += `Código postal: ${codigoPostal}\n`;
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
  actualizarContadoresCategorias();
  renderProductos(productos);
  actualizarCarritoUI();
  iniciarNavActiva();
  
  // Menú móvil hamburguesa
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
    
    // Cerrar menú al hacer clic en un enlace
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }
});
 


