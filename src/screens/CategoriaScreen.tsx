import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, StatusBar, TextInput, TouchableOpacity, Platform } from 'react-native';
import { Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import DateTimePicker from '@react-native-community/datetimepicker';
import HeaderHome from "../components/HeaderHome";
import Icon from 'react-native-vector-icons/Ionicons';

const screenWidth = Dimensions.get('window').width;

const initialData = {
    labels: ['Ener', 'Feb', 'Marz', 'Abr', 'May', 'Jun', 'Jul', 'Ago'],
    datasets: [
        {
            data: [80, 70, 60, 50, 40, 30, 20, 10],
        },
    ],
};

const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    color: (opacity = 1) => `rgba(9, 66, 170, ${opacity})`,
    strokeWidth: 2,
};

const initialCategories = [
    { icon: 'cut-outline', name: 'Cuidado', amount: '-25,00 ', date: '8/Nov/24' },
    { icon: 'restaurant-outline', name: 'Restaurantes', amount: '-305,00 ', date: '14/Nov/24' },
    { icon: 'bus-outline', name: 'Transportes', amount: '-25,00 ', date: '8/Nov/24' },
    { icon: 'cart-outline', name: 'Compras', amount: '-25,00 ', date: '14/Nov/24' },
    { icon: 'wine-outline', name: 'Bares', amount: '-25,00 ', date: '14/Nov/24' },
    { icon: 'home-outline', name: 'Servicios', amount: '-908,00 ', date: '14/Nov/24' },
];

const icons = [
    'cut-outline', 'restaurant-outline', 'bus-outline', 'cart-outline', 'wine-outline', 'home-outline', 'bulb-outline', 'wifi-outline'
];

