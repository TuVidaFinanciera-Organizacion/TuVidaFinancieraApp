import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Button, Platform } from "react-native";
import { ProgressBar } from "react-native-paper";
import HeaderHome from "../components/HeaderHome";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import MlkitOcr from 'react-native-mlkit-ocr';

type RootStackParamList = { Main: undefined; TransaccionesScreen: undefined; CategoriaScreen: undefined; ObjetivoAhorroScreen: undefined; HomeScreen: undefined; };

export default function App() {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [scannedText, setScannedText] = useState('');
    const [hasPermission, setHasPermission] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleScan = async () => {
        if (hasPermission === null) {
            return;
        }
        if (hasPermission === false) {
            alert('No access to camera');
            return;
        }

        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 1,
        });

        if (!result.cancelled) {
            try {
                const ocrResult = await MlkitOcr.detectFromUri(result.uri);
                const extractedText = ocrResult.map(block => block.text).join(' ');
                setScannedText(extractedText);
                console.log('Extracted Text: ', extractedText);
            } catch (error) {
                console.log('OCR Error: ', error);
            }
        }
    };

    return (
        <ScrollView style={styles.container} >
            {/* Header */}
            <HeaderHome />

            {/* Welcome Section */}
            <View style={styles.welcomeSection}>
                <Text style={styles.greeting}>Hola,</Text>
                <Text style={styles.userName}>Diomaris Duran</Text>
            </View>

            {/* Balance Section */}
            <View style={styles.balanceCard}>
                <Text style={styles.balanceAmount}>$2350.00</Text>
                <Text style={styles.balanceSubtitle}>Balance Diciembre</Text>
                <View style={styles.balanceDetails}>
                    <View style={styles.balanceItem}>
                        <View style={styles.iconContainerBalance}>
                            <Image
                                source={require("../../assets/images/gastos.png")}
                                resizeMode="contain"
                            />
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.expenseAmount}>$350.00</Text>
                            <Text style={styles.expenseLabel}>Gastos</Text>
                        </View>
                    </View>

                    <View style={styles.balanceItem}>
                        <Image
                            source={require("../../assets/images/ingresos.png")}
                            resizeMode="contain"
                        />
                        <View style={styles.textContainer}>
                            <Text style={styles.incomeAmount}>$350.00</Text>
                            <Text style={styles.incomeLabel}>Ingresos</Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
                <View style={styles.actionButtonsSection}>
                    <TouchableOpacity style={styles.actionButton} onPress={handleScan}>
                        <Text style={styles.actionButtonText}>[-]</Text>
                    </TouchableOpacity>
                    <Text style={styles.actionText}>Scan</Text>
                </View>
                
                <View style={styles.actionButtonsSection}>
                    <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('ObjetivoAhorroScreen')}>
                        <Text style={styles.actionButtonText}>$</Text>
                    </TouchableOpacity>
                    <Text style={styles.actionText}>Ahorros</Text>
                </View>
                
                <View style={styles.actionButtonsSection}>
                    <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('CategoriaScreen')}>
                        <Text style={styles.actionButtonText}>...</Text>
                    </TouchableOpacity>
                    <Text style={styles.actionText}>Categoria</Text>
                </View>
            </View>

            {/* Progress Section */}
            <Text style={styles.sectionTitle}>Progresos Objetivos Ahorros</Text>
            <View style={styles.progressCard}>
                <View style={styles.iconContainer}>
                    <Image
                        source={require("../../assets/images/vacaciones_icon.png")}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </View>
                <View style={styles.textAndProgress}>
                    <Text style={styles.progressLabel}>Vacaciones</Text>
                    <ProgressBar progress={0.65} color="#4CAF50" style={styles.progressBar} />
                </View>
                <Text style={styles.progressPercentage}>65%</Text>
            </View>
            <View style={styles.progressCard}>
                <View style={styles.iconContainer}>
                    <Image
                        source={require("../../assets/images/car_ico.png")}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </View>
                <View style={styles.textAndProgress}>
                    <Text style={styles.progressLabel}>Coche nuevo</Text>
                    <ProgressBar progress={0.32} color="#FFC107" style={styles.progressBar} />
                </View>
                <Text style={styles.progressPercentage}>32%</Text>
            </View>
            <View style={styles.progressCard}>
                <View style={styles.iconContainer}>
                    <Image
                        source={require("../../assets/images/Hucha_ico.png")}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </View>
                <View style={styles.textAndProgress}>
                    <Text style={styles.progressLabel}>Fondo de emergencia</Text>
                    <ProgressBar progress={0.92} color="#F44336" style={styles.progressBar} />
                </View>
                <Text style={styles.progressPercentage}>92%</Text>
            </View>

            {/* Scanned Text Section */}
            {scannedText ? (
                <View style={styles.scannedTextContainer}>
                    <Text style={styles.scannedTextTitle}>Texto Escaneado:</Text>
                    <Text style={styles.scannedText}>{scannedText}</Text>
                </View>
            ) : null}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 16,
    },
    welcomeSection: {
        marginTop: 16,
    },
    greeting: {
        fontSize: 16,
        color: "#333",
    },
    userName: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#0942AA",
    },
    balanceCard: {
        backgroundColor: "#F8F8F8",
        borderRadius: 10,
        padding: 20,
        alignItems: "left",
        marginTop: 16,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    balanceAmount: {
        fontSize: 34,
        fontWeight: "bold",
        color: "#0942AA",
        marginBottom: 5,
    },
    balanceSubtitle: {
        fontSize: 16,
        color: "#000",
        marginBottom: 20,
    },
    balanceDetails: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    balanceItem: {
        flexDirection: "row", // Para alinear el contenido horizontalmente
        alignItems: "center", // Centrar verticalmente
        flex: 1,
    },
    iconContainerBalance: {
        marginRight: 8, // Espacio entre el icono y el texto
    },
    iconBalance: {
        width: 30,
        height: 30,
    },
    textContainer: {
        justifyContent: "center",
    },
    expenseAmount: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#000",
    },
    incomeAmount: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#000",
    },
    expenseLabel: {
        fontSize: 14,
        color: "#757575",
        marginTop: 3,
    },
    incomeLabel: {
        fontSize: 14,
        color: "#757575",
        marginTop: 3,
    },
    actionButtons: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 16,
        alignItems: 'center',
    },
    actionButtonsSection: {
        flexDirection: "column",
        justifyContent: "space-around",
        marginTop: 5,
        alignItems: 'center',
    },
    actionText: {
        marginTop: 5,
    },
    actionButton: {
        backgroundColor: "#668ACA",
		width: 50,
        height: 50,
        padding: 16,
        borderRadius: 8,
    },
	actionButtonText: {
        color: "#fff",
		fontSize: 16,
		textAlign: 'center',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 24,
    },
    progressCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F8F8F8",
        borderRadius: 8,
        padding: 10,
        marginTop: 10,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    iconContainer: {
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },
    textAndProgress: {
        flex: 1,
        marginRight: 10,
    },
    progressLabel: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
        color: "#333",
    },
    progressBar: {
        height: 8,
        borderRadius: 4,
        backgroundColor: "#E0E0E0",
    },
    progressPercentage: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#333",
    },
    logo: {
        width: 40,
        height: 40,
    },
});
