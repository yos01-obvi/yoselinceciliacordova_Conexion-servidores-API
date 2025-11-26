<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
include "conexion.php";

$sql = "SELECT * FROM productos";
$result = $conn->query($sql);

$datos = [];

while ($fila = $result->fetch_assoc()) {
    $datos[] = $fila;
}

echo json_encode($datos);
?>
