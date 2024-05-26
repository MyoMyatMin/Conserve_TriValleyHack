import { View, Text, ScrollView, StyleSheet } from "react-native";
import React, { useState } from "react";
import CircularProgressBar from "../components/circularProgressBar";
import { icons } from "../../constants";
import { LineChart } from "react-native-gifted-charts";
import CircularProgressBarTotal from "./circularProgressBarTotal";

const DayDetails = ({ sevenDaysData }) => {
  const sevenDays = sevenDaysData[4]?.recordsWithinLastSevenDays;
  const data = sevenDays?.map((entry) => ({ value: entry.data }));

  const days = sevenDays?.map((entry) => {
    const dateObj = new Date(entry.createdAt);
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const day = dateObj.getDate().toString().padStart(2, "0");

    return `${month}/${day}`;
  });

  return (
    <ScrollView>
      <View className="flex justify-center items-center mt-4">
        <CircularProgressBarTotal
          title={"Today Total"}
          percentage={sevenDaysData[3]?.todayTotal}
          max={8.55}
          radius={130}
        />
      </View>
      <View className="flex flex-row justify-around items-center my-6 ">
        <CircularProgressBar
          title={"Consumption"}
          percentage={sevenDaysData[0]?.todayFood}
          max={3.5}
          radius={32}
          imageSource={icons.Hamburger}
        />
        <CircularProgressBar
          title={"Transportation"}
          percentage={sevenDaysData[1]?.todayTransport}
          max={5}
          radius={32}
          imageSource={icons.bus}
        />
        <CircularProgressBar
          title={"Plastic Usage"}
          percentage={sevenDaysData[2]?.todayRecycle}
          max={0.05}
          radius={32}
          imageSource={icons.trash}
        />
      </View>
      <View className="flex items-center justify-center p-6 mt-6 ">
        <View className="mr-6">
          {data && data.length > 0 ? (
            <LineChart
              data={data}
              width={300}
              height={240}
              maxValue={10}
              noOfSections={4}
              isAnimated={true}
              color1="#26D6AF"
              dataPointsColor1="#FFFFFF"
              overflowTop={200}
              xAxisColor="#FFFFFF"
              yAxisColor={"#FFFFFF"}
              xAxisLabelTexts={days}
              xAxisLabelTextStyle={styles.xAxisLabel}
              yAxisTextStyle={styles.xAxisLabel}
              spacing={44}
              maxValueLineColor="#FF0000"
            />
          ) : (
            <View className="flex items-center justify-center p-8 ml-6 bg-purple rounded-lg">
              <Text className="text-white font-psemibold text-center  text-base">
                Do not have enough data to show summerize chart.
              </Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  xAxisLabel: {
    color: "#FFFFFF",
    fontSize: 12,
  },
});

export default DayDetails;
