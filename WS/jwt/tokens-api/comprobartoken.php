<?php
include_once './header.php';
require "../vendor/autoload.php";

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

        echo ("Acceso permitido");

    } catch (Exception $e) {
        header("HTTP/1.1 401 Unauthorized");
        echo "Error 401: Unauthorized - Token inválido.";
    }
}

verificarJWT();
?>