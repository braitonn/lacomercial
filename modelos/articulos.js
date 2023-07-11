//Constante para la url  de la api
const url = './api/datos.php?tabla=articulos';

//crear una funcion para obtener los datos
export async function obtenerArticulos() {
  let res = await fetch(`${url}`);
  let datos = await res.json();
  if(res.status !== 200) {
    throw Error ('Los datos no existen');
  }
  //console.log (datos)
  return datos;
}