import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React, {useState} from 'react'
import CircularProgressBar from '../components/circularProgressBar'
import { icons } from '../../constants'
import ProgressBar from '../components/ProgressBar'
import {LineChart } from "react-native-gifted-charts";
import CircularProgressBarTotal from './circularProgressBarTotal'

const MonthDetails = () => {
  const data=[ {value: 6500}, {value:7020},{value:5000}, {value:8000}, {value:9050},{value:6000}, {value:5680}, {value:6590}, {value:7000},{value:6050}, {value:6080}, {value:7090}]
  const [maxValue, setMaxValue] = useState(6720)
  const [labels, setLabels] = useState(['Jan', 'Feb', 'Mar', 'Apr','May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'])
  return (
    <ScrollView>
      <View className="flex justify-center items-center mt-4">
        <CircularProgressBarTotal title={'This month total'} percentage={100} max={1000} radius={100}/>
      </View>
      <View className="flex flex-row justify-around items-center my-6 ">
        <CircularProgressBar title={'Consumption'} percentage={600} max={1000} radius={32} imageSource={icons.Hamburger}/>
        <CircularProgressBar title={'Transportation'} percentage={400} max={1000} radius={32} imageSource={icons.bus}/>
        <CircularProgressBar title={'Plastic Usage'} percentage={350} max={600} radius={32} imageSource={icons.trash}/>
      </View>
      <ProgressBar />
      <View className="flex items-center justify-center p-6 mt-12">
        <View>
          <LineChart 
            data = {data} 
            maxValue={maxValue} 
            noOfSections={4} 
            isAnimated={true} 
            color1='#26D6AF' 
            dataPointsColor1='#FFFFFF' 
            overflowTop={200}
            xAxisColor='#FFFFFF'
            yAxisColor={'#FFFFFF'}
            xAxisLabelTexts={labels}
            xAxisLabelTextStyle={styles.xAxisLabel}
            spacing={28}
            yAxisTextStyle={styles.xAxisLabel}/>
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

export default MonthDetails