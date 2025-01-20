import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, StatusBar, TextInput, TouchableOpacity, Image, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import HeaderHome from "../components/HeaderHome";
import Icon from 'react-native-vector-icons/Ionicons';

const initialGoals = [
    { name: 'Vacaciones', targetAmount: '6200.00', savedAmount: '1250.00', targetDate: '15-Dic-2024', image: require('../../assets/images/vacaciones_icon.png') },
    { name: 'Coche nuevo', targetAmount: '3200.00', savedAmount: '150.00', targetDate: '15-Jul-2025', image: require('../../assets/images/car_ico.png') },
];

const images = {
    car: require('../../assets/images/car_ico.png'),
    vacaciones: require('../../assets/images/vacaciones_icon.png'),
    fondo: require('../../assets/images/Hucha_ico.png'),
};

export default function ObjetivosAhorroScreen() {
    const [goals, setGoals] = useState(initialGoals);
    const [showInputs, setShowInputs] = useState(false);
    const [newGoal, setNewGoal] = useState({ name: '', targetAmount: '', savedAmount: '', targetDate: '', image: null });
    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleAddGoal = () => {
        if (isEditing && editIndex !== null) {
            const updatedGoals = goals.map((goal, index) =>
                index === editIndex ? newGoal : goal
            );
            setGoals(updatedGoals);
            setIsEditing(false);
            setEditIndex(null);
        } else {
            setGoals([...goals, newGoal]);
        }
        setNewGoal({ name: '', targetAmount: '', savedAmount: '', targetDate: '', image: null });
        setShowInputs(false);
    };

    const handleEditGoal = (index: number) => {
        setNewGoal(goals[index]);
        setIsEditing(true);
        setEditIndex(index);
        setShowInputs(true);
    };

    const handleDeleteGoal = (index: number) => {
        const updatedGoals = goals.filter((_, i) => i !== index);
        setGoals(updatedGoals);
    };

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || new Date();
        setShowDatePicker(Platform.OS === 'ios');
        setNewGoal({ ...newGoal, targetDate: currentDate.toLocaleDateString('es-ES') });
    };

    const handleImageSelect = (imageKey) => {
        setNewGoal({ ...newGoal, image: images[imageKey] });
    };

    return (
        <ScrollView style={styles.container}>
            <View>
                <StatusBar backgroundColor="#009ee3" />
                <HeaderHome />
            </View>
           
            <Text style={styles.subtitle}>Objetivos de Ahorro</Text>
            <Text style={styles.total}>Total Ahorrado: ${goals.reduce((acc, goal) => acc + parseFloat(goal.savedAmount.replace(',', '.').replace('', '').trim()), 0).toFixed(2)} </Text>
            {goals.map((goal, index) => (
                <View style={styles.GoalCardContainer} key={index}>
                    <TouchableOpacity onPress={() => handleEditGoal(index)}>
                        <View style={styles.goal}>
                            <Image source={goal.image} style={styles.goalImage} />
                            <View style={styles.nameContainer}>
                                <Text style={styles.goalName}>{goal.name}</Text>
                                <Text style={styles.goalDate}>Fecha objetivo: {goal.targetDate}</Text>
                            </View>
                            <TouchableOpacity onPress={(e) => {
                                e.stopPropagation(); // Evita que el evento se propague al TouchableOpacity principal
                                handleDeleteGoal(index); }}>
                                <Icon name="trash-outline" size={24} color="#0942AA" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.progressBarContainer}>
                            <View style={[styles.progressBar, { width: `${(parseFloat(goal.savedAmount) / parseFloat(goal.targetAmount)) * 100}%` }]} />
                        </View>
                        <View style={styles.amountContainer}>
                            <Text style={styles.goalAmount}>Ahorrado: ${goal.savedAmount || '0.00'}</Text>
                            <Text style={styles.goalAmountTarget}>Objetivo: ${goal.targetAmount || '0.00'}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            ))}
            {showInputs && (
                <View style={styles.inputsContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nombre del Objetivo"
                        value={newGoal.name}
                        onChangeText={text => setNewGoal({ ...newGoal, name: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Monto Objetivo"
                        value={newGoal.targetAmount}
                        onChangeText={text => setNewGoal({ ...newGoal, targetAmount: text })}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Monto Ahorrado"
                        value={newGoal.savedAmount}
                        onChangeText={text => setNewGoal({ ...newGoal, savedAmount: text })}
                        keyboardType="numeric"
                    />
                    <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                        <TextInput
                            style={styles.input}
                            placeholder="Fecha Objetivo"
                            value={newGoal.targetDate}
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
                    <View style={styles.imageSelectorContainer}>
                        <Text style={styles.imageSelectorLabel}>Seleccionar Imagen:</Text>
                        <View style={styles.imageOptions}>
                            {Object.keys(images).map((key) => (
                                <TouchableOpacity key={key} onPress={() => handleImageSelect(key)}>
                                    <Image source={images[key]} style={[styles.imageOption, newGoal.image === images[key] && styles.selectedImage]} />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                  
					<View style={styles.buttonContainer}>
						<TouchableOpacity style={styles.buttonAgregar} onPress={handleAddGoal}>
							<Text style={styles.buttonText}>                                  Guardar Objetivo                                  </Text>
						</TouchableOpacity>
					</View>
                </View>
            )}
           
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttonAgregar} onPress={() => setShowInputs(true)}>
                    <Text style={styles.buttonText}>Agregar Objetivo</Text>
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
        color: '#668ACA',
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
    progressBarContainer: {
        height: 10,
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
        overflow: 'hidden',
        marginVertical: 8,
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#0942AA',
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
    total: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'right',
        color: '#000',
        marginVertical: 8,
    },
    GoalCardContainer: {
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
    goal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    goalImage: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    nameContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        flex: 1,
    },
	imageOptions: {
        flexDirection: 'row',
		width: "400",

    },
	imageOption: {
        width: 50,
        height: 50,
        margin: 10,
		
    },
    goalName: {
        fontSize: 16,
        color: '#0942AA',
        fontWeight: 'bold',
    },
    goalDate: {
        fontSize: 14,
        color: '#666',
    },
    amountContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 8,
    },
    goalAmount: {
        fontSize: 14,
        color: '#0942AA',
        fontWeight: 'bold',
    },
    goalAmountTarget: {
        fontSize: 14,
        color: '#666',
        fontWeight: 'bold',
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