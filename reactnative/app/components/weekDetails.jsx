import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import CircularProgressBar from '../components/circularProgressBar'
import { icons } from '../../constants'
import {LineChart } from "react-native-gifted-charts";
import CircularProgressBarTotal from './circularProgressBarTotal';

const WeekDetails = () => {
  const data=[ {value:600}, {value:500}, {value:430}, {value:520} ]
  const [maxValue, setMaxValue] = useState(560)
  const [labels, setLabels] = useState(['Week 1', 'Week 2', 'Week 3', 'Week 4'])
  return (
    <ScrollView>
      <View className="flex justify-center items-center mt-4">
        <CircularProgressBarTotal title={'This week total'} percentage={300} max={1000} radius={130}/>
      </View>
      <View className="flex flex-row justify-around items-center my-6 ">
        <CircularProgressBar title={'Consumption'} percentage={400} max={1000} radius={32} imageSource={icons.Hamburger}/>
        <CircularProgressBar title={'Transportation'} percentage={180} max={1000} radius={32} imageSource={icons.bus}/>
        <CircularProgressBar title={'Plastic Usage'} percentage={200} max={600} radius={32} imageSource={icons.trash}/>
      </View>
      <View className="flex items-center justify-center p-6 mt-4 ml-10">
        <View>
          <LineChart 
            data = {data} 
            maxValue={maxValue} 
            noOfSections={4} 
            isAnimated={true} 
            color1='#26D6AF' 
            dataPointsColor1='#FFFFFF' 
            overflowTop={20}
            xAxisColor='#FFFFFF'
            yAxisColor={'#FFFFFF'}
            xAxisLabelTexts={labels}
            xAxisLabelTextStyle={styles.xAxisLabel}
            yAxisTextStyle={styles.xAxisLabel}
            spacing={88}
            maxValueLineColor="#FF0000"/>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  xAxisLabel: {
    color: '#FFFFFF', 
    fontSize: 12, 
  },
});

export default WeekDetails