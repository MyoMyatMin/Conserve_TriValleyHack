import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Home = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <Text className="text-3xl text-secondary">Home</Text>
      
    </SafeAreaView>
  )
}

export default Home