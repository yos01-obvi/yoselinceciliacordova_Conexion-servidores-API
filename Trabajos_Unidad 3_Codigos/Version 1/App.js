import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';

export default function App() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch('http://192.168.0.105/tienda-api/obtener_productos.php') // 🔁 pon aquí tu IP local
      .then(res => res.json())
      .then(data => {
        setProductos(data);
        setCargando(false);
      })
      .catch(err => {
        console.error("Error al conectar con la API:", err);
        setCargando(false);
      });
  }, []);

  if (cargando) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={{ marginTop: 10 }}>Cargando productos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛍 Lista de productos</Text>
      <FlatList
        data={productos}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={styles.item}>
            {item.nombre} - ${item.precio}
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 40, backgroundColor: '#f9f9f9' },
  title: { fontSize: 22, marginBottom: 10, fontWeight: 'bold', textAlign: 'center' },
  item: { fontSize: 18, marginVertical: 5, padding: 8, backgroundColor: '#fff', borderRadius: 5, elevation: 1 }
});
