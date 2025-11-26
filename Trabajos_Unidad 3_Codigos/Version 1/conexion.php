<?php
// conexion.php

$host = "localhost";
$user = "root";
$password = "";
$db = "tienda";

// Crear conexión
$conn = new mysqli($host, $user, $password, $db);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
?>
