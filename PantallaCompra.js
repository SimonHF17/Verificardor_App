import React, { useState, useEffect } from 'react';
import facturaService from './services/facturas';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { Card } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';

const PantallaCompra = () => {
  const [facturas, setFacturas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalFacturas, setTotalFacturas] = useState(0);

  useEffect(() => {
    facturaService
      .getAll()
      .then(data => {
        setFacturas(data);
        setTotalFacturas(data.length);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const renderItem = ({ item }) => (
    <Card style={styles.card} mode="elevated">
      <View style={styles.cardContent}>
        <View style={styles.iconWrapper}>
          <FontAwesome name="shopping-cart" size={20} color="#ffffff" />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.nombre}</Text>
          <Text style={styles.details}>Cantidad: {item.cantidad}</Text>
          <Text style={styles.details}>Presentación: {item.presentacion}</Text>
        </View>
      </View>
    </Card>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="green" />
        <Text style={{ marginTop: 10 }}>Cargando productos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🛒   Lista de Productos ({totalFacturas})</Text>

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
    backgroundColor: '#F0F4F8',
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 20,
    marginTop: 20,
    textAlign: 'center',
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#f1f8e9',
    borderRadius: 16,
    marginVertical: 10,
    elevation: 4,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 25,
  },
  iconWrapper: {
    backgroundColor: '#2E7D32',
    borderRadius: 25,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 32,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 4,
  },
  details: {
    fontSize: 14,
    color: '#555',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PantallaCompra;
