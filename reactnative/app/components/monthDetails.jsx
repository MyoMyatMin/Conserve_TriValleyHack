import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import CircularProgressBar from "../components/circularProgressBar";
import { icons } from "../../constants";
import ProgressBar from "../components/ProgressBar";
import { LineChart } from "react-native-gifted-charts";
import CircularProgressBarTotal from "./circularProgressBarTotal";
import DataDetail from "./DataDetail";

const MonthDetails = ({ monthlyData }) => {
  let monthly = monthlyData[5]?.twelveMonthsAgo;
  let months = [];
  let data = [];

  const labels = [
    "Jan", "Feb", "Mar", "Apr", "May", "June",
    "July", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  monthly?.forEach((item) => {
    const monthIndex = parseInt(item._id.split("-")[1], 10) - 1;
    const monthName = labels[monthIndex];
    months.push(monthName);
    data.push({ value: item.totalData });
  });

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

  return (
    <ScrollView>
      <View className="flex justify-center items-center mt-4">
        <TouchableOpacity onPress={() => toggleModal('Total')}>
          <CircularProgressBarTotal
            title={"This month total"}
            percentage={monthlyData[4]?.thismonthTotal}
            max={100000}
            radius={130}
          />
        </TouchableOpacity>
        {modalVisible && selectedType === 'Total' && (
          <DataDetail
            modalVisible={modalVisible}
            closeModal={closeModal}
            amount={monthlyData[4]?.thismonthTotal}
            time={'Monthly'}
            type={'Total'}
            maxAvg={100000}
            className='flex justify-center items-center mt-4'
          />
        )}
      </View>
      <View className="flex flex-row justify-around items-center my-6 ">
        <TouchableOpacity onPress={() => toggleModal('Consumption')}>
          <CircularProgressBar
            title={"Consumption"}
            percentage={monthlyData[0]?.thismonthFood}
            max={33333}
            radius={32}
            imageSource={icons.Hamburger}
          />
        </TouchableOpacity>
        {modalVisible && selectedType === 'Consumption' && (
          <DataDetail
            modalVisible={modalVisible}
            closeModal={closeModal}
            amount={monthlyData[0]?.thismonthFood}
            time={'Monthly'}
            type={'Consumption'}
            maxAvg={100000}
            className='flex justify-center items-center mt-4'
          />
        )}
        <TouchableOpacity onPress={() => toggleModal('Transportation')}>
          <CircularProgressBar
            title={"Transportation"}
            percentage={monthlyData[1]?.thismonthTransport}
            max={33333}
            radius={32}
            imageSource={icons.bus}
          />
        </TouchableOpacity>
        {modalVisible && selectedType === 'Transportation' && (
          <DataDetail
            modalVisible={modalVisible}
            closeModal={closeModal}
            amount={monthlyData[1]?.thismonthTransport}
            time={'Monthly'}
            type={'Transportation'}
            maxAvg={100000}
            className='flex justify-center items-center mt-4'
          />
        )}
        <TouchableOpacity onPress={() => toggleModal('PlasticUsage')}>
          <CircularProgressBar
            title={"Plastic Usage"}
            percentage={monthlyData[2]?.thismonthRecycle}
            max={33333}
            radius={32}
            imageSource={icons.trash}
          />
        </TouchableOpacity>
        {modalVisible && selectedType === 'PlasticUsage' && (
          <DataDetail
            modalVisible={modalVisible}
            closeModal={closeModal}
            amount={monthlyData[2]?.thismonthRecycle}
            time={'Monthly'}
            type={'PlasticUsage'}
            maxAvg={100000}
            className='flex justify-center items-center mt-4'
          />
        )}
      </View>
      <TouchableOpacity onPress={() => toggleModal('Electricity')}>
        <ProgressBar
          thisMonthElectricity={monthlyData[3]?.thisMonthElectricity || 0}
        />
      </TouchableOpacity>
      {modalVisible && selectedType === 'Electricity' && (
        <DataDetail
          modalVisible={modalVisible}
          closeModal={closeModal}
          amount={monthlyData[3]?.thisMonthElectricity}
          time={'Monthly'}
          type={'Electricity'}
          maxAvg={100000}
          className='flex justify-center items-center mt-4'
        />
      )}
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
              <Text className="text-white font-psemibold text-center text-base">
                Do not have enough data to show summarized chart.
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
