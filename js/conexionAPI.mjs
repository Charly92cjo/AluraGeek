
//obtener productos de la api
async function listarProductos(urlApi) {
  try {
    const conexion = await fetch(urlApi);
    if (!conexion.ok) {
      throw new Error("Error al obtener los datos");
    }
    const conexionConvertida = await conexion.json();

    return conexionConvertida;
  } catch (error) {
    console.error("Error en la solicitud: ", error);
    //alert(error);
    return null;
  }
}

//enviar producto a api
async function enviarProducto(nombre, imagen, precio, urlApi) {
  try {
    const conexion = await fetch(urlApi, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        nombre: nombre,
        imagen: imagen,
        precio: precio
      })
    });

    if (!conexion.ok) {
      throw new Error("Ha ocurrido un error al enviar los datos del producto");
    }
    const conexionConvertida = await conexion.json();
    return conexionConvertida;
  } catch (error) {
    console.error("Error en la solicitud:", error);
    return null;
  }
}

//eliminar producto de api
async function eliminarProducto(id, urlApiBorrar) {
  try {
    const conexion = await fetch(`${urlApiBorrar}${id}`, {
      method: "DELETE"
    });
    if (!conexion.ok) {
      throw new Error("No se pudo eliminar el producto.");
    }

    return;
  } catch (error) {
    console.error("Hubo un error al intentar eliminar el producto: ", error);
    return null;
  }
}

export const conexionAPI = {
  listarProductos,
  enviarProducto,
  eliminarProducto
};
