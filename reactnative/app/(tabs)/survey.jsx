import {
  View,
  Text,
  Alert,
  Image,
  Modal,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import React from 'react'
import { useState } from 'react'
import { icons } from '../../constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useGlobalContext } from '../../context/GlobalProvider'
import MorningSurvey from '../components/MorningSurvey'
import AfternoonSurvey from '../components/AfternoonSurvey'
import NightSurvey from '../components/NightSurvey'

const getButtonColor = (surveyState) => {
  switch (surveyState) {
    case 'completed':
      return '#008000' // green
    case 'pending':
      return '#ffff00' // yellow
    default:
      return '#007AFF' // blue
  }
}
const Survey = () => {
  const [showSurvey, setShowSurvey] = useState(false)
  const [showAfternoon, setShowAfternoon] = useState(false)
  const [showNight, setShowNight] = useState(false)
  const { morning, afternoon, night, setMorning, setAfternoon, setNight } =
    useGlobalContext()

  const handleSurveyPress = (survey) => {
    // console.log(morning)
    if (survey === 'morning' && morning === 'ready') {
      setShowSurvey(true)
    } else if (
      survey === 'afternoon' &&
      morning === 'completed' &&
      afternoon === 'ready'
    ) {
      setShowAfternoon(true)
    } else if (
      survey === 'afternoon' &&
      morning !== 'completed' &&
      afternoon === 'ready'
    ) {
      Alert.alert('Need to finish Morning First!')
    } else if (
      survey === 'night' &&
      morning === 'completed' &&
      afternoon === 'completed' &&
      night === 'ready'
    ) {
      setShowNight(true)
    } else if (
      survey === 'night' &&
      (morning !== 'completed' || afternoon !== 'completed') &&
      night === 'ready'
    ) {
      Alert.alert('Need to finish previous survey fist!')
    } else if (
      morning === 'completed' ||
      afternoon === 'completed' ||
      night === 'completed'
    ) {
      Alert.alert('Already Taken!')
    } else if (
      morning === 'pending' ||
      afternoon === 'pending' ||
      night === 'pending'
    ) {
      Alert.alert('Can not take yet')
    }
  }
  return (
    <SafeAreaView className='bg-primary h-full'>
      <View style={styles.container}>
        <Text style={[styles.text, { marginBottom: 50 }]}>
          How is your Day?
        </Text>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#26D6AF' }]}
          onPress={() => handleSurveyPress('morning')}
        >
          <View style={styles.buttonView}>
            <Image source={icons.morningIcon} />
            <Text style={styles.buttonText}>Morning</Text>
            {morning === 'completed' && <Image source={icons.completedIcon} />}
            {morning === 'pending' && <Image source={icons.pendingIcon} />}
            {morning === 'ready' && <Image source={icons.readyIcon} />}
          </View>
        </TouchableOpacity>
        <Modal visible={showSurvey} animationType='slide'>
          <View style={styles.modalContainer}>
            <MorningSurvey />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowSurvey(false)}
            >
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#615B7F' }]}
          onPress={() => handleSurveyPress('afternoon')}
        >
          <View style={styles.buttonView}>
            <Image source={icons.afternoonIcon} />
            <Text style={styles.buttonText}>Afternoon</Text>
            {afternoon === 'completed' && (
              <Image source={icons.completedIcon} />
            )}
            {afternoon === 'pending' && <Image source={icons.pendingIcon} />}
            {afternoon === 'ready' && <Image source={icons.readyIcon} />}
          </View>
        </TouchableOpacity>
        <Modal visible={showAfternoon} animationType='slide'>
          <View style={styles.modalContainer}>
            <AfternoonSurvey />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowAfternoon(false)}
            >
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#271D3B' }]}
          onPress={() => handleSurveyPress('night')}
        >
          <View style={styles.buttonView}>
            <Image source={icons.nightIcon} />
            <Text style={styles.buttonText}>Night</Text>
            {night === 'completed' && <Image source={icons.completedIcon} />}
            {night === 'pending' && <Image source={icons.pendingIcon} />}
            {night === 'ready' && <Image source={icons.readyIcon} />}
          </View>
        </TouchableOpacity>
        <Modal visible={showNight} animationType='slide'>
          <View style={styles.modalContainer}>
            <NightSurvey />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowNight(false)}
            >
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 50,
    marginTop: 50,
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    padding: 10,
    borderRadius: 20,
    width: 350,
    height: 60,
    marginBottom: 25,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    color: 'white',
    fontSize: 30,
    marginBottom: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    position: 'relative',
  },
  closeButton: {
    width: 35,
    height: 35,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'white',
    padding: 5,
    borderRadius: 50,
    position: 'absolute',
    bottom: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
})

export default Survey
