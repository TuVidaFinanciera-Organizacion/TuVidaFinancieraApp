import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";

export default function HeaderHome() {
  return (
    <View style={styles.container}>
      <View style={styles.wrapItems}>
        <View style={styles.wrapAvatar}>
          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          
        </View>
        </View>
      <View style={styles.wrapItems}>
        <TouchableOpacity style={styles.wrapIconQuestion} activeOpacity={0.8}>
          <Icon name="notifications-outline" size={20} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.wrapCVU} activeOpacity={0.8}>
          <Icon name="menu-outline" size={20} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

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
    width: 180, // Ajusta el tamaño de la imagen según sea necesario
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
    position: "relative", // Asegura que los elementos hijos se posicionen correctamente
  },
  containerNumber: {
    position: "absolute",
    width: 16,
    height: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    top: 0,
    right: 0,
  },
  number: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#000",
  },
  name: {
    color: "#000",
    fontWeight: "700",
    letterSpacing: 0.5,
    fontSize: 15,
    marginLeft: 10,
  },
  wrapIconQuestion: {
    backgroundColor: "#fff",
    paddingHorizontal: 6,
    borderRadius: 4,
    marginRight: 10,
    height: 25,
    justifyContent: "center",
  },
  wrapCVU: {
    backgroundColor: "#fff",
    paddingHorizontal: 6,
    borderRadius: 4,
    height: 25,
    justifyContent: "center",
  },
});