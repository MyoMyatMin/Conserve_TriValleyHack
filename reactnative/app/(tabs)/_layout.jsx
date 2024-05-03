import { StyleSheet, Text, View, Image, StatusBar } from "react-native";
import React from "react";
import { Tabs, Redirect } from "expo-router";

const TabIcon = ({ icon, color, name, focused }) => {
  // Define your image sources for each tab
  const icons = {
    Profile: require('../../assets/icons/profile.png'),
    Survey: require('../../assets/icons/eye.png'),
    Home: require('../../assets/icons/polar_home.png'),
    Insights: require('../../assets/icons/leaf_insights.png'),
  };

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', gap: 2 }}>
      <Image
        source={icons[name]}
        style={{ width: 24, height: 24}}
      />
      <Text style={{ color: focused ? "#FFA001" : "#CDCDE0", fontSize: 12 }}>{name}</Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#FFA001",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarStyle: {
            backgroundColor: "#161622",
            borderBottomWidth: 1,
            borderBottomColor: "#23533",
            borderTopWidth: 1,
            borderTopColor: "#FFFFFF",
            height: 84,
            padding: 10
          },
        }}
      >
        {/* <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon color={color} name={"Profile"} focused={focused} />
            ),
          }}
        /> */}
        <Tabs.Screen
          name="survey"
          options={{
            title: "Survey",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon color={color} name={"Survey"} focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon color={color} name={"Home"} focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="insights"
          options={{
            title: "Insights",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon color={color} name={"Insights"} focused={focused} />
            ),
          }}
        />
      </Tabs>
    
      <StatusBar backgroundColor="#161622" barStyle="light-content" />
    </>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({});
