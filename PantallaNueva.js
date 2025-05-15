import { StyleSheet, View, ImageBackground, StatusBar, Image } from 'react-native';
import { Card, Button, Text, Provider } from 'react-native-paper';
import imagen from './assets/rio.png';
import imagenFondo from './assets/fondo.png';

const PantallaNueva = ({ navigation }) => {
  return (
    <Provider>
      {/* Ocultamos la barra de estado para que no haya franjas */}
      <StatusBar hidden />

      {/* ImageBackground ocupa toda la pantalla */}
      <ImageBackground
        source={imagenFondo}
        style={styles.background}
        resizeMode="cover" // cubre toda el área, recortando si es necesario
      >
        <View style={styles.overlay}>
          <Image 
          source={imagen}
          style={styles.imagen}
          />
          <Text style={styles.title}>Verificación de Compra</Text>

          <Button
            mode="contained"
            onPress={() => navigation.navigate('PantallaHome')}
            style={styles.button}
            labelStyle={styles.buttonText}
          >
            ESCANEAR AHORA
          </Button>
        </View>
      </ImageBackground>
    </Provider>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  // Este overlay centra su contenido y deja fondo transparente
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    // opcional: si quieres un ligero oscurecimiento para mejorar contraste:
    // backgroundColor: 'rgba(0,0,0,0.3)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',     // blanco sobre fondo
    marginBottom: 20,
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  button: {
    width: '60%',
    backgroundColor: 'rgba(0,128,0,0.8)', // verde semitransparente
    borderRadius: 8,
    paddingVertical: 6,
  },
  buttonText: {
    color: 'white',
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


