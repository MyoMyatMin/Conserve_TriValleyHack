import { View, Text,TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

const HomeMenu = ({handleDayPress, handleMonthPress, handleWeekPress, isDay, isMonth, isWeek}) => {
  return (
    <>
      <View className="flex flex-row justify-center gap-x-12">
        <TouchableOpacity onPress={handleDayPress}>
          <Text style={isDay && styles.activeButton} className="text-xl text-secondary">Day</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleWeekPress}>
          <Text style={isWeek && styles.activeButton}  className="text-xl text-secondary">Week</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleMonthPress}>
          <Text style={isMonth && styles.activeButton} className="text-xl text-secondary">Month</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}
const styles = StyleSheet.create({
  activeButton: {
    color: "#26D6AF",
    textDecorationLine: 'underline',
    textDecorationColor: '#26D6AF', // Change 'blue' to your desired color
    textDecorationStyle: 'solid',
  },
});

export default HomeMenu