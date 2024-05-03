import { View, Text,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CircularProgressBar from '../components/circularProgressBar'
import { icons } from '../../constants'
import {images} from '../../constants'
import { useNavigation } from 'expo-router'

const Home = () => {
  
  const navigation = useNavigation();
  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="flex flex-row justify-end my-2 p-2 gap-x-4">
        <View className="flex flex-row justify-center gap-x-4 basis-2/4">
          <Text className="text-xl text-secondary">Day</Text>
          <Text className="text-xl text-secondary">Week</Text>
          <Text className="text-xl text-secondary">Month</Text>
        </View>
        <View className="basis-1/4 flex flex-row justify-end">
          <View>
            <TouchableOpacity onPress={() => navigation.navigate('(details)', { screen: 'profile' })}>
              <Image source={icons.profile} resizeMode='contain' className="w-[40px] h-[30px]" />
            </TouchableOpacity>
          </View>
          
        </View>
      </View>
      <View className="flex justify-center items-center mt-6">
        <CircularProgressBar title={'Today total'} percentage={800} max={1000} radius={120} imageSource={icons.total}/>
      </View>
      <View className="flex flex-row justify-around items-center my-12 ">
        <CircularProgressBar title={'Consumption'} percentage={500} max={1000} radius={32} imageSource={icons.Hamburger}/>
        <CircularProgressBar title={'Transportation'} percentage={1200} max={1000} radius={32} imageSource={icons.bus}/>
        <CircularProgressBar title={'Plastic Usage'} percentage={300} max={600} radius={32} imageSource={icons.trash}/>
      </View>
      
      
      
    </SafeAreaView>
  )
}

export default Home