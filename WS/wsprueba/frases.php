<?php
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Methods: POST, PUT, DELETE, UPDATE");
header("Access-Control-Allow-Origin: * ");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'db.php';

$dbService = new DB_Configuration();
$connection = $dbService->db_connect();

$sql = "SELECT frase FROM frases_motivadoras ORDER BY RAND() LIMIT 1";
$stmt = $connection->prepare($sql);
$stmt->execute();
$result = $stmt->fetch(PDO::FETCH_ASSOC);

$response = array();

if ($result) {
    $response["frase"] = $result["frase"];
} else {
    $response["error"] = "No se encontraron frases motivadoras.";
}

$connection = null; // Cerramos la conexión

header('Content-Type: application/json');
echo json_encode($response, JSON_UNESCAPED_UNICODE);
?>