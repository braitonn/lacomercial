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

//imagen del formulario
const frmImagen = document.querySelector("#frmimagen");

//variables
let accion = '';
let id;

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
                    <div class"card-footer d-flex justify-content-center">
                        <a class="btnEditar btn btn-primary">Eliminar</a>
                        <a class="btnBorrar btn btn-danger">Eliminar</a>
                        <input type="hidden" class="idArticulo" value="${articulo.id}">
                        <input type="hidden" class="imagenArticulo" value="${articulo.imagen ?? 'nodisponible.png'}">


                    </div>
                </div>
            </div>
`;
    }
}

formulario.addEventListener('submit', function (e) {
    e.preventDefault(); //prevenimos la accion por defecto
    const datos = new FormData(formulario); //guardamos los datos del formulario
    switch (accion) {
        case "insertar": fetch(url + "&accion=insertar", {
            method: 'POST',
            body: datos,
        })
            .then(res => res.json)
            .then(data => {
                insertarAlerta(data, 'succes');
                mostrarArticulos();

            });
            break;
    
        case "actualizar":
             fetch(`$(url)&accion=insertar&id=${id}`, {
        method: 'POST',
        body: datos,

    })
        .then(res => res.json)
        .then(data => {
            insertarAlerta(data, 'succes');
            mostrarArticulos();

        });
        break;
    }

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
    accion = 'insertar';

})

/**
 * Determina en que elemento realiza un evento
 * @param elemento el elemento a que se realiza el evento
 * @param eveto el evento realizado
 * @param selector el selector  seleccionado
 * @param manejador metodo que ejecute el evento
 */
const on = (elemento, evento, selector, manejador) => {
    elemento.addEventListener(evento, e => {
        if (e.target.closest(selector)) {
            manejador(e);
        }
    })
}

/**
 * ejecuta el clic de btnEditar 
 */
on(document, 'click', '.btnEditar', e => {

    const cardFooter = e.target.parendNode; //Elemento padre del boton
    //obtener los datos del articulo seleccionado
    id = cardFooter.querySelector('.idArticulo').value;
    const codigo = cardFooter.parendNode.querySelector('span[name=spancodigo]').innerHTML;
    const nombre = cardFooter.parendNode.querySelector('span[name=spannombre]').innerHTML;
    const precio = cardFooter.parendNode.querySelector('span[name=spanprecio]').innerHTML;
    const descripcion = cardFooter.parendNode.querySelector('.card-text').innerHTML;
    const imagen = cardFooter.parendNode.querySelector('.imagenArticulo').value;

    //asignamos los valores a los inputs
    inputCodigo.value = codigo;
    inputNombre.value = nombre;
    inputPrecio.value = precio;
    inputDescipcion.value = descripcion;
    frmImagen.src = `./imagenes/productos/${imagen}`;

    //mostramos el formulario
    formularioModal.show();

    accion = 'actualizar';

})

/**
 * evento click del boton borrar
 */
on(document, 'click', '.btnBorrar', e =>{
    const cardFooter = e.target.parendNode;
    id = cardFooter.querySelector('.idArticulo').value;
    const nombre = cardFooter.parendNode.querySelector("span[name=spannombre]").innerHTML;
    let aceptar = confirm(`¿Realmente desea eliminar a ${nombre}?`);
    if(aceptar){
        console.log(`${nombre} Eliminado`);
        fetch(`${url}&accion=eliminar&id=${id}`)
            .then(res => res.json())
            .then(data => {
                insertarAlerta(data, 'danger');
                mostrarArticulos();
            });
    }
});



