import { View, Text, Modal, Button, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";

const ElectricityModal = ({
  electricityShowModal,
  setElectricityShowModal,
}) => {
  const [month, setMonth] = useState("");
  const [amount, setAmount] = useState("");

  const submitElectricityData = async () => {
    const form = {
      month: parseInt(month),
      data: parseInt(amount),
    };
    try {
      const apiUrl = process.env.EXPO_PUBLIC_API_URL;

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
      alert("Electricity record created successfully!");
      setMonth("");
      setAmount("");
      setElectricityShowModal(false);
    } catch (error) {
      alert("Error", error.message);
      console.log(error.message);
    }
  };

  return (
    <Modal visible={electricityShowModal} transparent={true}>
      <View style={styles.modalContainer} className="bg-slate-100">
        <View style={styles.modalView}>
          <Text style={styles.modalText}>
            Please enter your electricity usage for this month or last month!
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter month in number.eg:1 for January,2 for February"
            placeholderTextColor="#888"
            value={month}
            onChangeText={setMonth}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter amount"
            placeholderTextColor="#888"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />
          <View className="flex items-center justify-center">
            <Button onPress={submitElectricityData} title="Submit" />
            <Button
              onPress={() => setElectricityShowModal(false)}
              title="Close"
            />
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
    width: "100%",
    height: "100%",
  },
  modalView: {
    width: "80%",
    maxHeight: "80%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#271D3B",
    padding: 20,
    borderRadius: 10,
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
});

export default ElectricityModal;
