import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGlobalContext } from "../../context/GlobalProvider";
import { router, useNavigation } from "expo-router";
import CustomButton from "../components/CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";
import {icons, images} from '../../constants'

const profile = () => {
  
  const navigation = useNavigation();
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
      <View className="flex flex-row justify-center">
        <View className="flex justify-start">
          <View>
            <TouchableOpacity  onPress={() => navigation.navigate('(tabs)', { screen: 'home' })}>
              <Image source={icons.crossX} />
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex basis-3/4">
          <Text className="text-3xl text-center mt-2 font-psemibold text-secondary">PROFILE</Text>
        </View>
      </View>

      <View className="flex h-5/6 justify-between p-2">
        <View className="min-w-full p-6 my-6 bg-purple rounded-2xl">
          <View className="flex flex-row justify-start items-center gap-x-4 mb-6">
            <View>
              <Image source={images.profile} className="rounded-full w-[48] h-[48]" resizeMode="contain"/>
            </View>
            <View className="border-b-[2px] border-secondary">  
              <Text className="text-2xl font-psemibold text-secondary">{record.username}</Text>
            </View>
          </View>
          
          <Text className="text-l my-2 font-psemibold text-secondary">Email : {record.email}</Text>
          <Text className="text-l my-2 font-psemibold text-secondary">Achievements : 13</Text>
          <Text className="text-l my-2 font-psemibold text-secondary">Highest Streak: 28 days</Text>
          <Text className="text-l my-2 font-psemibold text-secondary">Current Streak: 75 days</Text>

        </View>
        <View>
          <Text className="text-xl text-secondary">Account</Text>
          <CustomButton
            title={"Logout"}
            handlePress={logout}
            containerStyles={"mt-7"}
          />
        </View>
      </View>
      
      
    </SafeAreaView>
  );
};

export default profile;
