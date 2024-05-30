import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import CircularProgressBar from "../components/circularProgressBar";
import { icons } from "../../constants";
import { LineChart } from "react-native-gifted-charts";
import CircularProgressBarTotal from "./circularProgressBarTotal";
import DataDetail from "./DataDetail";

const DayDetails = ({ sevenDaysData }) => {
  const sevenDays = sevenDaysData[4]?.recordsWithinLastSevenDays;
  const data = sevenDays?.map((entry) => ({ value: entry.data }));

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedType, setSelectedType] = useState(null);

  const toggleModal = (type) => {
    setSelectedType(type);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedType(null);
  };

  const days = sevenDays?.map((entry) => {
    const dateObj = new Date(entry.createdAt);
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const day = dateObj.getDate().toString().padStart(2, "0");

    return `${month}/${day}`;
  });

  return (
    <ScrollView>
      <View className="flex justify-center items-center mt-4">
        <TouchableOpacity onPress={() => toggleModal("Total")}>
          <CircularProgressBarTotal
            title={"Today Total"}
            percentage={sevenDaysData[3]?.todayTotal}
            max={8.55}
            radius={130}
          />
        </TouchableOpacity>
        {modalVisible && selectedType === "Total" && (
          <DataDetail
            modalVisible={modalVisible}
            closeModal={closeModal}
            amount={sevenDaysData[3]?.todayTotal}
            time={"Daily"}
            type={"Total"}
            maxAvg={8.55}
            className="flex justify-center items-center mt-4"
          />
        )}
      </View>
      <View className="flex flex-row justify-around items-center my-6 ">
        <TouchableOpacity onPress={() => toggleModal("Consumption")}>
          <CircularProgressBar
            title={"Consumption"}
            percentage={sevenDaysData[0]?.todayFood}
            max={3.5}
            radius={32}
            imageSource={icons.Hamburger}
          />
        </TouchableOpacity>
        {modalVisible && selectedType === "Consumption" && (
          <DataDetail
            modalVisible={modalVisible}
            closeModal={closeModal}
            amount={sevenDaysData[0]?.todayFood}
            time={"Daily"}
            type={"Consumption"}
            maxAvg={3.5}
            className="flex justify-center items-center mt-4"
          />
        )}
        <TouchableOpacity onPress={() => toggleModal("Transportation")}>
          <CircularProgressBar
            title={"Transportation"}
            percentage={sevenDaysData[1]?.todayTransport}
            max={5}
            radius={32}
            imageSource={icons.bus}
          />
        </TouchableOpacity>
        {modalVisible && selectedType === "Transportation" && (
          <DataDetail
            modalVisible={modalVisible}
            closeModal={closeModal}
            amount={sevenDaysData[1]?.todayTransport}
            time={"Daily"}
            type={"Transportation"}
            maxAvg={5}
            className="flex justify-center items-center mt-4"
          />
        )}
        <TouchableOpacity onPress={() => toggleModal("PlasticUsage")}>
          <CircularProgressBar
            title={"Plastic Usage"}
            percentage={sevenDaysData[2]?.todayRecycle}
            max={0.05}
            radius={32}
            imageSource={icons.trash}
          />
        </TouchableOpacity>
        {modalVisible && selectedType === "PlasticUsage" && (
          <DataDetail
            modalVisible={modalVisible}
            closeModal={closeModal}
            amount={sevenDaysData[2]?.todayRecycle}
            time={"Daily"}
            type={"PlasticUsage"}
            maxAvg={0.05}
            className="flex justify-center items-center mt-4"
          />
        )}
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
              overflowTop={120}
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
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 24,
  },
  chartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    marginTop: 24,
  },
  xAxisLabel: {
    color: "#FFFFFF",
    fontSize: 12,
  },
  noDataContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    marginLeft: 24,
    backgroundColor: 'purple',
    borderRadius: 16,
  },
  noDataText: {
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default DayDetails;
