import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AchievementBar from '../components/AchievementBar'
import { styled } from 'nativewind';
 
 
const Insights = () => {
  const data = ["First login","First Conserve","Easy"]
 
  return (
    <SafeAreaView className="bg-blue h-full">
      <ScrollView >
        <Text className="text-2xl font-bold text-secondary text-center mt-4">YOUR PROGESS TREE</Text>
        <View className="flex flex-col py-4 px-6 space-y-[5px]">
        {data.map((achievement, index) => (
          <View key={index}>
              <AchievementBar  title={achievement} />
            <Text/>
          </View>
         
          ))}
        </View>
         
      </ScrollView>
     
    </SafeAreaView>
  )
}
 
const Achievement = ({title}) => {
  return (
    <AchievementBar
            title={title}          
          />
  )
}
 
export default Insights