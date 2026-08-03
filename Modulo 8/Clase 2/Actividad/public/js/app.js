const API_URL = "/libros";

const mensaje = document.querySelector("#mensaje");
const listaLibros = document.querySelector("#listaLibros");

const formLibro = document.querySelector("#formLibro");
const inputTitulo = document.querySelector("#titulo");
const inputAutor = document.querySelector("#autor");
const inputAnio = document.querySelector("#anio");

const inputEditId = document.querySelector("#editId");
const inputEditTitulo = document.querySelector("#editTitulo");
const inputEditAutor = document.querySelector("#editAutor");
const inputEditAnio = document.querySelector("#editAnio");

const btnCargar = document.querySelector("#btnCargar");
const btnActualizar = document.querySelector("#btnActualizar");

const mostrarMensaje = (texto, tipo = "success") => {
  mensaje.innerHTML = `
    <div class="alert alert-${tipo}">
      ${texto}
    </div>
  `;
};

const renderLibros = (libros) => {
  listaLibros.innerHTML = "";

  if (libros.length === 0) {
    listaLibros.innerHTML = `<p>No hay libros registrados.</p>`;
    return;
  }

  libros.forEach((libro) => {
    const card = document.createElement("div");

    card.className = "card mb-2";

    card.innerHTML = `
      <div class="card-body d-flex justify-content-between align-items-center">
        <div>
          <h3 class="h5 mb-1">${libro.titulo}</h3>
          <p class="mb-0">
            <strong>ID:</strong> ${libro.id} |
            <strong>Autor:</strong> ${libro.autor} |
            <strong>Año:</strong> ${libro.anio}
          </p>
        </div>

        <button
          class="btn btn-danger btn-sm btn-eliminar"
          data-id="${libro.id}">
          Eliminar
        </button>
      </div>
    `;

    listaLibros.appendChild(card);
  });
};

const cargarLibros = async () => {
  try {
    const response = await axios.get(API_URL);

    renderLibros(response.data.data);
    mostrarMensaje("Libros cargados correctamente");
  } catch (error) {
    mostrarMensaje("Error al cargar libros", "danger");
  }
};

const crearLibro = async (event) => {
  event.preventDefault();

  const titulo = inputTitulo.value.trim();
  const autor = inputAutor.value.trim();
  const anio = Number(inputAnio.value);

  if (!titulo || !autor || !Number.isInteger(anio)) {
    mostrarMensaje("Debe ingresar título, autor y año válido", "warning");
    return;
  }

  try {
    await axios.post(API_URL, {
      titulo,
      autor,
      anio,
    });

    inputTitulo.value = "";
    inputAutor.value = "";
    inputAnio.value = "";

    mostrarMensaje("Libro creado correctamente");
    cargarLibros();
  } catch (error) {
    const msg = error.response?.data?.mensaje || "Error al crear libro";
    mostrarMensaje(msg, "danger");
  }
};

const actualizarLibro = async () => {
  const id = Number(inputEditId.value);
  const titulo = inputEditTitulo.value.trim();
  const autor = inputEditAutor.value.trim();
  const anio = Number(inputEditAnio.value);

  if (!Number.isInteger(id) || !titulo || !autor || !Number.isInteger(anio)) {
    mostrarMensaje("Debe ingresar ID, título, autor y año válido", "warning");
    return;
  }

  try {
    await axios.put(`${API_URL}/${id}`, {
      titulo,
      autor,
      anio,
    });

    inputEditId.value = "";
    inputEditTitulo.value = "";
    inputEditAutor.value = "";
    inputEditAnio.value = "";

    mostrarMensaje("Libro actualizado correctamente");
    cargarLibros();
  } catch (error) {
    const msg = error.response?.data?.mensaje || "Error al actualizar libro";
    mostrarMensaje(msg, "danger");
  }
};

const eliminarLibro = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);

    mostrarMensaje("Libro eliminado correctamente");
    cargarLibros();
  } catch (error) {
    const msg = error.response?.data?.mensaje || "Error al eliminar libro";
    mostrarMensaje(msg, "danger");
  }
};

btnCargar.addEventListener("click", cargarLibros);

formLibro.addEventListener("submit", crearLibro);

btnActualizar.addEventListener("click", actualizarLibro);

listaLibros.addEventListener("click", (event) => {
  if (event.target.classList.contains("btn-eliminar")) {
    const id = Number(event.target.dataset.id);
    eliminarLibro(id);
  }
});

cargarLibros();