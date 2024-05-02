import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Survey = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <Text className="text-2xl text-secondary">Survey</Text>
    </SafeAreaView>
  )
}

export default Survey