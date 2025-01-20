import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, ScrollView, StatusBar, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as XLSX from 'xlsx';
import HeaderHome from "../components/HeaderHome";
import Icon from 'react-native-vector-icons/FontAwesome';



const screenWidth = Dimensions.get('window').width;

const transactions = [
    { tipo: 'Ahorros', fecha: '2024-12-08', monto: 681.06, nombre: 'Ahorro para educacion' },
    { tipo: 'Gastos', fecha: '2024-06-06', monto: 460.54, nombre: 'Compra de ropa - H&M' },
    { tipo: 'Gastos', fecha: '2024-05-13', monto: 80.65, nombre: 'Pago de transporte' },
    { tipo: 'Ahorros', fecha: '2024-12-08', monto: 581.06, nombre: 'Compra de ropa - Zara' },
    { tipo: 'Gastos', fecha: '2024-11-06', monto: 60.54, nombre: 'Compra de medicamentos' },
    { tipo: 'Gastos', fecha: '2024-05-13', monto: 870.35, nombre: 'Compra de libros' },
    { tipo: 'Imprevistos', fecha: '2024-12-08', monto: 11.06, nombre: 'Supermercado' },
    { tipo: 'Imprevistos', fecha: '2024-03-06', monto: 40.04, nombre: 'Compra de ropa - Zara' },
    { tipo: 'Imprevistos', fecha: '2024-05-13', monto: 370.65, nombre: 'Supermercado' },
    { tipo: 'Ahorros', fecha: '2024-12-08', monto: 671.9, nombre: 'Compra de libros' },
    { tipo: 'Gastos', fecha: '2024-06-06', monto: 460.54, nombre: 'Reparacion del coche' },
    { tipo: 'Imprevistos', fecha: '2024-05-13', monto: 1870.65, nombre: 'Compra de medicamentos' },
    { tipo: 'Gastos', fecha: '2024-07-01', monto: 150.75, nombre: 'Supermercado' },
    { tipo: 'Ahorros', fecha: '2024-08-15', monto: 1200.50, nombre: 'Pago de alquiler' },
    { tipo: 'Imprevistos', fecha: '2024-09-20', monto: 300.00, nombre: 'Reparacion del coche' },
    { tipo: 'Gastos', fecha: '2024-10-05', monto: 75.30, nombre: 'Pago de luz' },
    { tipo: 'Gastos', fecha: '2024-11-10', monto: 50.00, nombre: 'Pago de agua' },
    { tipo: 'Ahorros', fecha: '2024-12-01', monto: 500.00, nombre: 'Ahorro mensual' },
    { tipo: 'Gastos', fecha: '2024-07-15', monto: 200.00, nombre: 'Compra de ropa - Zara' },
    { tipo: 'Imprevistos', fecha: '2024-08-25', monto: 100.00, nombre: 'Compra de medicamentos' },
    { tipo: 'Gastos', fecha: '2024-09-30', monto: 60.00, nombre: 'Pago de telefono' },
    { tipo: 'Gastos', fecha: '2024-10-15', monto: 80.00, nombre: 'Pago de internet' },
    { tipo: 'Ahorros', fecha: '2024-11-20', monto: 300.00, nombre: 'Ahorro para vacaciones' },
    { tipo: 'Gastos', fecha: '2024-12-05', monto: 150.00, nombre: 'Supermercado' },
    { tipo: 'Imprevistos', fecha: '2024-07-10', monto: 250.00, nombre: 'Reparacion de electrodomesticos' },
    { tipo: 'Gastos', fecha: '2024-08-20', monto: 90.00, nombre: 'Pago de gimnasio' },
    { tipo: 'Ahorros', fecha: '2024-09-25', monto: 400.00, nombre: 'Ahorro para educacion' },
    { tipo: 'Gastos', fecha: '2024-10-30', monto: 70.00, nombre: 'Pago de seguro medico' },
    { tipo: 'Gastos', fecha: '2024-11-15', monto: 100.00, nombre: 'Compra de libros' },
    { tipo: 'Imprevistos', fecha: '2024-12-10', monto: 200.00, nombre: 'Reparacion de la casa' },
    { tipo: 'Gastos', fecha: '2024-07-05', monto: 50.00, nombre: 'Pago de transporte' },
    { tipo: 'Ahorros', fecha: '2024-08-10', monto: 600.00, nombre: 'Ahorro para emergencias' },
    { tipo: 'Gastos', fecha: '2024-09-15', monto: 120.00, nombre: 'Compra de ropa - H&M' },
    { tipo: 'Gastos', fecha: '2024-10-20', monto: 80.00, nombre: 'Pago de luz' },
    { tipo: 'Imprevistos', fecha: '2024-11-25', monto: 150.00, nombre: 'Reparacion del coche' },
    { tipo: 'Gastos', fecha: '2024-12-15', monto: 200.00, nombre: 'Supermercado' },
    { tipo: 'Ahorros', fecha: '2024-07-20', monto: 700.00, nombre: 'Ahorro para inversion' },
    { tipo: 'Gastos', fecha: '2024-08-25', monto: 90.00, nombre: 'Pago de internet' },
    { tipo: 'Gastos', fecha: '2024-09-30', monto: 60.00, nombre: 'Pago de telefono' },
    { tipo: 'Imprevistos', fecha: '2024-10-15', monto: 300.00, nombre: 'Reparacion de la casa' },
    { tipo: 'Gastos', fecha: '2024-11-20', monto: 150.00, nombre: 'Supermercado' },
    { tipo: 'Ahorros', fecha: '2024-12-05', monto: 500.00, nombre: 'Ahorro mensual' },
    { tipo: 'Gastos', fecha: '2024-07-10', monto: 200.00, nombre: 'Compra de ropa - Mango' },
    { tipo: 'Gastos', fecha: '2024-08-15', monto: 75.00, nombre: 'Pago de luz' },
    { tipo: 'Imprevistos', fecha: '2024-09-20', monto: 100.00, nombre: 'Compra de medicamentos' },
    { tipo: 'Gastos', fecha: '2024-10-25', monto: 80.00, nombre: 'Pago de agua' },
    { tipo: 'Gastos', fecha: '2024-11-30', monto: 90.00, nombre: 'Pago de gimnasio' },
    { tipo: 'Ahorros', fecha: '2024-12-10', monto: 600.00, nombre: 'Ahorro para educacion' },
    { tipo: 'Gastos', fecha: '2024-07-15', monto: 120.00, nombre: 'Compra de ropa - Primark' },
    { tipo: 'Gastos', fecha: '2024-08-20', monto: 70.00, nombre: 'Pago de seguro medico' },
];

