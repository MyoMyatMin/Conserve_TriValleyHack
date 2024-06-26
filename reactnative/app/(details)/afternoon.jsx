import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  Modal,
  Alert,
} from 'react-native'
import { router } from 'expo-router'
import { icons, images } from '../../constants'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import TransportationSurvey from '../components/TransportationSurvey'
import FoodSurvey from '../components/FoodSurvey'
import UtilitySurvey from '../components/UtilitySurvey'
import { useGlobalContext } from '../../context/GlobalProvider'

const afternoon = () => {
  const [showTransportation, setShowTransportation] = useState(false)
  const [showFood, setShowFood] = useState(false)
  const [showUtility, setShowUtility] = useState(false)
  const {
    afternoonTransportation,
    afternoonFood,
    afternoonUtility,
    saveAfternoonSurveyStates,
    loadAfternoonSurveyStates,
  } = useGlobalContext()

  // let {
  //   afternoonTransportation,
  //   afternoonFood,
  //   afternoonUtility,
  //   saveAfternoonSurveyStates,
  //   loadAfternoonSurveyStates,
  // } = useGlobalContext();
  // afternoonTransportation = "pending";
  // afternoonFood = "pending";
  // afternoonUtility = "pending";

  const handlePress = (name) => {
    if (name === 'transportation' && afternoonTransportation == 'pending') {
      setShowTransportation(true)
    } else if (
      name === 'transportation' &&
      afternoonTransportation == 'completed'
    ) {
      Alert.alert('You have already taken this survey!')
    } else if (name === 'food' && afternoonFood == 'pending') {
      setShowFood(true)
    } else if (name === 'food' && afternoonFood == 'completed') {
      Alert.alert('You have already taken this survey!')
    } else if (name === 'utility' && afternoonUtility == 'pending') {
      setShowUtility(true)
    } else if (name === 'utility' && afternoonUtility == 'completed') {
      Alert.alert('You have already taken this survey!')
    }
  }

  // useEffect(() => {
  //   console.log(morningTransportation, morningFood, morningUtility);
  // }, []);

  return (
    <SafeAreaView className='bg-primary h-full relative'>
      <TouchableOpacity
        onPress={() => router.replace('survey')}
        className='left-3 top-5'
      >
        <Image source={icons.leftArrow} />
      </TouchableOpacity>
      <View style={styles.container}>
        <Text style={[styles.text, { marginBottom: 50 }]}>
          Your Afternoon Surveys
        </Text>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'red' }]}
          onPress={() => handlePress('transportation')}
        >
          <ImageBackground source={images.transportationBg}>
            <View style={styles.buttonView}>
              {/* <Image source={icons.morningIcon} /> */}
              <Text style={styles.buttonText}>Transportation</Text>
              {afternoonTransportation === 'pending' && (
                <Image source={icons.pendingIcon} />
              )}
              {afternoonTransportation === 'completed' && (
                <Image source={icons.completedIcon} />
              )}
            </View>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'red' }]}
          onPress={() => handlePress('food')}
        >
          <ImageBackground source={images.foodBg}>
            <View style={styles.buttonView}>
              {/* <Image source={icons.morningIcon} /> */}
              <Text style={styles.buttonText}>Food</Text>
              {afternoonFood === 'pending' && (
                <Image source={icons.pendingIcon} />
              )}
              {afternoonFood === 'completed' && (
                <Image source={icons.completedIcon} />
              )}
            </View>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'red' }]}
          onPress={() => handlePress('utility')}
        >
          <ImageBackground source={images.utilityBg}>
            <View style={styles.buttonView}>
              {/* <Image source={icons.morningIcon} /> */}
              <Text style={styles.buttonText}>Recycling</Text>
              {afternoonUtility === 'pending' && (
                <Image source={icons.pendingIcon} />
              )}
              {afternoonUtility === 'completed' && (
                <Image source={icons.completedIcon} />
              )}
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
          <TransportationSurvey
            surveyName='afternoonTransportation'
            surveyTime='afternoon'
          />
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
          <FoodSurvey surveyName='afternoonFood' surveyTime='afternoon' />
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
          <UtilitySurvey surveyName='afternoonUtility' surveyTime='afternoon' />
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
    bottom: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
})

export default afternoon
