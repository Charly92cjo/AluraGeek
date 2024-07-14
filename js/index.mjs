import { conexionAPI } from "./conexionAPI.mjs";
import { crearCard } from "./crearCard.mjs";

//direccion del servidor
let urlApi = "http://localhost:3001/productos/";
let urlApiBorrar = "http://localhost:3001/productos/";

//constantes
const contenedorProductos = document.querySelector(".contenedor-productos");

//Servidor local o modificar servidor
let activarServerOnline = confirm("¿Desea usar el servidor online?");
if (activarServerOnline) {
  urlApi = "http://localhost:3001/productos/";
  urlApiBorrar =
    "http://localhost:3001/productos/";
}
//mostrar los productos en la página
mostrarProductos();
async function mostrarProductos() {
  try {
    const productos = await conexionAPI.listarProductos(urlApi);

    if (productos === null) {
      throw new Error("Error de conexión");
    }

    if (activarServerOnline) {
      // Obtener las claves numéricas como un array
      const identificadores = Object.keys(productos);
      // Iterar sobre las claves y acceder a los valores
      identificadores.forEach((id) => {
        const producto = productos[id];
        contenedorProductos.innerHTML += crearCard(
          producto.nombre,
          producto.imagen,
          producto.precio,
          id
        );
      });
    } else {
      productos.forEach((producto) => {
        contenedorProductos.innerHTML += crearCard(
          producto.nombre,
          producto.imagen,
          producto.precio,
          producto.id
        );
      });
    }
    return;
  } catch (error) {
    console.error("Error al cargar los productos:", error);
    contenedorProductos.innerHTML = `<p class="parrafo-error-contenedor">Error con la conexión.</p>`;

    return null;
  }
}

// eliminar tarjeta de producto
contenedorProductos.addEventListener("click", (evento) =>
  eliminarProductos(evento)
);

async function eliminarProductos(evento) {
  if (evento.target.classList.contains("trash-icon")) {
    // buscar el elemento abuelo "card-producto" y obtener su data-index
    const elementoPadre = evento.target.parentElement;
    const elementoAbuelo = elementoPadre.parentElement;
    let idProducto = elementoAbuelo.getAttribute("data-index");
    console.log(`id de producto a eliminar ${idProducto}`);
    if (activarServerOnline) {
      idProducto = `${idProducto}`;
    }

    try {
      const productoEliminar = await conexionAPI.eliminarProducto(
        idProducto,
        urlApiBorrar
      );
      if (productoEliminar === null) {
        throw new Error("Error al intentar eliminar el producto");
      }
      alert("Producto eliminado con éxito");
      elementoAbuelo.remove();
      return;
    } catch (error) {
      alert(`Ocurrió un error al intentar eliminar el producto.`);
      return null;
    }
  }
}

console.log(
  "%c¡Bienvenido a mi página! 😊 ¿Eres un explorador curioso? Soy Charly Otero. Gracias por visitar, ¡espero que te guste!",
  "color:#0f0;background:#000;padding:50px;border:3px solid #00f;font-family:Lobster;font-size:15px"
);

export { urlApi, mostrarProductos, contenedorProductos };
