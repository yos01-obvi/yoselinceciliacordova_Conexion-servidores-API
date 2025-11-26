<?php
// obtener_productos.php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include("conexion.php");

$sql = "SELECT * FROM productos";
$result = $conn->query($sql);

$productos = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $productos[] = $row;
    }
}

echo json_encode($productos, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

$conn->close();
?>
