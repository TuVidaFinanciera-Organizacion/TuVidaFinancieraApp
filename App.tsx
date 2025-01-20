import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Navigation from './src/navigation/Navigation';
import TransaccionesScreen from './src/screens/TransaccionesScreen';
import CategoriaScreen from './src/screens/CategoriaScreen';
import ObjetivoAhorroScreen from './src/screens/ObjetivoAhorroScreen';
import HomeScreen from './src/screens/HomeScreen';
import ConfigurationScreen from './src/screens/ConfigurationScreen';
import NotificationsScreen from './src/screens/NotificationsScreen';

type RootStackParamList = {
    Main: undefined;
    TransaccionesScreen: undefined;
    CategoriaScreen: undefined;
    HomeScreen: undefined;
    ObjetivoAhorroScreen: undefined;
    ConfigurationScreen: undefined;
    NotificationsScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Main" component={Navigation} options={{ headerShown: false }} />
                <Stack.Screen name="TransaccionesScreen" component={TransaccionesScreen} />
                <Stack.Screen name="CategoriaScreen" component={CategoriaScreen} options={{ title: "Categoria" }} />
				<Stack.Screen name="ObjetivoAhorroScreen" component={ObjetivoAhorroScreen} options={{ title: "Objetivo de Ahorro" }} />
                <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="ConfigurationScreen" component={ConfigurationScreen} options={{ title: "Configuracion" }} />
                <Stack.Screen name="NotificationsScreen" component={NotificationsScreen} options={{ title: "Notificacion" }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
