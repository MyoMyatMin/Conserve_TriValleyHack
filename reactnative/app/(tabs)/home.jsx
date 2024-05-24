import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { icons } from '../../constants'
import {
  useNavigation,
  useFocusEffect,
  useRoute,
} from '@react-navigation/native'
import DayDetails from '../components/dayDetails'
import WeekDetails from '../components/weekDetails'
import MonthDetails from '../components/monthDetails'
import HomeMenu from '../components/HomeMenu'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Home = () => {
  const [isDay, setIsDay] = useState(false)
  const [isWeek, setIsWeek] = useState(false)
  const [isMonth, setIsMonth] = useState(false)
  const navigation = useNavigation()

  const [monthlyData, setMonthlyData] = useState('')
  const [weeklyData, setWeeklyData] = useState('')
  const [sevenDaysData, setSevenDaysData] = useState([])

  useEffect(() => {
    const fetchMonthlyData = async () => {
      const apiUrl = process.env.EXPO_PUBLIC_API_URL
      const token = await AsyncStorage.getItem('userData')
      if (!token) throw new Error('No token found')
      try {
        const res = await fetch(`${apiUrl}/api/getTotalRecord/monthly`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
        const data = await res.json()
        setMonthlyData(data)
      } catch (error) {
        Alert.alert('Error', error.message)
      }
    }

    fetchMonthlyData()
  }, [isMonth])

  useEffect(() => {
    const fetchWeeklyData = async () => {
      const apiUrl = process.env.EXPO_PUBLIC_API_URL
      const token = await AsyncStorage.getItem('userData')
      if (!token) throw new Error('No token found')
      try {
        const res = await fetch(`${apiUrl}/api/getTotalRecord/weekly`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
        const data = await res.json()
        setWeeklyData(data)
      } catch (error) {
        Alert.alert('Error', error.message)
      }
    }

    fetchWeeklyData()
  }, [isWeek])

  useEffect(() => {
    const fetchSevenDaysData = async () => {
      const apiUrl = process.env.EXPO_PUBLIC_API_URL
      const token = await AsyncStorage.getItem('userData')
      if (!token) throw new Error('No token found')
      try {
        const res = await fetch(`${apiUrl}/api/getTotalRecord/lastSevenDays`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
        const data = await res.json()

        setSevenDaysData(data)
      } catch (error) {
        Alert.alert('Error', error.message)
      }
    }
    fetchSevenDaysData()
  }, [isDay])

  useFocusEffect(
    useCallback(() => {
      setIsMonth(false)
      setIsWeek(false)
      const fetchSevenDaysData = async () => {
        const apiUrl = process.env.EXPO_PUBLIC_API_URL
        const token = await AsyncStorage.getItem('userData')
        if (!token) throw new Error('No token found')
        try {
          const res = await fetch(
            `${apiUrl}/api/getTotalRecord/lastSevenDays`,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            }
          )
          const data = await res.json()

          setSevenDaysData(data)

          if (sevenDaysData) {
            setIsDay(true)
          }
        } catch (error) {
          Alert.alert('Error', error.message)
        }
      }
      fetchSevenDaysData()
    }, [])
  )

  const handleDayPress = () => {
    setIsDay(true)
    setIsWeek(false)
    setIsMonth(false)
  }

  const handleWeekPress = () => {
    setIsDay(false)
    setIsWeek(true)
    setIsMonth(false)
  }

  const handleMonthPress = () => {
    setIsDay(false)
    setIsWeek(false)
    setIsMonth(true)
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <View className='flex flex-row justify-center my-2 p-1 gap-x-3 ml-7'>
        <View className='flex flex-row justify-center basis-5/6'>
          <HomeMenu
            isDay={isDay}
            isMonth={isMonth}
            isWeek={isWeek}
            handleDayPress={handleDayPress}
            handleMonthPress={handleMonthPress}
            handleWeekPress={handleWeekPress}
          />
        </View>
        <View className='mt-1'>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('(details)', { screen: 'profile' })
            }
          >
            <Image
              source={icons.profile}
              resizeMode='contain'
              className='w-[24px] h-[20px]'
              style={{
                width: 27,
                height: 27,
                resizeMode: 'contain',
                marginRight: 3,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      {isDay && <DayDetails sevenDaysData={sevenDaysData} />}
      {isWeek && <WeekDetails weeklyData={weeklyData} />}
      {isMonth && <MonthDetails monthlyData={monthlyData} />}
    </SafeAreaView>
  )
}

export default Home
