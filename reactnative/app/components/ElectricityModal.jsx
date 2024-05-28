import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  Button,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";

const ElectricityModal = ({
  electricityShowModal,
  setElectricityShowModal,
}) => {
  const [month, setMonth] = useState("");
  const [amount, setAmount] = useState("");

  const submitElectricityData = async () => {
    const monthNumber = parseInt(month);
    const amountNumber = parseInt(amount);

    if (isNaN(monthNumber) || monthNumber < 1 || monthNumber > 12) {
      Alert.alert("Error", "Please enter a valid month between 1 and 12.");
      return;
    }

    if (isNaN(amountNumber) || amountNumber < 0) {
      Alert.alert("Error", "Please enter a valid amount.");
      return;
    }

    const form = {
      month: monthNumber,
      data: amountNumber,
    };

    try {
      //const apiUrl = process.env.EXPO_PUBLIC_API_URL;
      const apiUrl = "https://conserve-trivalleyhack.onrender.com";
      const res = await fetch(`${apiUrl}/api/electricity/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (data.error) {
        Alert.alert("Error", data.error);
        return;
      }
      Alert.alert("Success", "Electricity record created successfully!");
      setMonth("");
      setAmount("");
      setElectricityShowModal(false);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <Modal visible={electricityShowModal} transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>
            Please enter your electricity usage for this month or last month!
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter month in number. eg: 1 for January, 2 for February"
            placeholderTextColor="#888"
            value={month}
            onChangeText={setMonth}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Enter amount"
            placeholderTextColor="#888"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.button}
              onPress={submitElectricityData}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setElectricityShowModal(false)}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.9)",
  },
  modalView: {
    width: "80%",
    padding: 20,
    backgroundColor: "#271D3B",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    color: "#FFFFFF",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    color: "#000",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    padding: 10,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "#271D3B",
    fontSize: 16,
  },
});

export default ElectricityModal;
