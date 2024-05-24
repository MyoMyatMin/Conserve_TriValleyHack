import { View, Text, ScrollView, StyleSheet } from "react-native";
import React, { useState } from "react";
import CircularProgressBar from "../components/circularProgressBar";
import { icons } from "../../constants";
import ProgressBar from "../components/ProgressBar";
import { LineChart } from "react-native-gifted-charts";
import CircularProgressBarTotal from "./circularProgressBarTotal";

const MonthDetails = ({ monthlyData }) => {
  let monthly = monthlyData[5]?.twelveMonthsAgo;
  let months = [];
  let data = [];

  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  monthly?.forEach((item) => {
    const monthIndex = parseInt(item._id.split("-")[1], 10) - 1;

    const monthName = labels[monthIndex];

    months.push(monthName);

    data.push({ value: item.totalData });
  });

  return (
    <ScrollView>
      <View className="flex justify-center items-center mt-4">
        <CircularProgressBarTotal
          title={"This month total"}
          percentage={monthlyData[4]?.thismonthTotal}
          max={100000}
          radius={130}
        />
      </View>
      <View className="flex flex-row justify-around items-center my-6 ">
        <CircularProgressBar
          title={"Consumption"}
          percentage={monthlyData[0]?.thismonthFood}
          max={33333}
          radius={32}
          imageSource={icons.Hamburger}
        />
        <CircularProgressBar
          title={"Transportation"}
          percentage={monthlyData[1]?.thismonthTransport}
          max={33333}
          radius={32}
          imageSource={icons.bus}
        />
        <CircularProgressBar
          title={"Plastic Usage"}
          percentage={monthlyData[2]?.thismonthRecycle}
          max={33333}
          radius={32}
          imageSource={icons.trash}
        />
      </View>
      <ProgressBar
        thisMonthElectricity={monthlyData[3]?.thisMonthElectricity || 0}
      />
      <View className="flex items-center justify-center p-6 mt-6">
        <View className="mr-6">
          {monthly && monthly.length > 0 ? (
            <LineChart
              data={data}
              width={300}
              height={240}
              maxValue={100000}
              noOfSections={4}
              isAnimated={true}
              color1="#26D6AF"
              dataPointsColor1="#FFFFFF"
              overflowTop={200}
              xAxisColor="#FFFFFF"
              yAxisColor={"#FFFFFF"}
              xAxisLabelTexts={months}
              xAxisLabelTextStyle={styles.xAxisLabel}
              spacing={26}
              yAxisTextStyle={styles.xAxisLabel}
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

export default MonthDetails;
