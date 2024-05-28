import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import CircularProgressBar from "../components/circularProgressBar";
import { icons } from "../../constants";
import { LineChart } from "react-native-gifted-charts";
import CircularProgressBarTotal from "./circularProgressBarTotal";
import DataDetail from "./DataDetail";

const WeekDetails = ({ weeklyData }) => {
  const [maxValue, setMaxValue] = useState(560);

  let weekly = weeklyData[4]?.fourWeeksAgo;
  const data = weekly?.map((item) => ({ value: item.totalData }));
  const weeks = weekly?.map((item) => `Week ${item._id.isoWeek}`);

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

  const handlePress = (type) =>{
    toggleModal(type);
  }
  return (
    <ScrollView>
      <View className="flex justify-center items-center mt-4">
        <TouchableOpacity onPress={() => toggleModal('Total')}>
          <CircularProgressBarTotal
            title={"This week total"}
            percentage={weeklyData[3]?.thisWeekTotal}
            max={59.85}
            radius={130}
          />
        </TouchableOpacity>
        {modalVisible && selectedType === 'Total' && (
          <DataDetail
            modalVisible={modalVisible}
            closeModal={closeModal}
            amount={weeklyData[3]?.thisWeekTotal}
            time={'Weekly'}
            type={'Total'}
            maxAvg={59.85}
            className='flex justify-center items-center mt-4'
          />
        )}
      </View>
      <View className="flex flex-row justify-around items-center my-6">
        <TouchableOpacity onPress={() => toggleModal('Consumption')}>
          <CircularProgressBar
            title={"Consumption"}
            percentage={weeklyData[0]?.thisWeekFood}
            max={24.5}
            radius={32}
            imageSource={icons.Hamburger}
          />
        </TouchableOpacity>
        {modalVisible && selectedType === 'Consumption' && (
          <DataDetail
            modalVisible={modalVisible}
            closeModal={closeModal}
            amount={weeklyData[0]?.thisWeekFood}
            time={'Weekly'}
            type={'Consumption'}
            maxAvg={24.5}
            className='flex justify-center items-center mt-4'
          />
        )}
        <TouchableOpacity onPress={() => toggleModal('Transportation')}>
          <CircularProgressBar
            title={"Transportation"}
            percentage={weeklyData[1]?.thisWeekTransport}
            max={35}
            radius={32}
            imageSource={icons.bus}
          />
        </TouchableOpacity>
        {modalVisible && selectedType === 'Transportation' && (
          <DataDetail
            modalVisible={modalVisible}
            closeModal={closeModal}
            amount={weeklyData[1]?.thisWeekTransport}
            time={'Weekly'}
            type={'Transportation'}
            maxAvg={35}
            className='flex justify-center items-center mt-4'
          />
        )}
        <TouchableOpacity onPress={() => toggleModal('PlasticUsage')}>
          <CircularProgressBar
            title={"Plastic Usage"}
            percentage={weeklyData[2]?.thisWeekRecycle}
            max={0.35}
            radius={32}
            imageSource={icons.trash}
          />
        </TouchableOpacity>
        {modalVisible && selectedType === 'PlasticUsage' && (
          <DataDetail
            modalVisible={modalVisible}
            closeModal={closeModal}
            amount={weeklyData[2]?.thisWeekRecycle}
            time={'Weekly'}
            type={'PlasticUsage'}
            maxAvg={0.35}
            className='flex justify-center items-center mt-4'
          />
        )}
      </View>
      <View className="flex items-center justify-center p-6 mt-6">
        <View className="mr-6">
          {data && data.length > 0 ? (
            <LineChart
              data={data}
              width={300}
              height={240}
              maxValue={70}
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

export default WeekDetails;
