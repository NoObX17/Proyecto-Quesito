<?php

// Creamos la clase que albergará nuestra conexión a la BBDD, para luego utilizar el objeto en cada archivo que necesite BBDD
  Class DB_Configuration {
  // Iniciamos los atributos con la información para realizar la conexión
  public $dsn = "mysql:host=localhost;dbname=cesur;port=3306";
  public $user = "root";
  public $pass = "";

  // Función con la extensión PDO para realizar la conexión, en un bloque try/catch para capturar posibles errores
  public function db_connect() {
    try {
      $dbh = new PDO($this->dsn, $this->user, $this->pass);
      $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      return $dbh;
    } catch (PDOException $e){
      echo ("Error en la conexión de base de datos: ".$e->getMessage());
      throw $e; // Lanza la excepción nuevamente para que el código que utiliza esta clase pueda manejarla
    }
  }
}
?>