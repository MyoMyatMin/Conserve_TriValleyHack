import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from "expo-router";

const _layoutDetails = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="profile" options={{ headerShown: false }} />
      </Stack>
    </>
  )
}

export default _layoutDetails