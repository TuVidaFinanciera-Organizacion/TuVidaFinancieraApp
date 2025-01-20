import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity, TextInput } from 'react-native';
import HeaderHome from "../components/HeaderHome";
import { Picker } from '@react-native-picker/picker';
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const screenWidth = Dimensions.get('window').width;

const initialExpensesData = [
    {
        category: 'Servicios/Suscripciones',
        amount: 908.00,
        icon: 'file-text-o',
        subcategories: [
            { name: 'Luz', amount: 33.00 },
            { name: 'Renta del piso', amount: 830.00 },
            { name: 'Internet, Cable y Movil', amount: 45.00 },
            { name: 'Streaming', amount: 45.00 },
        ]
    },
    { category: 'Restaurantes', amount: 305.00, icon: 'cutlery', subcategories: [] },
    { category: 'Transportes', amount: 25.00, icon: 'bus', subcategories: [] },
    { category: 'Compras', amount: 400.00, icon: 'shopping-cart', subcategories: [] },
    { category: 'Cuidado', amount: 25.00, icon: 'heart', subcategories: [] }
];

export default function ExpensesPlanScreen() {
    const [expensesData, setExpensesData] = useState(initialExpensesData);
    const [totalAmount, setTotalAmount] = useState(() => initialExpensesData.reduce((total, expense) => total + expense.amount, 0));
    const [showSubcategories, setShowSubcategories] = useState({});
    const [newService, setNewService] = useState('');
    const [newAmount, setNewAmount] = useState('');
    const [addingService, setAddingService] = useState(null);
    const [newCategory, setNewCategory] = useState('');
    const [newCategoryIcon, setNewCategoryIcon] = useState('file-text-o');
    const [newCategoryAmount, setNewCategoryAmount] = useState('');
    const [showNewCategoryForm, setShowNewCategoryForm] = useState(false);

    const toggleSubcategories = (category) => {
        setShowSubcategories((prevState) => ({
            ...prevState,
            [category]: !prevState[category],
        }));
    };

    const updateTotalAmount = (updatedExpenses) => {
        const newTotal = updatedExpenses.reduce((total, expense) => total + expense.amount, 0);
        setTotalAmount(newTotal);
    };

    const handleAddService = (category) => {
        const updatedExpenses = expensesData.map(expense => {
            if (expense.category === category) {
                const newSubcategory = { name: newService, amount: parseFloat(newAmount) };
                return {
                    ...expense,
                    subcategories: [...expense.subcategories, newSubcategory],
                    amount: expense.amount + newSubcategory.amount,
                };
            }
            return expense;
        });

        setExpensesData(updatedExpenses);
        updateTotalAmount(updatedExpenses);
        setNewService('');
        setNewAmount('');
        setAddingService(null);
    };

    const handleDeleteSubcategory = (category, subcategoryName) => {
        const updatedExpenses = expensesData.map(expense => {
            if (expense.category === category) {
                const subcategoryToDelete = expense.subcategories.find(sub => sub.name === subcategoryName);
                const filteredSubcategories = expense.subcategories.filter(sub => sub.name !== subcategoryName);
                const newAmount = expense.amount - subcategoryToDelete.amount;
                return {
                    ...expense,
                    subcategories: filteredSubcategories,
                    amount: newAmount,
                };
            }
            return expense;
        });

        setExpensesData(updatedExpenses);
        updateTotalAmount(updatedExpenses);
    };

    const handleDeleteCategory = (category) => {
        const categoryToDelete = expensesData.find(expense => expense.category === category);
        const updatedExpenses = expensesData.filter(expense => expense.category !== category);
        setExpensesData(updatedExpenses);
        setTotalAmount(prevTotal => prevTotal - categoryToDelete.amount);
    };

    const handleAddCategory = () => {
        const newCategoryData = {
            category: newCategory,
            amount: parseFloat(newCategoryAmount),
            icon: newCategoryIcon,
            subcategories: [],
        };
        const updatedExpenses = [...expensesData, newCategoryData];
        setExpensesData(updatedExpenses);
        updateTotalAmount(updatedExpenses);
        setNewCategory('');
        setNewCategoryIcon('file-text-o');
        setNewCategoryAmount('');
        setShowNewCategoryForm(false);
    };

    return (
        <ScrollView style={styles.container}>
            <View>
                <StatusBar backgroundColor="#009ee3" />
                <HeaderHome />
            </View>
            <Text style={styles.header}>Planificacion de Gastos</Text>
            <View style={styles.section}>
                <Text style={styles.sectionHeader}>Distribucion de Gastos Mensuales por Categorias</Text>
                <View style={styles.totalAmountContainer}>
                    <Text style={styles.totalAmountLabel}>Monto Total: </Text>
                    <TextInput
                        style={styles.totalAmount}
                        value={`$${totalAmount.toFixed(2)}`}
                        editable={false}
                    />
                </View>
                {expensesData.map((expense, index) => (
                    <View key={index} style={styles.categoryContainer}>
                        <TouchableOpacity onPress={() => toggleSubcategories(expense.category)}>
                            <View style={styles.categoryRow}>
                                <View style={styles.iconContainer}>
                                    <Icon name={expense.icon} size={20} color="#fff" style={styles.icon} />
                                </View>
                                <Text style={styles.category}>{expense.category}</Text>
                                <Text style={styles.amount}>${expense.amount.toFixed(2)}</Text>
                                <TouchableOpacity onPress={() => handleDeleteCategory(expense.category)}>
                                    <Icon name="trash" size={20} color="#ff0000" style={styles.deleteIcon} />
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                        {showSubcategories[expense.category] && (
                            <>
                                {expense.subcategories.map((subcategory, subindex) => (
                                    <View key={subindex} style={styles.subcategoryRow}>
                                        <Text style={styles.subcategory}>- {subcategory.name}</Text>
                                        <Text style={styles.amount}>${subcategory.amount.toFixed(2)}</Text>
                                        <TouchableOpacity onPress={() => handleDeleteSubcategory(expense.category, subcategory.name)}>
                                            <Icon name="trash" size={20} color="#ff0000" style={styles.deleteIcon} />
                                        </TouchableOpacity>
                                    </View>
                                ))}
                                <TouchableOpacity onPress={() => setAddingService(expense.category)} style={styles.addServiceButton}>
                                    <Text style={styles.addServiceButtonText}>Agregar</Text>
                                </TouchableOpacity>
                                {addingService === expense.category && (
                                    <View style={styles.formContainer}>
                                        <TextInput
                                            placeholder="Nombre del servicio"
                                            value={newService}
                                            onChangeText={setNewService}
                                            style={styles.input}
                                        />
                                        <TextInput
                                            placeholder="Monto en euros"
                                            value={newAmount}
                                            onChangeText={setNewAmount}
                                            keyboardType="numeric"
                                            style={styles.input}
                                        />
                                        <TouchableOpacity onPress={() => handleAddService(expense.category)} style={styles.submitButton}>
                                            <Text style={styles.submitButtonText}>Guardar</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </>
                        )}
                    </View>
                ))}
                <TouchableOpacity onPress={() => setShowNewCategoryForm(true)} style={styles.addButton}>
                    <Text style={styles.addButtonText}>Agregar Categoria</Text>
                </TouchableOpacity>
                {showNewCategoryForm && (
                    <ScrollView style={styles.formContainer}>
                        <TextInput
                            placeholder="Nombre de la categoria"
                            value={newCategory}
                            onChangeText={setNewCategory}
                            style={styles.input}
                        />
                        <Picker
                            selectedValue={newCategoryIcon}
                            style={styles.picker}
                            onValueChange={(itemValue) => setNewCategoryIcon(itemValue)}>
                            <Picker.Item label="Documentos" value="file-text-o" />
                            <Picker.Item label="Comida" value="cutlery" />
                            <Picker.Item label="Transporte" value="bus" />
                            <Picker.Item label="Compras" value="shopping-cart" />
                            <Picker.Item label="Cuidado" value="heart" />
                        </Picker>
                        <TextInput
                            placeholder="Monto"
                            value={newCategoryAmount}
                            onChangeText={setNewCategoryAmount}
                            keyboardType="numeric"
                            style={styles.input}
                        />
                        <TouchableOpacity onPress={handleAddCategory} style={styles.submitButton}>
                            <Text style={styles.submitButtonText}>Guardar</Text>
                        </TouchableOpacity>
                    </ScrollView>
                )}
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
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 5,
        textAlign: 'center',
        color: '#009ee3',
    },
    section: {
        marginVertical: 10,
        paddingHorizontal: 5,
    },
    sectionHeader: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center',
        color: '#444',
    },
    totalAmountContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 5,
    },
    totalAmountLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#ff0404',
    },
    totalAmount: {
        fontSize: 14,
        color: '#ff0404',
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        padding: 5,
        marginLeft: 5,
        textAlign: 'right',
    },
    categoryContainer: {
        marginBottom: 10,
        padding: 8,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
    categoryRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    subcategoryRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: 20,
    },
    category: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    subcategory: {
        fontSize: 14,
        color: '#777',
    },
    amount: {
        fontSize: 14,
        color: '#333',
    },
    iconContainer: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#0942aa',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addServiceButton: {
        backgroundColor: '#009ee3',
        padding: 8,
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 10,
        width: 'auto',
        alignSelf: 'center'
    },
    addServiceButtonText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold'
    },
    formContainer: {
        marginTop: 10,
        paddingHorizontal: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 6,
        borderRadius: 5,
        marginBottom: 6,
    },
    submitButton: {
        backgroundColor: '#009ee3',
        padding: 6,
        borderRadius: 5,
        alignItems: 'center',
        width: 'auto',
        alignSelf: 'center'
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    deleteIcon: {
        marginLeft: 5,
        color: '#ccc',
    },
    addButton: {
        backgroundColor: '#009ee3',
        padding: 5,
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 10,
        width: 'auto',
        alignSelf: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    picker: {
        marginBottom: 5,
    },
});

