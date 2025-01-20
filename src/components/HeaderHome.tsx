import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native';

const HeaderHome: React.FC<{ unreadNotifications: number }> = ({ unreadNotifications }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.wrapItems}>
                <View style={styles.wrapAvatar}>
                    <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
                        <Image
                            source={require("../../assets/images/logo.png")}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.wrapItems}>
                <TouchableOpacity
                    style={styles.wrapIconQuestion}
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('NotificationsScreen')}
                >
                    <Icon name="notifications-outline" size={20} color={unreadNotifications > 0 ? "#ff0000" : "#000"} />
                    {unreadNotifications > 0 && (
                        <View style={styles.unreadBadge}>
                            <Text style={styles.unreadText}>{unreadNotifications}</Text>
                        </View>
                    )}
                </TouchableOpacity>
                <TouchableOpacity style={styles.wrapCVU} activeOpacity={0.8} onPress={() => setModalVisible(true)}>
                    <Icon name="menu-outline" size={20} color="#000" />
                </TouchableOpacity>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalView}>
                            <TouchableOpacity onPress={() => { setModalVisible(false); navigation.navigate('ConfigurationScreen'); }}>
                                <Text style={styles.menuOptionText}>Configuracion</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setModalVisible(false); navigation.navigate('NotificationsScreen'); }}>
                                <Text style={styles.menuOptionText}>Notificaciones</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setModalVisible(false); navigation.navigate('ProfileScreen'); }}>
                                <Text style={styles.menuOptionText}>Perfil</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setModalVisible(false); alert('Cerrar sesion'); }}>
                                <Text style={styles.menuOptionText}>Cerrar sesion</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Text style={styles.closeButton}>Cerrar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 22,
        paddingHorizontal: 14,
        zIndex: 1,
    },
    logo: {
        width: 180,
        height: 30,
    },
    wrapItems: {
        flexDirection: "row",
        alignItems: "center",
    },
    wrapAvatar: {
        backgroundColor: "#fff",
        width: 180,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
        position: "relative",
    },
    wrapIconQuestion: {
        backgroundColor: "#fff",
        paddingHorizontal: 6,
        borderRadius: 4,
        marginRight: 10,
        height: 25,
        justifyContent: "center",
        position: "relative",
    },
    wrapCVU: {
        backgroundColor: "#fff",
        paddingHorizontal: 6,
        borderRadius: 4,
        height: 25,
        justifyContent: "center",
    },
    unreadBadge: {
        position: 'absolute',
        right: -6,
        top: -6,
        backgroundColor: 'red',
        borderRadius: 10,
        padding: 2,
        minWidth: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    unreadText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
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
    },
    closeButton: {
        padding: 10,
        fontSize: 16,
        color: "red",
    },
});

export default HeaderHome;