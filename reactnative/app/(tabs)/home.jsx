import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
  StyleSheet,
} from 'react-native'
import { router } from 'expo-router'
import React, { useEffect, useState, useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { icons, images } from '../../constants'
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
  const [showModal, setShowModal] = useState(true)
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
      <Modal visible={showModal} animationType='slide' transparent={true}>
        <View style={styles.modalContainer} className='bg-purple-950'>
          <Image
            className='w-20 h-20'
            source={images.modalImg}
            resizeMode='contain'
          />
          <View className='mb-10'>
            <Text className='px-2 text-white text-2xl font-bold text-center'>
              Hi there! Will you take your daily survey now?
            </Text>
          </View>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {
              setShowModal(false)
              router.push('survey')
            }}
          >
            <Text style={styles.closeButtonText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.closeButtonNo}
            onPress={() => {
              setShowModal(false)
            }}
          >
            <Text style={styles.closeButtonText}>No</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    width: 300,
    height: 150,
    marginBottom: 25,
    overflow: 'hidden',
  },
  buttonText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    color: 'white',
    fontSize: 30,
    marginBottom: 20,
  },
  modalContainer: {
    width: 300,
    height: 300,

    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderRadius: 20,
    top: 150,
    left: 50,
    right: 50,
    bottom: 50,
  },
  closeButton: {
    width: 70,
    height: 35,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'white',
    padding: 5,
    position: 'absolute',
    bottom: 30,
    left: 60,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonNo: {
    width: 70,
    borderRadius: 10,
    height: 35,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'white',
    padding: 5,
    position: 'absolute',
    bottom: 30,
    right: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
})

export default Home
