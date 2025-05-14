import { useEffect } from 'react';
import { StatusBar, Platform } from 'react-native';
import * as SystemUI from 'expo-system-ui';
import * as NavigationBar from 'expo-navigation-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PantallaHome from './PantallaHome';
import PantallaCompra from './PantallaCompra';
import PantallaNueva from './PantallaNueva';

const Stack = createNativeStackNavigator();

export default function App() {
    useEffect(() => {
    // Oculta la barra de estado
    StatusBar.setHidden(true, 'slide');

    if (Platform.OS === 'android') {
      // Oculta barra de navegación inferior
      NavigationBar.setVisibilityAsync('hidden');
      // Configura estilo para que sea totalmente inmersivo
      NavigationBar.setBehaviorAsync('overlay-swipe'); // Mostrar al deslizar
    }

    // Fondo transparente o personalizado si quieres
    SystemUI.setBackgroundColorAsync('transparent');
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PantallaNueva">
        <Stack.Screen 
        name = "PantallaNueva" 
        component={PantallaNueva}
        options={{headerShown: false}}
        />
        <Stack.Screen 
        name = "PantallaHome" 
        component={PantallaHome}
        options={{headerShown: false}}
        />
        <Stack.Screen 
        name = "PantallaCompra" 
        component={PantallaCompra}
        options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}