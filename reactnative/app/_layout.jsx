import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import GlobalProvider from "../context/GlobalProvider";

const RootLayout = () => {
  return (
    <GlobalProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack>
    </GlobalProvider>
  );
};

export default RootLayout;
