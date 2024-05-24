import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  Modal,
} from 'react-native'

import { icons, images } from '../../constants'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import TransportationSurvey from '../components/TransportationSurvey'

const night = () => {
  const [showTransportation, setShowTransportation] = useState(false)
  const [showFood, setShowFood] = useState(false)
  const [showUtility, setShowUtility] = useState(false)

  const handlePress = (name) => {
    if (name === 'transportation') {
      setShowTransportation(true)
    } else if (name === 'food') {
      setShowFood(true)
    } else if (name === 'utility') {
      setShowUtility(true)
    }
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <View style={styles.container}>
        <Text style={[styles.text, { marginBottom: 50 }]}>
          Your Night Surveys
        </Text>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'red' }]}
          onPress={() => handlePress('transportation')}
        >
          <ImageBackground source={images.nightBg}>
            <View style={styles.buttonView}>
              {/* <Image source={icons.morningIcon} /> */}
              <Text style={styles.buttonText}>Transportation</Text>
              <Image source={icons.completedIcon} />
            </View>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'red' }]}
          onPress={() => handlePress('food')}
        >
          <ImageBackground source={images.nightBg}>
            <View style={styles.buttonView}>
              {/* <Image source={icons.morningIcon} /> */}
              <Text style={styles.buttonText}>Food</Text>
              <Image source={icons.completedIcon} />
            </View>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'red' }]}
          onPress={() => handlePress('utility')}
        >
          <ImageBackground source={images.nightBg}>
            <View style={styles.buttonView}>
              {/* <Image source={icons.morningIcon} /> */}
              <Text style={styles.buttonText}>Recycling</Text>
              <Image source={icons.completedIcon} />
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>
      <Modal
        visible={showTransportation}
        animationType='slide'
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <TransportationSurvey />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowTransportation(false)}
          >
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal visible={showFood} animationType='slide' transparent={true}>
        <View style={styles.modalContainer}>
          <TransportationSurvey />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowFood(false)}
          >
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal visible={showUtility} animationType='slide' transparent={true}>
        <View style={styles.modalContainer}>
          <TransportationSurvey />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowUtility(false)}
          >
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  button: {
    borderRadius: 20,
    width: 300,
    height: 150,
    marginBottom: 25,
    overflow: 'hidden',
  },
  buttonText: {
    color: 'white',
    fontSize: 30,
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
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
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

export default morning
