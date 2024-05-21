import { ScrollView, View, Image, Text, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "./components/CustomButton";
import { Redirect, router } from "expo-router";
import { useState, useEffect } from "react";
import { useGlobalContext } from "../context/GlobalProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";

const App = () => {
  const { isLoading, isLoggedIn, setIsLoggedIn } = useGlobalContext();
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const userLoggedIn = await AsyncStorage.getItem("userData");

        if (userLoggedIn) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };

    checkLoginStatus();
  }, []);
  if (isLoggedIn) return <Redirect href={"/home"} />;

  return (
    <SafeAreaView className="bg-black h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center h-full px-4">
          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Discover Endless Possibilities with{" "}
              <Text className="text-secondary-200">Conserve</Text>
            </Text>
          </View>
          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            Where creativity meets innovation:embark on a journey of limitless
            expression with Conserve
          </Text>
          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-full mt-7"
          />

        </View>
      </ScrollView>
      <StatusBar backgroundColor={"#161622"} style="light" />
      {/* <StatusBar backgroundColor="#161622" style="light" /> */}
    </SafeAreaView>
  );
};

export default App;
