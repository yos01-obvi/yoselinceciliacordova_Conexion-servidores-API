<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
include "conexion.php";

$input = json_decode(file_get_contents("php://input"), true);

$id = $input["id"];
$nombre = $input["nombre"];
$precio = $input["precio"];

$sql = "UPDATE productos SET nombre='$nombre', precio='$precio' WHERE id=$id";

if ($conn->query($sql)) {
    echo json_encode(["mensaje" => "Producto actualizado"]);
} else {
    echo json_encode(["mensaje" => "Error"]);
}
?>
