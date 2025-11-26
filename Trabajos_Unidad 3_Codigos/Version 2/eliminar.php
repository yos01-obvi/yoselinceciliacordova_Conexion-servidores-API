<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
include "conexion.php";

$input = json_decode(file_get_contents("php://input"), true);
$id = $input["id"];

$sql = "DELETE FROM productos WHERE id=$id";

if ($conn->query($sql)) {
    echo json_encode(["mensaje" => "Producto eliminado"]);
} else {
    echo json_encode(["mensaje" => "Error"]);
}
?>
