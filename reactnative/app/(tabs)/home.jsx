import { View, Text,Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { icons } from '../../constants'
import { useNavigation } from 'expo-router'
import DayDetails from '../components/dayDetails'
import WeekDetails from '../components/weekDetails'
import MonthDetails from '../components/monthDetails'
import HomeMenu from '../components/HomeMenu'

const Home = () => {
  const [isDay, setIsDay] = useState(true);
  const [isWeek, setIsWeek] = useState(false);
  const [isMonth, setIsMonth] = useState(false);  
  const navigation = useNavigation();
  const handleDayPress = () => {
    setIsDay(true);
    setIsWeek(false);
    setIsMonth(false);
  };

  const handleWeekPress = () => {
    setIsDay(false);
    setIsWeek(true);
    setIsMonth(false);
  };

  const handleMonthPress = () => {
    setIsDay(false);
    setIsWeek(false);
    setIsMonth(true);
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        
        <View className="flex flex-row justify-center my-2 p-1 gap-x-3 ml-7">
          <View className="flex flex-row justify-center basis-5/6">         
            <HomeMenu isDay={isDay} isMonth={isMonth} isWeek={isWeek} handleDayPress={handleDayPress} handleMonthPress={handleMonthPress} handleWeekPress={handleWeekPress} />
          </View>
          <View className="mt-1">
            <TouchableOpacity onPress={() => navigation.navigate('(details)', { screen: 'profile' })}>
              <Image source={icons.profile} resizeMode='contain' className="w-[24px] h-[20px]" style={{
            width: 27,
            height: 27,
            resizeMode: 'contain',
            marginRight: 3,
          }} />
            </TouchableOpacity>
          </View>
        </View>
        {isDay && <DayDetails />}
        {isWeek && <WeekDetails />}
        {isMonth && <MonthDetails />}
      </ScrollView>
      
      
      
      
      
    </SafeAreaView>
  )
}

export default Home