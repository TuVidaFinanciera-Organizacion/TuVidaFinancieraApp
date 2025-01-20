import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
    PresupuestoScreen,
    TransaccionesScreen,
    HomeScreen,
    PlanificacionScreen,
    ReporteScreen,
    CategoriaScreen,
} from "../screens";
import Icon from "@expo/vector-icons/Ionicons";

const Tab = createBottomTabNavigator();
const { width } = Dimensions.get("window");

export default function Navigation() {
    return (
        <Tab.Navigator
            initialRouteName="HomeScreen"
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: "#0942AA",
                tabBarInactiveTintColor: "#fff",
                tabBarLabelStyle: { fontSize: 12 },
                tabBarStyle: styles.barStyles,
                tabBarIcon: ({ color }) => {
                    let iconName: string | any = "";

                    switch (route.name) {
                        case "PresupuestoScreen":
                            iconName = "wallet-outline";
                            break;
                        case "TransaccionesScreen":
                            iconName = "swap-horizontal-outline";
                            break;
                        case "HomeScreen":
                            iconName = "home-outline";
                            break;
                        case "PlanificacionScreen":
                            iconName = "calendar-outline";
                            break;
                        case "ReporteScreen":
                            iconName = "bar-chart-outline";
                            break;
                    }

                    return <Icon name={iconName} size={26} color={color} />;
                },
            })}
        >
            <Tab.Screen
                name="PresupuestoScreen"
                component={PresupuestoScreen}
                options={{ tabBarLabel: () => null }}
            />
            <Tab.Screen
                name="TransaccionesScreen"
                component={TransaccionesScreen}
                options={{ tabBarLabel: () => null }}
            />
            <Tab.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{ tabBarLabel: () => null }}
            />
            <Tab.Screen
                name="PlanificacionScreen"
                component={PlanificacionScreen}
                options={{ tabBarLabel: () => null }}
            />
            <Tab.Screen
                name="ReporteScreen"
                component={ReporteScreen}
                options={{ tabBarLabel: () => null }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    barStyles: {
        elevation: 0,
        borderTopWidth: 0,
        position: "absolute",
        height: 60,
        paddingBottom: 10,
		paddingTop: 10,
        backgroundColor: "#668ACA",
		marginTop: 5,
    },
    barItemQR: {
        backgroundColor: "#668ACA",
        position: "absolute",
        width: 60,
        height: 60,
        left: width / 2 - 30,
        borderRadius: 30,
        bottom: -3,
        zIndex: 1,
        borderWidth: 5,
        borderColor: "#ECF9FF",
    },
    barIconQR: {
        textAlignVertical: "center",
        top: 8,
    },
});
