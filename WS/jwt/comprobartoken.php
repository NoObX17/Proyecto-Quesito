<?php
//include_once './header.php';
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Methods: POST, PUT, DELETE, UPDATE");
header("Access-Control-Allow-Origin: * ");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

use \Firebase\JWT\JWT;
use \Firebase\JWT\Key;

function verificarJWT(){
    $secret_key = "contrasecreta";
    
    $authHeader = $_SERVER['HTTP_AUTHORIZATION'];
    $arr = explode(" ", $authHeader);
    $jwt = $arr[1];
    
    $headers = new stdClass();

    try {
        $decoded = JWT::decode($jwt, new Key($secret_key, 'HS256'), $headers);
        
        //echo ("Acceso permitido");
        return true;

    } catch (Exception $e) {
        header("HTTP/1.1 401 Unauthorized");
        echo "Error 401: Unauthorized - Token inválido.";
    }
}

?>