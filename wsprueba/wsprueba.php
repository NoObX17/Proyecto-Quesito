<?php
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Methods: POST, PUT, DELETE, UPDATE");
    header("Access-Control-Allow-Origin: * ");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once 'db.php';

    $dbService = new DB_Configuration();
    $connection = $dbService->db_connect();
    
    if(isset($_POST['email'])){
        
            $email = $_POST['email'];

        $sql = "SELECT * FROM persona WHERE email = '$email'";
        $resultado = $connection->query($sql);

        foreach ($resultado as $fila){
            $DNI = $fila['DNI'];
            $nombre = $fila['nombre'];
            $apellido1 = $fila["apellido1"];
            $apellido2 = $fila["apellido2"];
            $curso = $fila['curso'];
            $ciclo = $fila['ciclo'];
        }

        $respuesta = array('dni' => $DNI, 'nombre' => $nombre, 'apellido1' => $apellido1, 'apellido2' => $apellido2, 'curso' => $curso, 'ciclo' =>$ciclo);
        header('Content-Type: application/json');
        echo json_encode($respuesta);
        }

    else{
        header("HTTP/1.1 400 Bad Request");
        echo "Error 400: Bad Request - La solicitud no se pudo procesar correctamente.";
    }
    
?>