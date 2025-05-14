import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Card, Button, Text, Provider } from 'react-native-paper';
import imagen from './assets/rio.png';


const PantallaNueva = ({ navigation }) => {
  const [currentDateTime, setCurrentDateTime] = useState('');


  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const date = now.toLocaleDateString();
      const time = now.toLocaleTimeString();
      setCurrentDateTime(`${date} - ${time}`);
    };

    // Actualizar la fecha y hora cada segundo
    const interval = setInterval(updateDateTime, 1000);
    updateDateTime(); // Llamar inmediatamente para evitar un retraso inicial

    // Limpiar el intervalo al desmontar el componente
    return () => clearInterval(interval);
  }, []);

  return (
    <Provider>
      <View style={styles.container}>
      <Image 
          source={imagen}
          style={styles.imagen}
          />
        {/* Título principal */}
        <Text style={styles.title}>Verificacion de Compra</Text>

        {/* Botón "Empezar ahora" */}
        <Button
          mode="contained"
          onPress={() => navigation.navigate('PantallaHome')}
          style={styles.button}
          labelStyle={styles.buttonText}
        >
          ESCANEAR AHORA
        </Button>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white', // Color de fondo
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    width: '90%',
    marginBottom: 20,
    elevation: 4, // Sombra en Android
    shadowColor: '#000', // Sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardText: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 8,
  },
  button: {
    width: '35%',
    backgroundColor: 'green', // Color del botón
    marginTop: 16,
  },
  buttonText: {
    color: 'white', // Color del texto del botón
    fontWeight: 'bold',
  },
  imagen: {
    width:200,
    height:163,
    marginBottom:20,
    alignSelf:'center'
  },
});

export default PantallaNueva;