export default function CategoriaScreen() {
    const [categories, setCategories] = useState(initialCategories);
    const [showInputs, setShowInputs] = useState(false);
    const [newCategory, setNewCategory] = useState({ icon: '', name: '', amount: '', date: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [data, setData] = useState(initialData);
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleAddCategory = () => {
        if (isEditing && editIndex !== null) {
            const updatedCategories = categories.map((category, index) =>
                index === editIndex ? newCategory : category
            );
            setCategories(updatedCategories);
            setIsEditing(false);
            setEditIndex(null);
        } else {
            setCategories([...categories, newCategory]);
        }
        setNewCategory({ icon: '', name: '', amount: '', date: '' });
        setShowInputs(false);
        updateChartData([...categories, newCategory]);
    };

    const handleEditCategory = (index: number) => {
        setNewCategory(categories[index]);
        setIsEditing(true);
        setEditIndex(index);
        setShowInputs(true);
    };

    const handleDeleteCategory = (index: number) => {
        const updatedCategories = categories.filter((_, i) => i !== index);
        setCategories(updatedCategories);
        updateChartData(updatedCategories);
    };

    const updateChartData = (categories: any) => {
        const newData = {
            ...data,
            datasets: [
                {
                    data: categories.map((category: any) => parseFloat(category.amount.replace(',', '.').replace('', '').trim())),
                },
            ],
        };
        setData(newData);
    };

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || new Date();
        setShowDatePicker(Platform.OS === 'ios');
        setNewCategory({ ...newCategory, date: currentDate.toLocaleDateString('es-ES') });
    };

    const handleIconSelect = (icon) => {
        setNewCategory({ ...newCategory, icon });
    };

    return (
        <ScrollView style={styles.container}>
            <View>
                <StatusBar backgroundColor="#009ee3" />
                <HeaderHome />
            </View>

            <Text style={styles.subtitle}>Categorias</Text>
            <Text style={styles.chartTitle}>Todas las Categorias</Text>
            <BarChart
                data={data}
                width={screenWidth - 16}
                height={220}
                chartConfig={chartConfig}
                style={styles.chart}
            />
            <Text style={styles.total}>Total: {categories.reduce((acc, category) => acc + parseFloat(category.amount.replace(',', '.').replace('', '').trim()), 0).toFixed(2)} </Text>
            {categories.map((category, index) => (
                <TouchableOpacity key={index} onPress={() => handleEditCategory(index)}>

                    <View style={styles.category}>
                        <View style={styles.nameContainer}>
                            <View style={styles.containerCategoryIcon}>
                                <Icon name={category.icon} size={24} color="#fff" />
                            </View>
                            <Text style={styles.categoryName}>{category.name}</Text>
                        </View>
                        <View style={styles.amountDateContainer}>
                            <Text style={styles.categoryAmount}>{category.amount || '0.00'}</Text>
                            <Text style={styles.categoryDate}>{category.date || 'Sin fecha'}</Text>
                        </View>

                        <TouchableOpacity onPress={(e) => {
                            e.stopPropagation(); // Evita que el evento se propague al TouchableOpacity principal
                            handleDeleteCategory(index);
                        }}>
                            <Icon name="trash-outline" size={24} color="#0942AA" />
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            ))}
            {showInputs && (
                <View style={styles.inputsContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nombre de la Categoria"
                        value={newCategory.name}
                        onChangeText={text => setNewCategory({ ...newCategory, name: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Monto"
                        value={newCategory.amount}
                        onChangeText={text => setNewCategory({ ...newCategory, amount: text })}
                        keyboardType="numeric"
                    />
                    <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                        <TextInput
                            style={styles.input}
                            placeholder="Fecha"
                            value={newCategory.date}
                            editable={false}
                        />
                    </TouchableOpacity>
                    {showDatePicker && (
                        <DateTimePicker
                            value={new Date()}
                            mode="date"
                            display="default"
                            onChange={handleDateChange}
                        />
                    )}
                    <View style={styles.iconSelectorContainer}>
                        <Text style={styles.iconSelectorLabel}>Seleccionar Icono:</Text>
                        <View style={styles.iconOptions}>
                            {icons.map((icon) => (
                                <TouchableOpacity key={icon} onPress={() => handleIconSelect(icon)}>
                                    <Icon name={icon} size={24} color={newCategory.icon === icon ? "#0942AA" : "#000"} style={styles.iconOption} />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                    
					<View style={styles.buttonContainer}>
						<TouchableOpacity style={styles.buttonAgregar} onPress={handleAddCategory}>
							<Text style={styles.buttonText}>                                  Guardar Categoria                                  </Text>
						</TouchableOpacity>
					</View>
                </View>
            )}

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttonAgregar} onPress={() => setShowInputs(true)}>
                    <Text style={styles.buttonText}>Agregar Categoria</Text>
                </TouchableOpacity>
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
        alignSelf: 'flex-start',
        marginTop: 10,
        marginBottom: 30,
        color: '#0942AA',
    },
    buttonAgregar: {
        backgroundColor: '#668ACA',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    containerCategoryIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 0.6,
        borderColor: "#0942AA",
        marginRight: 14,
        backgroundColor: '#0942AA',
    },
    CategoryIcon: {
        fontSize: 20,
        fontWeight: "500",
        textTransform: "uppercase",
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 16,
    },
    subtitle: {
        fontSize: 18,
        textAlign: 'left',
        marginVertical: 8,
    },
    chartTitle: {
        fontFamily: 'System',
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 8,
    },
    chart: {
        marginVertical: 8,
    },
    total: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'right',
        color: '#000',
        marginVertical: 8,
    },
    category: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    categoryName: {
        fontSize: 16,
        flex: 1,
        color: '#000', // Asegúrate de que el color sea negro
    },
    amountDateContainer: {
        flexDirection: 'column',

    },
	iconOptions: {
        flexDirection: 'row',
		width: "400",

    },
	iconOption: {
        marginRight: 10,
		margin: 5,
		width: "30",

    },
    nameContainer: {
        flexDirection: 'row', // Cambiado a 'row' para alinear horizontalmente
        alignItems: 'center', // Alinea verticalmente al centro
        width: "200",
    },
    categoryAmount: {
        fontSize: 16,
        flex: 1,
        textAlign: 'right',
        fontWeight: 'bold',
        color: '#000',
    },
    categoryDate: {
        fontSize: 14,
        flex: 1,
        color: '#666',
        textAlign: 'right',
        marginTop: 2,
    },
    inputsContainer: {
        padding: 8,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 8,
        marginVertical: 4,
    },
});