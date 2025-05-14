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
        animationType="fade"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>🎉 Código Escaneado</Text>
            <View style={styles.modalBox}>
              <Text style={styles.modalCode}>{text || 'No hay código escaneado'}</Text>
            </View>

            <Button
              mode="contained"
              icon="camera"
              onPress={() => setScanned(false)}
              style={styles.modalButton}
              labelStyle={styles.buttonLabel}
            >
              ESCANEAR NUEVAMENTE
            </Button>

            <Button
              mode="contained"
              icon="cart"
              onPress={() => navigation.navigate('PantallaCompra')}
              style={[styles.modalButton, { backgroundColor: '#1976D2' }]}
              labelStyle={styles.buttonLabel}
            >
              IR A COMPRAR
            </Button>
          </View>
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
  backgroundColor: 'rgba(0,0,0,0.6)',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 20,
},
modalContent: {
  backgroundColor: '#fff',
  borderRadius: 20,
  padding: 24,
  width: '100%',
  maxWidth: 350,
  alignItems: 'center',
  elevation: 6,
},
modalTitle: {
  fontSize: 20,
  fontWeight: 'bold',
  color: '#2E7D32',
  marginBottom: 20,
  textAlign: 'center',
},
modalBox: {
  backgroundColor: '#f1f8e9',
  borderRadius: 12,
  padding: 16,
  marginBottom: 20,
  width: '100%',
},
modalCode: {
  fontSize: 16,
  color: '#33691E',
  textAlign: 'center',
},
modalButton: {
  width: '100%',
  marginTop: 12,
  backgroundColor: '#4CAF50',
  borderRadius: 8,
},
buttonLabel: {
  color: 'white',
  fontWeight: '600',
},
});

export default PantallaHome;