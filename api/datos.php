<?php
require_once 'modelos.php';

if (isset($_GET['tabla'])){
    $t = $_GET['tabla'];

    $tabla = new ModeloABM($t);

    if(isset($_GET['accion'])){
        switch($_GET['accion']){
            case 'seleccionar':
                $datos = $tabla->seleccionar();
                echo $datos;
                break;
                case 'insertar':
                    $valores = $_POST;
                    $tabla->insertar($valores);
                    break;

            case 'eliminar':             //en caso de que sea eliminar
                $tabla->eliminar();         // ejecutamos el metodo eliminar
                $mensaje = 'registro eliminado'; //creamos un mensaje
                echo json_encode($mensaje);
                break;

        }
    }
}