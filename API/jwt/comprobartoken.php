<?php
//include_once './header.php';
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Methods: POST, PUT, DELETE, UPDATE");
header("Access-Control-Allow-Origin: * ");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
//require_once '../vendor/autoload.php';
use \Firebase\JWT\JWT;
use \Firebase\JWT\Key;

function verificarJWT(){
    $secret_key = "contrasecreta";
    
    // Verificar si el encabezado de autorización está presente
    if (!isset($_SERVER['HTTP_AUTHORIZATION'])) {
        header("HTTP/1.1 401 Unauthorized");
        echo "Error 401: Unauthorized - Encabezado de autorización no presente.";
        return false;
    }

    $authHeader = $_SERVER['HTTP_AUTHORIZATION'];
    $arr = explode(" ", $authHeader);
    
    // Verificar si el token JWT está presente
    if (count($arr) < 2) {
        header("HTTP/1.1 401 Unauthorized");
        echo "Error 401: Unauthorized - Token JWT no presente.";
        return false;
    }

    $jwt = $arr[1];
    
    $headers = new stdClass();

    try {
        $decoded = JWT::decode($jwt, new Key($secret_key, 'HS256'), $headers);

        // echo "Acceso permitido";
        return true;

    } catch (Exception $e) {
        header("HTTP/1.1 401 Unauthorized");
        echo "Error 401: Unauthorized - Token inválido. Error: " . $e->getMessage(); // Imprimir mensaje de error
        return false;
    }
}

function verificarJWT2($capsalera){
    $secret_key = "contrasecreta";
    // Verificar si el encabezado de autorización está presente
    if (!isset($capsalera['Authorization'])) {
        header("HTTP/1.1 401 Unauthorized");
        echo "Error 401: Unauthorized - Encabezado de autorización no presente.";
        return false;
    }

    $authHeader = $capsalera['Authorization'];
    $arr = explode(" ", $authHeader);
    // Verificar si el token JWT está presente
    if (count($arr) < 1) {
        header("HTTP/1.1 401 Unauthorized");
        echo "Error 401: Unauthorized - Token JWT no presente.";
        return false;
    }

    $jwt = $arr[1];

    $headers = new stdClass();

    try {
        $decoded = JWT::decode($jwt, new Key($secret_key, 'HS256'), $headers);

        // echo "Acceso permitido";
        return true;

    } catch (Exception $e) {
        header("HTTP/1.1 401 Unauthorized");
        echo "Error 401: Unauthorized - Token inválido. Error: " . $e->getMessage(); // Imprimir mensaje de error
        return false;
    }
}