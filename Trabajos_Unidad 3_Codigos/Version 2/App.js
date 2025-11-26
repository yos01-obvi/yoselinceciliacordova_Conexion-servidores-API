import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

export default function App() {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");

  const API = "http://192.168.56.1/tienda2/api";

  const obtenerDatos = () => {
    fetch(`${API}/obtener.php`)
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch(() => Alert.alert("Error", "No se pudo conectar con el servidor"));
  };

  const crearProducto = () => {
    if (!nombre || !precio) {
      Alert.alert("Campos vacíos", "Completa todos los campos");
      return;
    }

    fetch(`${API}/crear.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, precio }),
    })
      .then((res) => res.json())
      .then(() => {
        obtenerDatos();
        setNombre("");
        setPrecio("");
      });
  };

  const eliminarProducto = (id) => {
    fetch(`${API}/eliminar.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then(() => obtenerDatos());
  };

  useEffect(() => {
    obtenerDatos();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🛒 Gestión de Productos</Text>

      {/* Lista de productos */}
      <FlatList
        data={productos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.nombre}</Text>
            <Text style={styles.cardPrice}>${item.precio}</Text>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => eliminarProducto(item.id)}
            >
              <Text style={styles.deleteText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Formulario */}
      <Text style={styles.sectionTitle}>Agregar nuevo producto</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre del producto"
        value={nombre}
        onChangeText={setNombre}
      />

      <TextInput
        style={styles.input}
        placeholder="Precio"
        keyboardType="numeric"
        value={precio}
        onChangeText={setPrecio}
      />

      <TouchableOpacity style={styles.addButton} onPress={crearProducto}>
        <Text style={styles.addText}>Guardar producto</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#F5F7FA",
    flex: 1,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#333",
  },

  // ------- CARD --------
  card: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardPrice: {
    fontSize: 16,
    color: "#2E86C1",
    marginBottom: 8,
  },

  deleteButton: {
    backgroundColor: "#E74C3C",
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  deleteText: {
    color: "#fff",
    fontWeight: "bold",
  },

  // ------- FORM --------
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#333",
  },

  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#dcdcdc",
  },

  addButton: {
    backgroundColor: "#27AE60",
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
  },
  addText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
