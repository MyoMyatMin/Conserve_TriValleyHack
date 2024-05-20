import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React, {useState} from 'react'
import CircularProgressBar from '../components/circularProgressBar'
import { icons } from '../../constants'
import {LineChart } from "react-native-gifted-charts";
import CircularProgressBarTotal from './circularProgressBarTotal';

const DayDetails = () => {
  const data=[ {value:0}, {value:80}, {value:90}, {value:70},{value:50}, {value:80}, {value:90} ]
  const [maxValue, setMaxValue] = useState(80)
  const [labels, setLabels] = useState(['Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'])
  return (
    <ScrollView>
      <View className="flex justify-center items-center mt-4">
        <CircularProgressBarTotal title={'Today Total'} percentage={1000} max={1000} radius={130}/>
      </View>
      <View className="flex flex-row justify-around items-center my-6 ">
        <CircularProgressBar title={'Consumption'} percentage={500} max={1000} radius={32} imageSource={icons.Hamburger}/>
        <CircularProgressBar title={'Transportation'} percentage={1200} max={1000} radius={32} imageSource={icons.bus}/>
        <CircularProgressBar title={'Plastic Usage'} percentage={300} max={600} radius={32} imageSource={icons.trash}/>
      </View>
      <View className="flex items-center justify-center p-6 mt-4 mr-1">
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
            spacing={44}
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

export default DayDetails