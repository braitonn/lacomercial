<?php
require_once 'modelos.php';

if (isset($_GET['tabla'])){
    $t = $_GET['tabla'];

    $tabla = new ModeloABM($t);

    if(isset($_GET['accion'])){
        if($_GET['accion'] == 'insertar' || $_GET ['accion'] == 'actualizar'){
            $valores = $_POST;
        }

        //subida de imagenes
        if(
            isset($_FILES) &&                           //esta sentado $_FILES Y
            isset($_FILES['imagen']) &&                 //esta sentado $_FILES ['imagen'] Y
            !empty($_FILES['imagen']['name'] &&       //NO esta vacio el nombre de la imagen Y
            !empty($_FILES['imagen']['tmp_name']))         //NO esta vacio el nombre temporal
        ){
            if(is_uploaded_file($_FILES['imagen']['tmp_name'])) {
                $tmp_nombre = $_FILES['imagen']['tmp_name'];
                $nombre = $_FILES['imagen']['name'];
                $destino = '../imagenes/productos/' . $nombre;
                echo $destino;
                if(move_uploaded_file($tmp_nombre, $destino)) {     //Si podemos mover el archivo temporalmente
                    $mensaje = 'archivo subido correctamente a' . $destino;
                    $valores['imagen'] = $nombre;
                } else {
                    $mensaje .= 'no se ha subido correctamente el archivo';
                    unlick(ini_get('uploat_tmp_dir').$_FILES['imagen']['tmp_neme']);
                }
            } else {
                $mensaje .= 'error: el archivo no fue procesado correctamente';
            }

        }
        switch($_GET['accion']){
            case 'seleccionar':
                $datos = $tabla->seleccionar();
                echo $datos;
                break;
                case 'insertar':
                    $tabla->insertar($valores);
                    break;

            case 'eliminar':             //En caso de que sea eliminar
                $tabla->eliminar();         // ejecutamos el metodo eliminar
                $mensaje = 'registro eliminado'; //creamos un mensaje
                echo json_encode($mensaje);
                break;

        }
    }
}