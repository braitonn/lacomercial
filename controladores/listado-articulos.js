import { obtenerArticulos } from '../modelos/articulos';

const url = './api/datos.php?tabla=articulos';

//formulario
const formulario = document.querySelector('#formulario');
const formularioModal = new bootstrap.Modal(document.querySelector('#formularioModal'));
const btnNuevo = document.querySelector('#btnNuevo')

//inputs
const inputCodigo = document.querySelector('#codigo');
const inputNombre = document.querySelector('#nombre');
const inputDescipcion = document.querySelector('#descripcion');
const inputPrecio = document.querySelector('#precio');
const inputImagen = document.querySelector('#imagen');

document.addEventListener('DOMContentLoaded', () => {
    mostrarArticulos();
})

async function mostrarArticulos() {
    const articulos = await obtenerArticulos();
    console.log(articulos);
    const listado = document.querySelector("#listado"); // getElementById("listado")
    for (let articulo of articulos) {
        listado.innerHTML += `
              <div class="col">
                <div class="card" style="width:18rem;">
                    <img src="imagenes/productos/${articulo.imagen}" alt="${articulo.nombre}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">
                            <span name="spancodigo">${articulo.codigo}</span> - <span name="spannombre">${articulo.nombre}</span>
                        </h5>
                        <p class="card-text">
                             ${articulo.descripcion}.
                        </p>
                        <h5>$ <span name="spanprecio">${articulo.precio}</span></h5>
                        <input type="number" name="inputcantidad" class="form-control" value="0" min="0" max="30" onchange="calcularPedido()">
                    </div>
                </div>
            </div>
`;
    }
}

formulario.addEventListener('submit', function(e){
    e.preventDefault(); //prevenimos la accion por defecto
    const datos = new FormData(formulario); //guardamos los datos del formulario
    fetch(url + '&accion=insertar', {
    method: 'POST',
    body: datos
    })
    .then(res => res.json)
    .then(data => {
        mostrarArticulos();

    })
})

/**
 * ejecuta el evento clic del boton nuevo
 */
btnNuevo.addEventListener('click', () => {
    //limpiamos los imputs
    inputCodigo.value = null;
    inputNombre.value = null;
    inputDescipcion.value = null;
    inputPrecio.value = null;
    inputImagen.vaue = null;

    formularioModal.show();
})



