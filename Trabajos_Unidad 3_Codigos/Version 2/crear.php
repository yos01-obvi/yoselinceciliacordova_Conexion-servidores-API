<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
include "conexion.php";

$input = json_decode(file_get_contents("php://input"), true);

$nombre = $input["nombre"];
$precio = $input["precio"];

$sql = "INSERT INTO productos (nombre, precio) VALUES ('$nombre', '$precio')";

if ($conn->query($sql)) {
    echo json_encode(["mensaje" => "Producto creado"]);
} else {
    echo json_encode(["mensaje" => "Error"]);
}
?>
