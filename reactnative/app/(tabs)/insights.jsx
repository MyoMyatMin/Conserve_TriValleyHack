import { View, Text, ScrollView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AchievementBar from "../components/AchievementBar";
import { styled } from "nativewind";

const Insights = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchAchievements = async () => {
      const apiUrl = process.env.EXPO_PUBLIC_API_URL;
      try {
        const res = await fetch(`${apiUrl}/api/getProfileInfos/achievements`);
        const data = await res.json();
        setData(data);
      } catch (error) {
        Alert.alert("Error", error.message);
      }
    };
    fetchAchievements();
  }, []);

  const achievements = data.achievements || [];

  return (
    <SafeAreaView className="bg-blue h-full">
      <ScrollView>
        <Text className="text-2xl font-bold text-secondary text-center mt-4">
          YOUR PROGESS TREE
        </Text>
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

const Achievement = ({ title }) => {
  return <AchievementBar title={title} />;
};

export default Insights;
