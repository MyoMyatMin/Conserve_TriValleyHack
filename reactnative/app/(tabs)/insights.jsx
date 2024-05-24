import { View, Text, ScrollView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AchievementBar from "../components/AchievementBar";
import TreeProgressBar from "../components/TreeProgressBar";
import { icons } from "../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Insights = () => {
  const [data, setData] = useState([]);
  const [triggerAnimation, setTriggerAnimation] = useState(false);
  useEffect(() => {
    setTriggerAnimation(true);
    const fetchAchievements = async () => {
      const apiUrl = process.env.EXPO_PUBLIC_API_URL;
      try {
        const token = await AsyncStorage.getItem("userData");
        const res = await fetch(`${apiUrl}/api/getProfileInfos/achievements`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setData(data);
      } catch (error) {
        Alert.alert("Error", error.message);
      }
    };
    fetchAchievements();
  }, []);

  const achievements = data.achievements || [];
  const conserveAmount = data.conserveAmount || 0;
  return (
    <SafeAreaView className="flex-1 bg-blue">
      <ScrollView>
        <View className="py-5 bg-blue items-center border-gray-300">
          <Text className="text-2xl text-white font-bold">
            You Progress Tree
          </Text>
        </View>
        {triggerAnimation && (
          <TreeProgressBar
            percentage={conserveAmount % 700}
            noOfTree={Math.floor(conserveAmount / 700)}
            radius={175}
            imageSource={icons.profile}
          />
        )}

        <Text className="text-2xl font-bold text-secondary text-center mt-4"></Text>
        <View className="flex flex-col py-4 px-6 space-y-[5px]">
          {achievements.map((achievement, index) => (
            <View key={index}>
              <AchievementBar title={achievement} />
              <Text />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Insights;
