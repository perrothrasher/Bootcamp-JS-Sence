const API_URL = '/api/productos';
const btnListar = document.getElementById('btnListar');
const selectOrden = document.getElementById('ordenarPor');
const cuerpoTabla = document.getElementById('cuerpoTabla');
const formProducto = document.getElementById('formProducto');
const mensaje = document.getElementById('mensaje');

let productosActuales = [];

function renderizarProductos(productos) {
  cuerpoTabla.innerHTML = '';

  productos.forEach((producto) => {
    const fila = document.createElement('tr');

    const celdaNombre = document.createElement('td');
    celdaNombre.textContent = producto.nombre;

    const celdaPrecio = document.createElement('td');
    celdaPrecio.textContent = `$${producto.precio.toLocaleString('es-CL')}`;

    fila.appendChild(celdaNombre);
    fila.appendChild(celdaPrecio);
    cuerpoTabla.appendChild(fila);
  });
}

// Se ordena segun lo elegido en el front
function ordenarProductos(productos, criterio) {
  const copia = [...productos];

  if (criterio === 'precio') {
    copia.sort((a, b) => a.precio - b.precio);
  } else {
    copia.sort((a, b) => a.nombre.localeCompare(b.nombre));
  }
  return copia;
}

// Se obtiene la lista de productos
async function listarProductos() {
  try {
    const respuesta = await fetch(API_URL, { method: 'GET' });

    if (!respuesta.ok) {
      throw new Error('Error al obtener los productos');
    }

    productosActuales = await respuesta.json();
    const ordenados = ordenarProductos(productosActuales, selectOrden.value);
    renderizarProductos(ordenados);
  } catch (error) {
    mostrarMensaje('No se pudo cargar la lista de productos', 'error');
  }
}

// Se agrega un producto nuevo
async function agregarProducto(nombre, precio) {
  try {
    const respuesta = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, precio: Number(precio) }),
    });

    const datos = await respuesta.json();

    if (respuesta.status === 201) {
      mostrarMensaje('Producto agregado correctamente', 'exito');
      formProducto.reset();
      listarProductos();
    } else {
      mostrarMensaje(datos.error || 'No se pudo agregar el producto', 'error');
    }
  } catch (error) {
    mostrarMensaje('Error de conexión con el servidor', 'error');
  }
}

function mostrarMensaje(texto, tipo) {
  mensaje.textContent = texto;
  mensaje.className = tipo;
}

btnListar.addEventListener('click', listarProductos);

selectOrden.addEventListener('change', () => {
  const ordenados = ordenarProductos(productosActuales, selectOrden.value);
  renderizarProductos(ordenados);
});

formProducto.addEventListener('submit', (evento) => {
  evento.preventDefault();

  const nombre = document.getElementById('nombre').value.trim();
  const precio = document.getElementById('precio').value;

  if (!nombre || !precio) {
    mostrarMensaje('Debes completar nombre y precio', 'error');
    return;
  }
  agregarProducto(nombre, precio);
});