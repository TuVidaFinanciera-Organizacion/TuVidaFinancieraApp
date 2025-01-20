import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, StatusBar, FlatList, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Svg, Rect } from 'react-native-svg';
import HeaderHome from "../components/HeaderHome";
import Icon from 'react-native-vector-icons/Ionicons';
interface Entry {
    name: string;
    spent: number;
    date: string;
}

interface Category {
    name: string;
    budgeted: number;
    spent: number;
    entries: Entry[];
}

const categories: Category[] = [
    {
        name: 'Cuidado',
        budgeted: 150,
        spent: 50,
        entries: [
            { name: 'Salon/Barberia', spent: 25, date: '27/Mar 19:05' },
            { name: 'Salon/Barberia', spent: 25, date: '26/Mar 17:06' }
        ]
    },
    {
        name: 'Restaurantes',
        budgeted: 300,
        spent: 200,
        entries: [
            { name: 'Cena', spent: 100, date: '28/Mar 20:00' },
            { name: 'Almuerzo', spent: 100, date: '29/Mar 13:00' }
        ]
    },
    {
        name: 'Transportes',
        budgeted: 100,
        spent: 50,
        entries: [
            { name: 'Autobus', spent: 25, date: '27/Mar 08:00' },
            { name: 'Taxi', spent: 25, date: '28/Mar 18:00' }
        ]
    },
    {
        name: 'Compras',
        budgeted: 400,
        spent: 250,
        entries: [
            { name: 'Ropa', spent: 150, date: '30/Mar 15:00' },
            { name: 'Electronica', spent: 100, date: '31/Mar 16:00' }
        ]
    },
    {
        name: 'Bares',
        budgeted: 200,
        spent: 100,
        entries: [
            { name: 'Bar local', spent: 50, date: '27/Mar 21:00' },
            { name: 'Club', spent: 50, date: '28/Mar 22:00' }
        ]
    },
    {
        name: 'Servicios',
        budgeted: 600,
        spent: 450,
        entries: [
            { name: 'Luz', spent: 150, date: '01/Mar 12:00' },
            { name: 'Agua', spent: 150, date: '02/Mar 12:00' },
            { name: 'Internet', spent: 150, date: '03/Mar 12:00' }
        ]
    },
    {
        name: 'Entretenimiento',
        budgeted: 300,
        spent: 200,
        entries: [
            { name: 'Cine', spent: 50, date: '28/Mar 19:00' },
            { name: 'Concierto', spent: 150, date: '29/Mar 20:00' }
        ]
    },
    {
        name: 'Educacion',
        budgeted: 500,
        spent: 300,
        entries: [
            { name: 'Libros', spent: 100, date: '01/Mar 10:00' },
            { name: 'Cursos', spent: 200, date: '02/Mar 11:00' }
        ]
    },
    {
        name: 'Salud',
        budgeted: 400,
        spent: 200,
        entries: [
            { name: 'Medicinas', spent: 100, date: '05/Mar 09:00' },
            { name: 'Consulta', spent: 100, date: '06/Mar 10:00' }
        ]
    },
    {
        name: 'Hogar',
        budgeted: 500,
        spent: 250,
        entries: [
            { name: 'Alquiler', spent: 200, date: '01/Mar 10:00' },
            { name: 'Agua', spent: 50, date: '01/Mar 10:00' }
        ]
    },
];


type RootStackParamList = { Main: undefined; TransaccionesScreen: undefined; CategoriaScreen: undefined; ObjetivoAhorroScreen: undefined; HomeScreen: undefined; };

const screenWidth = Dimensions.get('window').width;

const data = [
    {
        name: 'Presupuestado',
        population: 2150,
        color: '#3498db',
        legendFontColor: '#7F7F7F',
        legendFontSize: 10,
    },
    {
        name: 'Total Gastado',
        population: 150,
        color: '#e74c3c',
        legendFontColor: '#7F7F7F',
        legendFontSize: 10,
    },
    {
        name: 'Disponible',
        population: 1350,
        color: '#2ecc71',
        legendFontColor: '#7F7F7F',
        legendFontSize: 10,
    },
    {
        name: 'Presupuestado',
        population: 2350,
        color: '#f1c40f',
        legendFontColor: '#7F7F7F',
        legendFontSize: 10,
    },
];

const HorizontalProgressBar = ({ total, progress }: { total: number, progress: number }) => {
    const progressWidth = (progress / total) * 100;
    return (
        <Svg height="20" width="100%">
            <Rect x="0" y="0" width="100%" height="20" fill="#d3d3d3" />
            <Rect x="0" y="0" width={`${progressWidth}%`} height="20" fill="#3498db" />
        </Svg>
    );
};

