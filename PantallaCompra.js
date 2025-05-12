import React, { useState, useEffect } from 'react';
//import facturaService from './services/facturas';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';

const PantallaCompra = () => {
  const [facturas, setFacturas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalFacturas, setTotalFacturas] = useState(0);

  useEffect(() => {
    fetch('http://172.16.32.3:3000/facturas') // Ajusta el puerto si usas JSON Server con otra configuración
      .then(response => response.json())
      .then(data => {
        setFacturas(data);
        setTotalFacturas(data.length); // Total de facturas
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);


  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.nombre}</Text>
          <Text style={styles.details}>Cantidad: {item.cantidad}</Text>
          <Text style={styles.details}>Presentación: {item.presentacion}</Text>
        </View>
        <FontAwesome name="shopping-cart" size={24} color="black" style={styles.icon} />
      </View>
    </Card>
  );
  
  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Cargando facturas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, marginTop: 20, color: 'green' }}>
        Total de Productos {totalFacturas}
      </Text>

      <FlatList
        data={facturas}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
    paddingTop: 20,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    marginVertical: 15,
    borderRadius: 16,                // Bordes más redondeados
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,              // Sombra sutil
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,                  // Borde sutil
    borderColor: 'rgba(0,0,0,0.05)', // Borde casi transparente
    overflow: 'hidden',              // Para bordes redondeados en imágenes (si las agregas)
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: 'green',                // Negro con tono suave
    marginBottom: 6,
    fontFamily: 'System',            // Usa la fuente del sistema para modernidad
  },
  details: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
    lineHeight: 20,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  textContainer: {
    flex: 1,
  },
  icon: {
    marginLeft: 16,
    marginRight:20,
  },  
});

export default PantallaCompra;