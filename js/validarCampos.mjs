import { conexionAPI } from "./conexionAPI.mjs";
import { urlApi } from "./index.mjs";
import { mostrarProductos } from "./index.mjs";
import { contenedorProductos } from "./index.mjs";

//constantes
const parrafoEnviar = document.querySelector(".parrafo-enviar");
const botonLimpiar = document.querySelector(".input-limpiar");
const formulario = document.querySelector("[data-formulario]");
const parrafoNombre = document.querySelector(".parrafo-nombre");
const parrafoImagen = document.querySelector(".parrafo-imagen");
const parrafoPrecio = document.querySelector(".parrafo-precio");
const spanAnoActual = document.getElementById("ano-actual");
const anoActual = new Date().getFullYear();
spanAnoActual.innerText = anoActual;


//validar campos
formulario.addEventListener("submit", evento => {
  evento.preventDefault();
  const nombre = document.querySelector("[data-nombre-producto]").value;
  const imagen = document.querySelector("[data-imagen-producto]").value;
  const precio = document.querySelector("[data-precio-producto]").value;
  if (validarDatos(nombre, imagen, precio)) {
    agregarProducto(nombre, imagen, precio);
  }
});

//funcion validar datos del producto
function validarDatos(nombre, imagen, precio) {
  const parrafoNombre = document.querySelector(".parrafo-nombre");
  const parrafoImagen = document.querySelector(".parrafo-imagen");
  const parrafoPrecio = document.querySelector(".parrafo-precio");
  const regexNombre = /^[a-zA-ZñÑ0-9.\s-]+$/;
  
  const regexImagen = /\.(jpeg|jpg|png|bmp|svg)$/i;
  const regexPrecio = /^\d+(\.\d{2})?$/;

  parrafoNombre.innerText = "";
  parrafoImagen.innerText = "";
  parrafoPrecio.innerText = "";
  let nombreValido = true;
  let imagenValida = true;
  let precioValido = true;

  if (nombre.length < 3 || !regexNombre.test(nombre)) {
    parrafoNombre.innerText = "Introduzca un nombre válido.";
    nombreValido = false;
  }
  if (!regexImagen.test(imagen)) {
    parrafoImagen.innerText = "Introduzca una url válida.";
    imagenValida = false;
  }

  if (!regexPrecio.test(precio)) {
    parrafoPrecio.innerText = "Introduzca un precio válido.";
    precioValido = false;
  }

  return nombreValido && imagenValida && precioValido;
}

//agregar producto
async function agregarProducto(nombre, imagen, precio) {
  try {
    const nuevoProducto = await conexionAPI.enviarProducto(
      nombre,
      imagen,
      precio,
      urlApi
    );
    if (nuevoProducto === null) {
      throw new Error("Ocurrió un error al intentar agregar el producto");
    }
    console.log(`producto agregado: ${nuevoProducto}`);
    //mensaje agregado en parrafo
    parrafoEnviar.innerText = "Producto agregado con éxito";
    parrafoEnviar.style.color = "green";
    parrafoEnviar.style.display = "block";
    //vaciar contenedor y volverlo a cargar con el producto agregado
    contenedorProductos.innerHTML = "";
    mostrarProductos();
    return;
  } catch (error) {
    console.log(`Error al agregar el producto: ${error}`);
    parrafoEnviar.innerText = "Error al intentar agregar el producto";
    parrafoEnviar.style.color = "red";
    parrafoEnviar.style.display = "block";
  }
}

//limpiar los parrafos
botonLimpiar.addEventListener("click", () => {
  parrafoEnviar.style.display = "none";
  parrafoNombre.innerText = "";
  parrafoImagen.innerText = "";
  parrafoPrecio.innerText = "";
});