const sumByType = (data) => data.reduce((acc, transaction) => {
    if (acc[transaction.tipo]) {
        acc[transaction.tipo] += transaction.monto;
    } else {
        acc[transaction.tipo] = transaction.monto;
    }
    return acc;
}, {});

const filterTransactions = (data, tipo, fecha) => {
    return data.filter(transaction => {
        const matchTipo = tipo === 'todas' || transaction.tipo === tipo;
        const matchFecha = fecha === 'ultimos_9_meses' ||
            (fecha === 'ultimos_6_meses' && new Date(transaction.fecha) >= new Date(new Date().setMonth(new Date().getMonth() - 6))) ||
            (fecha === 'ultimos_3_meses' && new Date(transaction.fecha) >= new Date(new Date().setMonth(new Date().getMonth() - 3))) ||
            (fecha === 'ultimos_15_dias' && new Date(transaction.fecha) >= new Date(new Date().setDate(new Date().getDate() - 15))) ||
            (fecha === 'ultimos_7_dias' && new Date(transaction.fecha) >= new Date(new Date().setDate(new Date().getDate() - 7)));
        return matchTipo && matchFecha;
    });
};

export default function ReportScreen() {
    const [selectedView, setSelectedView] = useState('chart');
    const [selectedTipo, setSelectedTipo] = useState('todas');
    const [selectedFecha, setSelectedFecha] = useState('ultimos_9_meses');
    const [filteredData, setFilteredData] = useState(transactions);

    const handleFilterChange = (tipo, fecha) => {
        const filtered = filterTransactions(transactions, tipo, fecha);
        setFilteredData(filtered);
    };

    const handleDownload = async () => {
        const data = filteredData.map(transaction => ({
            'Nombre de la transaccion': transaction.nombre,
            'Tipo': transaction.tipo,
            'Fecha': transaction.fecha,
            'Monto': transaction.monto,
        }));

        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Reporte");

        const title = "Reporte Transacciones";
        const currentDate = new Date().toISOString().split('T')[0];
        XLSX.utils.sheet_add_aoa(ws, [[title, '', '', currentDate]], { origin: 'A1' });

        // Agregar los nombres de los campos en la segunda fila
        XLSX.utils.sheet_add_aoa(ws, [['Nombre de la transaccion', 'Tipo', 'Fecha', 'Monto']], { origin: 'A2' });

        const wbout = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });
        const uri = FileSystem.cacheDirectory + 'reporte_transacciones.xlsx';

        await FileSystem.writeAsStringAsync(uri, wbout, { encoding: FileSystem.EncodingType.Base64 });
        await Sharing.shareAsync(uri);
    };

    const data = Object.keys(sumByType(filteredData)).map(key => ({
        name: key,
        population: sumByType(filteredData)[key],
        color: key === 'Gastos' ? '#0098C2' : key === 'Ahorros' ? '#001E4C' : '#004A7F', // colores del PieChart
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
    }));

    return (
        <ScrollView style={styles.container}>
            <View>
                <StatusBar backgroundColor="#009ee3" />
                <HeaderHome />
            </View>
            <Text style={styles.header}>Reportes y Analisis</Text>

            {selectedView === 'chart' ? (
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
            ) : (
                <View style={styles.tableContainer}>
                    {Object.keys(sumByType(filteredData)).map((key, index) => (
                        <View key={index} style={styles.tableRow}>
                            <Text>{key}</Text>
                            <Text>{sumByType(filteredData)[key]}</Text>
                        </View>
                    ))}
                </View>
            )}
            <View style={styles.dataContainer}>
                <View style={styles.pickerContainer}>
                    <Text style={styles.SelectText}>Tipo de transaccion</Text>
                    <Picker
                        selectedValue={selectedTipo}
                        onValueChange={(value) => {
                            setSelectedTipo(value);
                            handleFilterChange(value, selectedFecha);
                        }}
                    >
                        <Picker.Item label="Todas" value="todas" />
                        <Picker.Item label="Gastos" value="Gastos" />
                        <Picker.Item label="Ahorros" value="Ahorros" />
                        <Picker.Item label="Imprevistos" value="Imprevistos" />
                    </Picker>
                </View>
                <View style={styles.pickerContainer}>
                    <Text style={styles.SelectText}>Rango de fechas</Text>
                    <Picker
                        selectedValue={selectedFecha}
                        onValueChange={(value) => {
                            setSelectedFecha(value);
                            handleFilterChange(selectedTipo, value);
                        }}
                    >
                        <Picker.Item label="Ultimos 9 meses" value="ultimos_9_meses" />
                        <Picker.Item label="Ultimos 6 meses" value="ultimos_6_meses" />
                        <Picker.Item label="Ultimos 3 meses" value="ultimos_3_meses" />
                        <Picker.Item label="Ultimos 15 dias" value="ultimos_15_dias" />
                        <Picker.Item label="Ultimos 7 dias" value="ultimos_7_dias" />
                    </Picker>
                </View>

                {/* Boton Descargar */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.buttonAgregar} onPress={handleDownload}>
                        <Text style={styles.buttonText}>Descargar</Text>
                    </TouchableOpacity>
                </View>

                {/* Botones de graficos */}
                <View style={styles.iconContainer}>
                    <View style={[styles.iconWrapper, selectedView === 'chart' && styles.selectedIcon]}
                        backgroundColor={selectedView === 'chart' ? "#DBD9D9" : "#F6F6F6"} >
                        <TouchableOpacity onPress={() => setSelectedView('chart')} style={styles.buttonSelect}>
                            <Icon name="pie-chart" size={40} color={selectedView === 'chart' ? "#0942AA" : "#0942AA"} />
                            <Text style={styles.actionText}>Grafico</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.iconWrapper, selectedView === 'table' && styles.selectedIcon]}
                        backgroundColor={selectedView === 'chart' ? "#F6F6F6" : "#DBD9D9"}>
                        <TouchableOpacity onPress={() => setSelectedView('table')} style={styles.buttonSelect}>
                            <Icon name="table" size={40} color={selectedView === 'table' ? "#0942AA" : "#0942AA"} />
                            <Text style={styles.actionText}>Tabla</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
        backgroundColor: '#fff',
    },
    buttonContainer: {
        alignSelf: 'flex-end',
        marginTop: 10,
        marginBottom: 30,
        color: '#668ACA',
    },
    buttonAgregar: {
        backgroundColor: '#668ACA',
        padding: 10,
        borderRadius: 5,
        marginLeft: 250,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    actionText: {
        color: '#0942AA',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    iconWrapper: {
        width: 150,
        height: 80,
        margin: 15,
        padding: 10,
        borderRadius: 5,
    },
    buttonSelect: {
        alignItems: "center",

    },
    header: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    pickerContainer: {
        // marginBottom: 5,
        borderTopWidth: 1,
        borderTopColor: '#668ACA',
        borderBottomWidth: 1,
        borderBottomColor: '#668ACA',
        paddingTop: 7,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 8,
    },
    button: {
        padding: 5,
        backgroundColor: '#ddd',
        borderRadius: 5,
    },
    chartContainer: {
        marginBottom: 10,
    },
    dataContainer: {
        marginLeft: 0,
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    SelectText: {
        color: '#0942AA',
        textAlign: 'left',
        fontWeight: 'bold',
    },
    grafImage: {
        width: 40,
        height: 40,
    },
    tableContainer: {
        marginTop: 10,
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
});