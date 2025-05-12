import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Card, Text, Button } from 'react-native-paper'
//import { useRoute } from '@react-navigation/native';


const PantallaHome = ( {navigation}) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [barcodeData, setBarcodeData] = useState('')
  const [text, setText] = useState('No hay código');

  useEffect(() => {
    requestPermission();
  }, []);

  if (!permission) {
    // Los permisos de la cámara aún se están cargando.
    return <View />;
  }

  if (!permission.granted) {
    // Los permisos de la cámara aún no se han concedido.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Necesitamos tu permiso para mostrar la cámara</Text>
        <Button title="Conceder permiso" onPress={requestPermission} />
      </View>
    );
  }

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setText(data);
    setBarcodeData(data);
   // alert(`Código de barras con tipo ${type} y datos ${data} ha sido escaneado!`);

};



  return (
    <View style={styles.container}>
      <View style={styles.barcodebox}>
      <CameraView
        style={{ height: 200, width: 300 }}
        barcodeScannerEnable = {true}
        facing="back" // Usamos la cámara trasera por defecto
        onBarcodeScanned ={scanned ? undefined : handleBarCodeScanned}
        barCodeScannerSettings={{
          barCodeTypes: ['qr', 'ean13', 'ean8', 'upc_a', 'upc_e', 'code39', 'code93', 'code128', 'pdf417', 'aztec'],
        }}
      >
      </CameraView>
      </View>

      <Modal
        visible={scanned}
        animationType="slide"
        transparent={true} // Fondo semitransparente para el modal
      >
    {/* Contenedor principal del modal (fondo semitransparente) */}
    <View style={styles.modalOverlay}>
      {/* Nueva tarjeta contenedora (fondo gris claro) */}
      <Card style={styles.containerCard}>
        <Card.Content>
          {/* Tarjeta de factura escaneada (fondo blanco) */}
          <Card style={styles.innerCard}>
            <Card.Content>
              <Text variant="titleLarge" style={styles.cardTitle}>
                Factura escaneada
              </Text>
              <Text variant="bodyMedium" style={styles.cardContent}>
                {text || 'No hay código escaneado'}
              </Text>
            </Card.Content>
          </Card>

          {/* Botón VERDE (Escanear nuevamente) */}
          <Button
            mode="contained"
            onPress={() => setScanned(false)}
            style={styles.buttonScanAgain}
            labelStyle={styles.buttonLabel}
          >
            ESCANEAR NUEVAMENTE
          </Button>

          {/* Botón AZUL (Ir a comprar) */}
          <Button
            mode="contained"
            onPress={() => navigation.navigate('PantallaCompra')}
            style={styles.buttonGoToBuy}
            labelStyle={styles.buttonLabel}
          >
            IR A COMPRAR
          </Button>
            </Card.Content>
          </Card>
        </View>
    </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: 'tomato'
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo oscuro semitransparente
  },
  containerCard: {
    width: '90%',
    backgroundColor: '#f5f5f5', // Gris claro para la tarjeta contenedora
    borderRadius: 10,
    padding: 15,
  },
  innerCard: {
    backgroundColor: 'white', // Fondo blanco para la tarjeta de factura
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0', // Borde sutil
  },
  cardTitle: {
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  cardContent: {
    textAlign: 'center',
    color: '#666',
  },
  buttonScanAgain: {
    width: '100%',
    marginTop: 10,
    backgroundColor: '#4CAF50', // Verde
  },
  buttonGoToBuy: {
    width: '100%',
    marginTop: 10,
    backgroundColor: '#2196F3', // Azul
  },
  buttonLabel: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default PantallaHome;