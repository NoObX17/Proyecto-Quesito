<?php
include_once './configurations/db.php';
include_once './header.php';
require "../vendor/autoload.php";

use \Firebase\JWT\JWT;


$email = '';
$password = '';
$dbService = new DB_Configuration();
$conn = $dbService->db_connect();

$api_data = json_decode(file_get_contents("php://input"));
$email = $api_data->email;
$password = $api_data->password;

$table = 'persona';
$query = "SELECT DNI, `password`, nombre, apellido1, apellido2 FROM " . $table . " WHERE email =:email  LIMIT 0,1";

$stmt = $conn->prepare( $query );
$stmt->bindParam(':email', $email);
$stmt->execute();
$numOfRows = $stmt->rowCount();

if($numOfRows > 0){
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    $dni = $row['DNI'];
    $pass = $row['password'];
    $pass = password_hash($pass, PASSWORD_DEFAULT);
    $nombre = $row['nombre'];
    $apellido1 = $row['apellido1'];
    $apellido2 = $row['apellido2'];

    if(password_verify($password, $pass)){
        $secret_key = "contrasecreta";
        $issuer_claim = "localhost"; 
        $audience_claim = "THE_AUDIENCE";
        $issuedat_claim = time(); // time issued 
        $notbefore_claim = $issuedat_claim + 10; 
        $expire_claim = $issuedat_claim + 60; 
        $token = array(
            "iss" => $issuer_claim,
            "aud" => $audience_claim,
            "iat" => $issuedat_claim,
            "nbf" => $notbefore_claim,
            "exp" => $expire_claim,
            "data" => array(
                "dni" => $dni,
                "nombre" => $nombre,
                "apellido1" => $apellido1,
                "apellido2" => $apellido2,
                "Email" => $email
        ));

        http_response_code(200);

        $jwtValue = JWT::encode($token, $secret_key, 'HS256');
        echo json_encode(
            array(
                "message" => "Successful login",
                "token" => $jwtValue,
                "email_address" => $email,
                "expire" => $expire_claim
            ));
    }
    else{
        echo json_encode(array("success" => "false"));
    }
}
?>