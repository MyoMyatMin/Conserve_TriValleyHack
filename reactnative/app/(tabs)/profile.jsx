import { View, Text, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGlobalContext } from "../../context/GlobalProvider";
import { router } from "expo-router";
import CustomButton from "../components/CustomButton";

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
    <View className="items-center">
      <Text>Username : {record.username}</Text>
      <Text>Email : {record.email}</Text>
      <CustomButton
        title={"Logout"}
        handlePress={logout}
        containerStyles={"mt-7"}
      ></CustomButton>
    </View>
  );
};

export default profile;
