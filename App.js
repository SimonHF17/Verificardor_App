import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PantallaHome from './PantallaHome';
import PantallaCompra from './PantallaCompra';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PantallaHome">
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