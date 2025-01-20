import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Button, StatusBar, TextInput, TouchableOpacity, Platform, Modal } from 'react-native';
import { Dimensions } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import HeaderHome from "../components/HeaderHome";
import Icon from 'react-native-vector-icons/FontAwesome';
import DropDownPicker from 'react-native-dropdown-picker';

import { MenuProvider } from 'react-native-popup-menu';

const screenWidth = Dimensions.get('window').width;

const transactions = [
    { tipo: 'Ahorros', fecha: '2024-12-08', monto: 681.06, nombre: 'Ahorro para educacion', categoria: 'Ahorro' },
    { tipo: 'Gastos', fecha: '2024-06-06', monto: -460.54, nombre: 'Compra de ropa - H&M', categoria: 'Compras' },
    { tipo: 'Gastos', fecha: '2024-05-13', monto: -80.65, nombre: 'Pago de transporte', categoria: 'Transporte' },
    { tipo: 'Imprevistos', fecha: '2024-12-08', monto: -11.06, nombre: 'Supermercado', categoria: 'Compras' },
    { tipo: 'Imprevistos', fecha: '2024-03-06', monto: -40.04, nombre: 'Compra de ropa - Zara', categoria: 'Compras' },
    { tipo: 'Imprevistos', fecha: '2024-05-13', monto: -370.65, nombre: 'Supermercado', categoria: 'Compras' },
    { tipo: 'Ahorros', fecha: '2024-12-08', monto: 671.9, nombre: 'Compra de libros', categoria: 'Ahorro' },
];

const categorias = ['Cuidado', 'Restaurantes', 'Transportes', 'Compras', 'Bares', 'Servicios'];
const tipos = ['Gastos', 'Ahorros', 'Imprevistos'];

