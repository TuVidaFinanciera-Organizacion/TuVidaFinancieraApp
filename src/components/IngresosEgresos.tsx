import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, StatusBar, ScrollView, Button } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Balance from "./Balance";
import TypeOfOperations from "./TypeOfOperations";
import MyCards from "./MyCards";

export default function MainCard() {
  return (
    <View>
      <LinearGradient
        start={{ x: 1, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={["#009ee3", "transparent"]}
        style={styles.viewGradient}
      />
      <View style={styles.card}>
              <View style={styles.balanceContainer}>
                  <Text style={styles.balance}>$2350.00</Text>
                  <Text style={styles.balanceLabel}>Balance Diciembre</Text>
              </View>

              <View style={styles.summaryContainer}>
                  <View style={styles.summaryItem}>
                      <Image source={require('../../assets/images/expense-icon.png')} style={styles.icon} />
                      <Text style={styles.expenses}>$350.00 Gastos</Text>
                  </View>
                  <View style={styles.summaryItem}>
                      <Image source={require('../../assets/images/income-icon.png')} style={styles.icon} />
                      <Text style={styles.incomes}>$350.00 Ingresos</Text>
                  </View>
              </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 14,
    borderRadius: 10,
    padding: 16,
    elevation: 10,
    marginBottom: 28,
    },
    icon: { width: 20, height: 20, marginRight: 1, },
    balanceContainer: {
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 20,
    },
    balance: {
        fontSize: 48,
        fontWeight: 'bold',
    },
    balanceLabel: {
        fontSize: 16,
        color: 'gray',
    },
    summaryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        width: '100%',
    },
    summaryItem: {
        flexDirection: 'row',
        alignItems: 'center',

    },
  wrapComponentsTypeOfOperations: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
    },
    expenses: {
        fontSize: 16,
        color: 'red',
    },
    incomes: {
        fontSize: 16,
        color: 'green',
    },
  viewGradient: {
    height: 175,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