export default function PresupuestoScreen() {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);

    const handleScan = async () => {
        if (hasPermission === null) return;
        if (hasPermission === false) {
            alert('No access to camera');
            return;
        }

        await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 1,
        });
    };

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#009ee3" />
            <HeaderHome />
            <Text style={styles.header}>Presupuesto</Text>

            <View style={styles.chartContainer}>
                <PieChart
                    data={data}
                    width={screenWidth}
                    height={200}
                    chartConfig={{
                        backgroundColor: '#1cc910',
                        backgroundGradientFrom: '#eff3ff',
                        backgroundGradientTo: '#efefef',
                        decimalPlaces: 2,
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        style: {
                            borderRadius: 16,
                        },
                    }}
                    accessor="population"
                    backgroundColor="transparent"
                    paddingLeft="-10"
                    absolute
                />
            </View>


            <View style={styles.listaContainer}>
                <Text style={styles.title}>Todas las categorias</Text>
                <FlatList
                    data={categories}
                    keyExtractor={(item) => item.name}
                    renderItem={({ item }) => (
                        <View style={styles.progressCard}>
                            <View style={styles.category}>
                                <Text style={styles.categoryTitle}>{item.name}</Text>
                                <Text style={styles.categorysubTitle}>${item.spent} de ${item.budgeted}</Text>
                            </View>

                            <HorizontalProgressBar total={item.budgeted} progress={item.spent} />
                            <View style={styles.seccategory}>
                                {item.entries.map((entry, index) => (
                                    <View key={index} style={styles.entryContainer1}>
                                        <Text style={styles.entryLeft}>
                                            {entry.name}
                                        </Text>
                                        <View style={styles.entryRightContainer}>
                                            <Text style={styles.entryRight}>
                                                ${entry.spent} <Icon name="pricetag" size={10} color="blue" /> {/* Icono de etiqueta */}
                                            </Text>
                                            <Text style={styles.entryRight2}>
                                                {entry.date}
                                            </Text>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        </View>
                    )}
                />
            </View>
            
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 16,
    },

    
    listaContainer: {
        marginTop: 10,
        height: "50%",
            },
    header: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    chartContainer: {

        marginBottom: 10,
    },
    chartBox: {
        borderRadius: 16,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
        width: "100%",
        alignItems: 'left',

    },
    actionButtonsSection: {
        flex: 1,
        alignItems: 'center',
    },
    actionButton: {
        backgroundColor: '#009ee3',
        padding: 10,
        borderRadius: 5,
    },
    actionButtonText: {
        color: '#fff',
    },
    actionButton2: {
        backgroundColor: '#e74c3c',
        padding: 10,
        borderRadius: 5,
    },
    progressCard: {
        flexDirection: 'column',
        alignItems: 'flex-end',
        marginBottom: 16,
        fontSize: 16,
       
        backgroundColor: "#F8F8F8",
        borderRadius: 8,
        padding: 10,
        marginTop: 10,
        marginLeft: 2,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        width: "100%",
    },
    actionButtonText2: {
        color: '#fff',
    },
    title: {
        flexDirection: 'row',
        backgroundColor: '#668ACA',
        padding: 10,
        borderRadius: 5,
        width: 150,
        height: 40, 
        color: '#fff', // Color del texto blanco 
        justifyContent: 'space-between',
        marginBottom: 16,
        alignItems: 'left',
    },
    category: {
        marginRight: 150,
        marginBottom: 16,
        alignItems: 'flex-start',

    },

    categoryTitle: {
        width: 150,
        fontSize: 19,
        color: 'black',
        fontWeight: 'bold',
    },

    
    categorysubTitle: {
        fontSize: 11,
        color: '#7f8c8d',
        fontWeight: 'bold',
    },
    
  
    texto: { marginLeft: -130, color: '#fff', },
   
        seccategory: {
            marginTop: 10,
        },
    entryContainer1: {
        marginLeft: 50,
        width: 250,
        height: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 10,
        },
        entryLeft: {
            flex: 1,
            textAlign: 'left',
            fontSize: 13,
        },
        entryRightContainer: {
            flexDirection: 'column',
            alignItems: 'flex-end',
        },
        entryRight: {
            fontSize: 16,
            color: '#7f8c8d',
    },
    entryRight2: {
        fontSize: 9,
        color: '#7f8c8d',
    },
        entry: {
            marginLeft: 16,
        },

});
