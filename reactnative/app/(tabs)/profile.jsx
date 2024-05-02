import { View, Text, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGlobalContext } from "../../context/GlobalProvider";
import { router } from "expo-router";
import CustomButton from "../components/CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";

const profile = () => {
  const { setIsLoggedIn, setUser } = useGlobalContext();
  const [record, setRecord] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = process.env.EXPO_PUBLIC_API_URL;
      try {
        const res = await fetch(`${apiUrl}/api/users`);
        const data = await res.json();
        setRecord(data);
      } catch (error) {
        Alert("Error", error);
      }
    };
    fetchData();
  }, []);
  const logout = async () => {
    await AsyncStorage.removeItem("userData");
    setIsLoggedIn(false);
    setUser("");
    router.replace("/sign-in");
  };
  return (
    <SafeAreaView className="items-center h-full bg-primary">
      <Text className="text-2xl text-secondary">Username : {record.username}</Text>
      <Text className="text-2xl text-secondary">Email : {record.email}</Text>
      <CustomButton
        title={"Logout"}
        handlePress={logout}
        containerStyles={"mt-7"}
      ></CustomButton>
    </SafeAreaView>
  );
};

export default profile;
