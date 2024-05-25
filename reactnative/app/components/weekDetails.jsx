import { View, Text, ScrollView, StyleSheet } from "react-native";
import React, { useState } from "react";
import CircularProgressBar from "../components/circularProgressBar";
import { icons } from "../../constants";
import { LineChart } from "react-native-gifted-charts";
import CircularProgressBarTotal from "./circularProgressBarTotal";

const WeekDetails = ({ weeklyData }) => {
  const [maxValue, setMaxValue] = useState(560);

  let weekly = weeklyData[4]?.fourWeeksAgo;

  const data = weekly?.map((item) => ({ value: item.totalData }));

  const weeks = weekly?.map((item) => `Week ${item._id.isoWeek}`);

  return (
    <ScrollView>
      <View className="flex justify-center items-center mt-4">
        <CircularProgressBarTotal
          title={"This week total"}
          percentage={weeklyData[3]?.thisWeekTotal}
          max={25000}
          radius={130}
        />
      </View>
      <View className="flex flex-row justify-around items-center my-6 ">
        <CircularProgressBar
          title={"Consumption"}
          percentage={weeklyData[0]?.thisWeekFood}
          max={10000}
          radius={32}
          imageSource={icons.Hamburger}
        />
        <CircularProgressBar
          title={"Transportation"}
          percentage={weeklyData[1]?.thisWeekTransport}
          max={10000}
          radius={32}
          imageSource={icons.bus}
        />
        <CircularProgressBar
          title={"Plastic Usage"}
          percentage={weeklyData[2]?.thisWeekRecycle}
          max={10000}
          radius={32}
          imageSource={icons.trash}
        />
      </View>
      <View className="flex items-center justify-center p-6 mt-6">
        <View className="mr-6">
          {data && data.length > 0 ? (
            <LineChart
              data={data}
              width={300}
              height={240}
              maxValue={20000}
              noOfSections={4}
              isAnimated={true}
              color1="#26D6AF"
              dataPointsColor1="#FFFFFF"
              overflowTop={20}
              xAxisColor="#FFFFFF"
              yAxisColor={"#FFFFFF"}
              xAxisLabelTexts={weeks}
              xAxisLabelTextStyle={styles.xAxisLabel}
              yAxisTextStyle={styles.xAxisLabel}
              spacing={88}
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

export default WeekDetails;
