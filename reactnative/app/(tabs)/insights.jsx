import { View, Text, ScrollView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AchievementBar from "../components/AchievementBar";
import TreeProgressBar from "../components/TreeProgressBar";
import { icons } from "../../constants";
 
const Insights = () => {
  const [data, setData] = useState([]);
  const [triggerAnimation, setTriggerAnimation] = useState(false);
  useEffect(() => {
    setTriggerAnimation(true);
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
    <SafeAreaView className="flex-1 bg-blue">
      <View className="py-5 bg-blue items-center border-gray-300">
        <Text className="text-2xl text-white font-bold">You Progress Tree</Text>
      </View>
      {triggerAnimation && (
        <TreeProgressBar
          percentage={80}
          radius={150}
          imageSource={icons.profile}
        />
      )}
      <ScrollView>
        <Text className="text-2xl font-bold text-secondary text-center mt-4">
          
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