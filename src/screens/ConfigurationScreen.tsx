import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import HeaderHome from '../components/HeaderHome';
import DropDownPicker from 'react-native-dropdown-picker';
import RadioForm from 'react-native-simple-radio-button';
import { useNavigation } from '@react-navigation/native';

export default function ConfigurationScreen({ route }) {
    const navigation = useNavigation();

    const [appNotifications, setAppNotifications] = useState('yes');
    const [statusChangeNotifications, setStatusChangeNotifications] = useState('yes');
    const [expenseApproachNotifications, setExpenseApproachNotifications] = useState('yes');
    const [savingsTipsInterval, setSavingsTipsInterval] = useState('daily');
    const [accessAttemptsNotifications, setAccessAttemptsNotifications] = useState('yes');

    const [openInterval, setOpenInterval] = useState(false);

    const [intervalItems, setIntervalItems] = useState([
        { label: 'Diario', value: 'daily' },
        { label: 'Semanal', value: 'weekly' },
        { label: 'Mensual', value: 'monthly' }
    ]);

    const radio_props = [
        { label: 'Si', value: 'yes' },
        { label: 'No', value: 'no' }
    ];

    const handleSave = () => {
        const configuration = {
            appNotifications,
            statusChangeNotifications,
            expenseApproachNotifications,
            savingsTipsInterval,
            accessAttemptsNotifications,
            timestamp: new Date().toLocaleString(),
        };

        Alert.alert('Configuracion Guardada');
        navigation.navigate('NotificationsScreen', { message: 'Configuracion guardada', configuration });
    };

    return (
        <ScrollView style={styles.container}>
            <HeaderHome />
            <Text style={styles.header}>Configuracion</Text>
            <View style={styles.section}>
                <Text style={styles.label}>Recibir Notificaciones de la App</Text>
                <RadioForm
                    radio_props={radio_props}
                    initial={appNotifications === 'yes' ? 0 : 1}
                    onPress={(value) => setAppNotifications(value)}
                    formHorizontal={true}
                    labelHorizontal={true}
                    buttonColor={'#009ee3'}
                    selectedButtonColor={'#009ee3'}
                    style={styles.radioButtonGroup}
                />
                <Text style={styles.label}>Notificar cuando se realice algun cambio de estado</Text>
                <RadioForm
                    radio_props={radio_props}
                    initial={statusChangeNotifications === 'yes' ? 0 : 1}
                    onPress={(value) => setStatusChangeNotifications(value)}
                    formHorizontal={true}
                    labelHorizontal={true}
                    buttonColor={'#009ee3'}
                    selectedButtonColor={'#009ee3'}
                    style={styles.radioButtonGroup}
                />
                <Text style={styles.label}>Notificar cuando se acerque al gasto previsto</Text>
                <RadioForm
                    radio_props={radio_props}
                    initial={expenseApproachNotifications === 'yes' ? 0 : 1}
                    onPress={(value) => setExpenseApproachNotifications(value)}
                    formHorizontal={true}
                    labelHorizontal={true}
                    buttonColor={'#009ee3'}
                    selectedButtonColor={'#009ee3'}
                    style={styles.radioButtonGroup}
                />
                <Text style={styles.label}>Recibir consejos de ahorro cada</Text>
                <DropDownPicker
                    open={openInterval}
                    value={savingsTipsInterval}
                    items={intervalItems}
                    setOpen={setOpenInterval}
                    setValue={setSavingsTipsInterval}
                    setItems={setIntervalItems}
                    style={styles.dropdown}
                    placeholder="Selecciona tiempo"
                />
                <Text style={styles.label}>Notificar cuando se intente acceder 3 veces</Text>
                <RadioForm
                    radio_props={radio_props}
                    initial={accessAttemptsNotifications === 'yes' ? 0 : 1}
                    onPress={(value) => setAccessAttemptsNotifications(value)}
                    formHorizontal={true}
                    labelHorizontal={true}
                    buttonColor={'#009ee3'}
                    selectedButtonColor={'#009ee3'}
                    style={styles.radioButtonGroup}
                />
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>Guardar</Text>
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
    label: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#444',
    },
    radioButtonGroup: {
        marginVertical: 5,
        paddingHorizontal: 50,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dropdown: {
        marginBottom: 10,
        height: 40,
    },
    saveButton: {
        backgroundColor: '#009ee3',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 10,
        width: 'auto',
        alignSelf: 'center'
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
