import { ScrollView, View, Image, Text, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "./components/CustomButton";
import { Redirect, router } from "expo-router";
import { useState, useEffect } from "react";
import { useGlobalContext } from "../context/GlobalProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { images } from "../constants";
import * as Notifications from "expo-notifications";

// Set the notification handler to manage foreground notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const App = () => {
  const { isLoading, isLoggedIn, setIsLoggedIn } = useGlobalContext();

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        alert("You need to enable notifications in settings");
      }
    };

    const scheduleNotifications = async () => {
      // Cancel all previously scheduled notifications to avoid duplicates
      await Notifications.cancelAllScheduledNotificationsAsync();

      // Define the times for the notifications
      const triggerTimes = [
        { hour: 9, minute: 0 },
        { hour: 13, minute: 0 },
        { hour: 23, minute: 41 },
      ];

      // Schedule a notification for each time
      triggerTimes.forEach(async (time) => {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "Time to take your survey!",
            body: "Click here to take your daily survey to save the planet.",
            data: { screen: "survey" },
          },
          trigger: {
            hour: time.hour,
            minute: time.minute,
            repeats: true,
          },
        });
      });
    };

    const handleNotificationResponse = (response) => {
      const screen = response.notification.request.content.data.screen;
      console.log(screen);
      if (screen) {
        router.push(screen);
      }
    };

    const initializeNotifications = async () => {
      await requestPermissions();
      await scheduleNotifications();
      const subscription =
        Notifications.addNotificationResponseReceivedListener(
          handleNotificationResponse
        );
      return () => {
        subscription.remove();
      };
    };

    // Initialize notifications on app start
    initializeNotifications();
  }, []);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const userLoggedIn = await AsyncStorage.getItem("userData");

        if (userLoggedIn) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };

    checkLoginStatus();
  }, []);

  if (isLoggedIn) return <Redirect href={"/home"} />;

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center h-full px-4">
          <View className="relative mt-5 flex-row  items-center">
            <Image
              source={images.logo}
              resizeMode="contain"
              className="w-[150px] h-[100px]"
            />
            <Text className="text-3xl text-white font-bold">
              <Text className="text-secondary-200">Conserve</Text>
            </Text>
          </View>
          <Text className="text-md font-psemibold text-gray-100 mt-7 text-center">
            Track Your Carbon Footprint Save the Planet"
          </Text>
          <CustomButton
            title="Get Started"
            handlePress={() => router.push("/sign-in")}
            containerStyles="px-3 mt-7 w-25 h-5"
            textStyles="text-sm"
          />

        </View>
      </ScrollView>
      <StatusBar backgroundColor={"#0B1A22"} style="light" />
      {/* <StatusBar backgroundColor="#161622" style="light" /> */}
    </SafeAreaView>
  );
};

export default App;
