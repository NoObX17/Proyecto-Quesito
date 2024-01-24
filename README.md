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