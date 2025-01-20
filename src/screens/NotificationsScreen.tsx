import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import HeaderHome from "../components/HeaderHome";
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function NotificationsScreen({ route }) {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        if (route.params?.message) {
            const newNotification = {
                text: route.params.message,
                timestamp: route.params.configuration.timestamp,
            };
            setNotifications([...notifications, newNotification]);
        }
    }, [route.params?.message]);

    const handleDelete = (index) => {
        const newNotifications = [...notifications];
        newNotifications.splice(index, 1);
        setNotifications(newNotifications);
    };

    const handleSave = (index) => {
        const newNotifications = [...notifications];
        console.log("Notificación guardada:", newNotifications[index]);
    };

    return (
        <ScrollView style={styles.container}>
            <HeaderHome />
            <Text style={styles.header}>Notificaciones</Text>
            <View style={styles.section}>
                {notifications.length > 0 ? (
                    notifications.map((notification, index) => (
                        <View key={index} style={styles.notification}>
                            <Text style={styles.notificationText}>{notification.text}</Text>
                            <Text style={styles.timestamp}>{notification.timestamp}</Text>
                            <View style={styles.actions}>
                                <TouchableOpacity onPress={() => handleSave(index)}>
                                    <FontAwesome name="save" size={20} color="#009ee3" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleDelete(index)}>
                                    <FontAwesome name="trash" size={20} color="#ff0000" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))
                ) : (
                    <View>
                        <Text style={styles.noNotifications}>No hay notificaciones</Text>
                    </View>
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
    notification: {
        backgroundColor: '#f9f9f9',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        borderColor: '#ddd',
        borderWidth: 1,
        flexDirection: 'column',
    },
    notificationText: {
        fontSize: 16,
        color: '#444',
    },
    timestamp: {
        fontSize: 14,
        color: '#888',
        textAlign: 'right',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    noNotifications: {
        fontSize: 16,
        color: '#888',
        textAlign: 'center',
        marginTop: 20,
    },
});
