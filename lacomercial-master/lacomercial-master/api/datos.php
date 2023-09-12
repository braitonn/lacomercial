<?php
require_once 'modelos.php';

$mensaje = '';

if (isset($_GET['tabla'])) {
    $t = $_GET['tabla'];
    $tabla = new ModeloABM($t);

    if(isset($_GET['id'])) {   // Si está seteado el atributo id
        $tabla->set_criterio("id=".$_GET['id']); // Establecemos el criterio
    }

    if(isset($_GET['accion'])){
        switch($_GET['accion']){
            case 'seleccionar':
                $datos = $tabla->seleccionar();
                echo $datos;
                break;

            case 'insertar':
                $valores = $_POST;
                $tabla->insertar($valores);
                    $mensaje .= 'Datos guardados';
                echo json_encode($mensaje);
                break;

            case 'actualizar':             //en caso de que sea eliminar
                $valores = $_POST;
                $tabla->actualizar($valores);         // ejecutamos el metodo eliminar
                $mensaje .= 'Datos actualizados'; //creamos un mensaje
                echo json_encode($mensaje);
                break;

        }
    }
}