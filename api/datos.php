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

        }
    }
}