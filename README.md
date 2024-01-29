# Guia de instalación de la Base de Datos
## Crear la Base de Datos
En la carpeta DB, esta el archivo `cesur.sql`. Este es el archivo que debemos importar en el phpMyAdmin. Una vez creada la base de datos continuamos con la configuración del conector a la misma.

## Configuración del conector
Para la utilización actual de los Web Services debemos configurar una base de datos. Para ello primero configuramos el archivo `db.php`. Este archivo es el conector a nuestra base de datos. Dentro de el, debemos editar los campos `$dsn, $user y $pass` que hay en la clase `DB_Configuration`. Completando con los datos de nuestra Base de Datos.
```
  public $dsn = "mysql:host=localhost;dbname=cesur";
  public $user = "root";
  public $pass = "";
```
Una vez cambiados los campos, los Web services seran funcionales.

# Guia de uso de los Web Services
## signin.php
Este archivo es el encargado de crear el token jwt, para ello necesita leer un archivo `.json` con la siguiente estructura:  
```
{
    "email":"xxx",
    "password": "xxx"
}
```
Al hacer uso de este web service envia al servidor una respuesta tambien en `.json` como la siguiente:
```
{
    "message": "Successful login",
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJsb2NhbGhvc3QiLCJhdWQiOiJUSEVfQVVESUVOQ0UiLCJpYXQiOjE3MDYwODMxODcsIm5iZiI6MTcwNjA4MzE5NywiZXhwIjoxNzA2MDgzMjQ3LCJkYXRhIjp7ImRuaSI6IjExMTIyMjMzMyIsIm5vbWJyZSI6IkV2YSIsImFwZWxsaWRvMSI6IkV2YW5zIiwiYXBlbGxpZG8yIjoiTWlsbGVyIiwiRW1haWwiOiJldmEuZUBleGFtcGxlLmNvbSJ9fQ.TRHoI_gXwLmbaflaUa9iZzGvoR_KmQ9bR34EgwVJQwA",
    "email_address": "eva.e@example.com",
    "expire": 1706083247
}
```

## comprobartoken.php
Este archivo contiene una funcion `'verificarJWT()'` que se encarga de verificar un token jwt, obtenido a traves de las cabeceras del servidor haciendo uso de la cabecera `Authorization` en este caso de tipo Bearer.

Devuelve en caso de ser correcto "Acceso permitido" y si el token es incorrecto devuelve `Error 401: Unauthorized - Token inválido`.