import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGlobalContext } from "../../context/GlobalProvider";
import { router } from "expo-router";

const profile = () => {
  const { setIsLoggedIn, setUser } = useGlobalContext();
  const logout = async () => {
    await AsyncStorage.removeItem("userData");
    setIsLoggedIn(false);
    setUser("");
    router.replace("/sign-in");
  };
  return (
    <View className="">
      <TouchableOpacity className="w-full items-center mb-10" onPress={logout}>
        <Text>Profile</Text>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default profile;