export default function TransaccionScreen() {
    const [filteredTransactions, setFilteredTransactions] = useState(transactions);
    const [showFilter, setShowFilter] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [showInputs, setShowInputs] = useState(false);
    const [newTransaction, setNewTransaction] = useState({ tipo: '', fecha: '', monto: '', nombre: '', categoria: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [modalVisible, setModalVisible] = useState(false); // Añadido modalVisible
    const [open, setOpen] = useState(false); // Estado para controlar el dropdown
    const [items, setItems] = useState(categorias.map((categoria, index) => ({ label: categoria, value: categoria }))); // Convertir categorías a items


    const [openType, setOpenType] = useState(false); // Estado para controlar el dropdown
    const [typeItems, setTypeItems] = useState(tipos.map((tipo, index) => ({ label: tipo, value: tipo }))); // Convertir tipos a items

    const filterTransactions = () => {
        let filtered = transactions;

        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            filtered = filtered.filter(transaction => {
                const transactionDate = new Date(transaction.fecha);
                return transactionDate >= start && transactionDate <= end;
            });
        }

        if (selectedType) {
            filtered = filtered.filter(transaction => transaction.tipo === selectedType);
        }

        if (selectedCategory) {
            filtered = filtered.filter(transaction => transaction.categoria === selectedCategory);
        }

        setFilteredTransactions(filtered);
        setShowFilter(false); // Cerrar el filtro después de aplicar
    };

    const clearFilter = () => {
        setStartDate('');
        setEndDate('');
        setSelectedType('');
        setSelectedCategory('');
        setFilteredTransactions(transactions);
    };

    const handleAddTransaction = () => {
        const updatedTransaction = { ...newTransaction, monto: parseFloat(newTransaction.monto) };
        if (isEditing && editIndex !== null) {
            const updatedTransactions = filteredTransactions.map((transaction, index) =>
                index === editIndex ? updatedTransaction : transaction
            );
            setFilteredTransactions(updatedTransactions);
            setIsEditing(false);
            setEditIndex(null);
        } else {
            setFilteredTransactions([...filteredTransactions, updatedTransaction]);
        }
        setNewTransaction({ tipo: '', fecha: '', monto: '', nombre: '', categoria: '' });
        setShowInputs(false);
    };

    const handleEditTransaction = (index: number) => {
        const transactionToEdit = filteredTransactions[index];
        setNewTransaction({
            ...transactionToEdit,
            monto: transactionToEdit.monto.toString(), // Convertir monto a string para el TextInput
        });
        setIsEditing(true);
        setEditIndex(index);
        setShowInputs(true);
    };

    const handleDeleteTransaction = (index: number) => {
        const updatedTransactions = filteredTransactions.filter((_, i) => i !== index);
        setFilteredTransactions(updatedTransactions);
    };

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || new Date();
        setShowDatePicker(Platform.OS === 'ios');
        setNewTransaction({ ...newTransaction, fecha: currentDate.toISOString().split('T')[0] });
    };

    const calculateTotal = (transactions, condition) => {
        const total = transactions
            .filter(condition)
            .reduce((acc, t) => acc + (parseFloat(t.monto) || 0), 0); // Asegurarse de que el monto sea un número
        return total ? total.toFixed(2) : '0.00';
    };

    return (
        <ScrollView style={styles.container}>
            <StatusBar backgroundColor="#009ee3" />
            <HeaderHome />

            <View style={styles.balanceDetails}>
                <View style={styles.totales}>
                    <Text style={styles.income}>TOTAL INGRESOS: ${calculateTotal(filteredTransactions, t => t.monto > 0)}</Text>
                    <Text style={styles.expenses}>TOTAL GASTOS: ${calculateTotal(filteredTransactions, t => t.monto < 0)}</Text>
                </View>
                <View style={styles.filtro}>
                    <TouchableOpacity style={styles.wrapCVU} activeOpacity={0.8} onPress={() => setShowFilter(true)}>
                        <Icon name="filter" size={20} color="#0942AA" />
                    </TouchableOpacity>
                </View>
            </View>

            <Modal animationType="slide" transparent={true} visible={showFilter} onRequestClose={() => setShowFilter(false)}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <View style={styles.buttonDatePicker}>
                            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                                <TextInput style={styles.pickerText} placeholder="			Fecha de inicio			" value={startDate} editable={false} />
                            </TouchableOpacity>

                            {showDatePicker && (
                                <DateTimePicker value={new Date(startDate)} mode="date" display="default" onChange={(event, date) => {
                                    setShowDatePicker(false);
                                    if (date) { setStartDate(date.toISOString().split('T')[0]); }
                                }} />
                            )}
                        </View>
                        <View style={styles.buttonDatePicker}>
                            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                                <TextInput style={styles.pickerText} placeholder="			Fecha de fin			" value={endDate} editable={false} />
                            </TouchableOpacity>
                        </View>
                        {showDatePicker && (
                            <DateTimePicker value={new Date(endDate)} mode="date" display="default" onChange={(event, date) => {
                                setShowDatePicker(false);
                                if (date) { setEndDate(date.toISOString().split('T')[0]); }
                            }} />
                        )}

                        <DropDownPicker open={openType} value={selectedType} items={typeItems}
                            setOpen={setOpenType} setValue={setSelectedType} setItems={setTypeItems}
                            placeholder="Seleccionar tipo" style={styles.menuOptionText} />


                        <DropDownPicker open={open} value={selectedCategory} items={items}
                            setOpen={setOpen} setValue={setSelectedCategory} setItems={setItems}
                            placeholder="Seleccionar categoria" style={styles.input} />


                        <View style={styles.buttonContainerFilter}>
                            <TouchableOpacity style={styles.buttonAgregar} onPress={filterTransactions}>
                                <Text style={styles.buttonText}>		Aplicar Filtro		</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.buttonContainerFilter}>
                            <TouchableOpacity style={styles.buttonAgregar} onPress={clearFilter}>
                                <Text style={styles.buttonText}>		Limpiar Filtro		</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.buttonContainerFilter}>
                            <TouchableOpacity style={styles.buttonAgregar} onPress={() => setShowFilter(false)} >
                                <Text style={styles.buttonText}>			Cerrar				</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </Modal>

            {filteredTransactions.map((transaction, index) => (
                <TouchableOpacity key={index} onPress={() => handleEditTransaction(index)}>
                    <View style={styles.transaction}>
                        <View style={styles.nameContainer}>
                            <View style={styles.containerCategoryIcon}>
                                <Text style={styles.initial}>{transaction.nombre.charAt(0)}</Text>
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.transactionName}>{transaction.nombre}</Text>
                                <Text style={styles.transactionCategory}>{transaction.categoria}</Text>
                            </View>
                        </View>

                        <View style={styles.amountDateContainer}>
                            <Text style={[styles.transactionAmount, { color: transaction.monto > 0 ? 'green' : 'red' }]}>
                                {parseFloat(transaction.monto).toFixed(2)}
                            </Text>
                            <Text style={styles.transactionDate}>{transaction.fecha}</Text>
                        </View>
                        <TouchableOpacity onPress={(e) => { e.stopPropagation(); handleDeleteTransaction(index); }}>
                            <Icon name="trash" size={24} color="#0942AA" />
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            ))}

			//Editar
            {showInputs && (
                <View style={styles.inputsContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nombre de la Transaccion"
                        value={newTransaction.nombre}
                        onChangeText={text => setNewTransaction({ ...newTransaction, nombre: text })}
                    />
                    <View style={styles.buttonDatePicker}>
                        <Picker
                            selectedValue={newTransaction.tipo}
                            style={styles.pickerText}
                            onValueChange={(itemValue) => setNewTransaction({ ...newTransaction, tipo: itemValue })}
                        >
                            <Picker.Item label="Seleccionar tipo" value="" style={styles.pickerText} />
                            {tipos.map((tipo, index) => (
                                <Picker.Item key={index} label={tipo} value={tipo} />
                            ))}
                        </Picker>
                    </View>
                    <TouchableOpacity onPress={() => setShowDatePicker(true)}>


                        <TextInput
                            style={styles.input}
                            placeholder="Fecha"
                            value={newTransaction.fecha}
                            editable={false}
                        />
                    </TouchableOpacity>
                    {showDatePicker && (
                        <DateTimePicker
                            value={new Date(newTransaction.fecha)}
                            mode="date"
                            display="default"
                            onChange={handleDateChange}
                        />
                    )}
                    <TextInput
                        style={styles.input}
                        placeholder="Monto"
                        value={newTransaction.monto}
                        onChangeText={text => setNewTransaction({ ...newTransaction, monto: text })}
                        keyboardType="numeric"
                    />
                    <View style={styles.buttonDatePicker}>
                        <Picker
                            selectedValue={newTransaction.categoria}
                            style={styles.pickerText}
                            onValueChange={(itemValue) => setNewTransaction({ ...newTransaction, categoria: itemValue })}
                        >
                            <Picker.Item label="Seleccionar categoria" value="" style={styles.pickerText} />
                            {categorias.map((categoria, index) => (
                                <Picker.Item key={index} label={categoria} value={categoria} />
                            ))}
                        </Picker>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.buttonAgregar} onPress={handleAddTransaction}>
                            <Text style={styles.buttonText}>Guardar Transaccion</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttonAgregar} onPress={() => setShowInputs(true)}>
                    <Text style={styles.buttonText}>Agregar Transaccion</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 16,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente
    },
    containerCategoryIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 0.6,
        borderColor: "#D9D9D9",
        marginRight: 14,
        backgroundColor: '#D9D9D9',
    },
    initial: {
        color: '#000',
        fontSize: 24,
        fontWeight: 'bold',
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
        //color: '#fff',
    },
    picker: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        marginVertical: 4,
    },
    inputsContainer: {
        padding: 8,
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
    pickerText: {
        color: '#000',
        //textAlign: 'left',
        fontSize: 14,

    },
    textContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        flex: 1,
    },
    buttonContainerFilter: {
        alignSelf: 'flex-start',
        marginTop: 10,
        width: "100%",
        color: '#0942AA',
    },
    buttonDatePicker: {
        alignSelf: 'flex-start',
        marginTop: 5,
        marginBottom: 10,
        width: "100%",
        borderWidth: 1,
        marginVertical: 4,
        borderColor: "#D9D9D9",
        borderRadius: 5,
        textColor: '#000',

    },
    balanceDetails: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: 15,
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
    income: {
        color: 'green', //verde
    },
    expenses: {
        color: 'red', //rojo
    },
    total: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginTop: 10,
    },
    transaction: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    transactionName: {
        fontSize: 16,
        flex: 1,
        color: '#0942AA',
        fontWeight: 'bold',
    },
    transactionCategory: {
        fontSize: 14,
        color: '#666',
    },
    amountDateContainer: {
        flexDirection: 'column',
    },
    nameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 200,
    },
    transactionAmount: {
        fontSize: 16,
        flex: 1,
        textAlign: 'right',
        fontWeight: 'bold',
    },
    transactionDate: {
        fontSize: 14,
        flex: 1,
        color: '#666',
        textAlign: 'right',
        marginTop: 2,
    },
    inputsContainer: {
        padding: 8,
    },

    button: {
        width: '100%',
        marginVertical: 5,
    },
    filterButton: {
        backgroundColor: '#0942AA',
        padding: 10,
        borderRadius: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalView: {
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    menuOptionText: {
        padding: 10,
        fontSize: 16,
        marginBottom: 10,
    },
    wrapCVU: {
        backgroundColor: "#D9D9D9",
        paddingHorizontal: 6,
        borderRadius: 4,
        height: 25,
        justifyContent: "center",
        borderColor: "#D9D9D9",
        border: 2,
    },
    totales: {
        flexDirection: 'column',
        width: 300,

    },

});