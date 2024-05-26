import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  View,
  Text,
  TextInput,
  Button,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

import { images } from '../../constants'
import { questions } from '../../assets/questions/questions'
import { useGlobalContext } from '../../context/GlobalProvider'

const calculateTransportationCarbonFootprint = (answers) => {
  let totalCarbonFootprint = 0
  // console.log(answers)

  for (let i = 0; i < answers.length; i++) {
    totalCarbonFootprint += answers[i].carbon_footprint
  }
  // answers.forEach((answer) => {
  //   if (answer.carbon_footprint) {
  //     totalCarbonFootprint += answer.carbon_footprint
  //   }
  // })

  return totalCarbonFootprint
}

export default function TransportationSurvey({ surveyName, surveyTime }) {
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [answers, setAnswers] = useState([])
  const [showResult, setShowResult] = useState(false)
  const [total, setTotal] = useState(0)

  const {
    morning,
    afternoon,
    night,
    setMorning,
    setAfternoon,
    setNight,
    saveStates,
    loadStates,
    morningTransportation,
    setMorningTransportation,
    morningFood,
    setMorningFood,
    morningUtility,
    setMorningUtility,
    saveMorningSurveyStates,
    loadMorningSurveyStates,
    afternoonTransportation,
    afternoonFood,
    afternoonUtility,
    setAfternoonTransportation,
    setAfternoonFood,
    setAfternoonUtility,
    saveAfternoonSurveyStates,
    loadAfternoonSurveyStates,
    nightTransportation,
    nightFood,
    nightUtility,
    setNightTransportation,
    setNightFood,
    setNightUtility,
    saveNightSurveyStates,
    loadNightSurveyStates,
  } = useGlobalContext()

  const loadInitialStates = async () => {
    const initialStates = await loadStates()
    return initialStates
    // console.log(states)
  }

  const loadInitialMorningSurveyStates = async () => {
    const initialStates = await loadMorningSurveyStates()
    return initialStates
  }
  const loadInitialAfternoonSurveyStates = async () => {
    const initialStates = await loadAfternoonSurveyStates()
    return initialStates
  }
  const loadInitialNightSurveyStates = async () => {
    const initialStates = await loadNightSurveyStates()
    return initialStates
  }

  const handleAnswer = async (answerId) => {
    const currentQuestionObj = questions.find((q) => q.id === currentQuestion)
    const selectedOption = currentQuestionObj.options.find(
      (o) => o.id === answerId
    )

    const updatedAnswer = {
      ...selectedOption,
      carbon_footprint: selectedOption.carbon_footprint || 0,
    }
    // console.log(updatedAnswer)

    setAnswers([...answers, updatedAnswer])

    if (selectedOption.next_question && selectedOption.next_question !== 0) {
      setCurrentQuestion(selectedOption.next_question)
    } else if (selectedOption.next_question == 0) {
      const totalCarbonFootprint =
        calculateTransportationCarbonFootprint(answers) *
        updatedAnswer.carbon_footprint
      console.log(`Total carbon footprint: ${totalCarbonFootprint}`)
      setCurrentQuestion(null) // Stop showing questions
      setShowResult(true)
      setTotal(totalCarbonFootprint)

      let myobj = await loadInitialStates()
      let morningSurveyStates = await loadInitialMorningSurveyStates()
      let afternoonSurveyStates = await loadInitialAfternoonSurveyStates()
      let nightSurveyStates = await loadInitialNightSurveyStates()
      // console.log(morningSurveyStates)
      if (surveyName === 'morningTransportation') {
        morningSurveyStates.objtransportation = 'completed'
        setMorningTransportation('completed')

        await saveMorningSurveyStates(morningSurveyStates)
      } else if (surveyName === 'morningFood') {
        morningSurveyStates.objfood = 'completed'
        setMorningFood('completed')
        await saveMorningSurveyStates(morningSurveyStates)
      } else if (surveyName === 'morningUtility') {
        morningSurveyStates.objutility = 'completed'
        setMorningUtility('completed')
        await saveMorningSurveyStates(morningSurveyStates)
      } else if (surveyName === 'afternoonTransportation') {
        afternoonSurveyStates.objtransportation = 'completed'
        setAfternoonTransportation('completed')
        await saveAfternoonSurveyStates(afternoonSurveyStates)
      } else if (surveyName === 'afternoonFood') {
        afternoonSurveyStates.objfood = 'completed'
        setAfternoonFood('completed')
        await saveAfternoonSurveyStates(afternoonSurveyStates)
      } else if (surveyName === 'afternoonUtility') {
        afternoonSurveyStates.objutility = 'completed'
        setAfternoonUtility('completed')
        await saveAfternoonSurveyStates(afternoonSurveyStates)
      } else if (surveyName === 'nightTransportation') {
        nightSurveyStates.objtransportation = 'completed'
        setNightTransportation('completed')
        await saveNightSurveyStates(nightSurveyStates)
      } else if (surveyName === 'nightFood') {
        nightSurveyStates.objfood = 'completed'
        setNightFood('completed')
        await saveNightSurveyStates(nightSurveyStates)
      } else if (surveyName === 'nightUtility') {
        nightSurveyStates.objutility = 'completed'
        setNightUtility('completed')
        await saveNightSurveyStates(nightSurveyStates)
      }

      if (
        morningSurveyStates.objtransportation === 'completed' &&
        morningSurveyStates.objfood === 'completed' &&
        morningSurveyStates.objutility === 'completed'
      ) {
        // Show the result
        myobj.objmorning = 'completed'
        setMorning(myobj.objmorning)
        // console.log(myobj)
        await saveStates(myobj)
      }

      if (
        afternoonSurveyStates.objtransportation === 'completed' &&
        afternoonSurveyStates.objfood === 'completed' &&
        afternoonSurveyStates.objutility === 'completed'
      ) {
        // Show the result
        myobj.objafternoon = 'completed'
        setAfternoon(myobj.objafternoon)
        // console.log(myobj)
        await saveStates(myobj)
      }

      if (
        nightSurveyStates.objtransportation === 'completed' &&
        nightSurveyStates.objfood === 'completed' &&
        nightSurveyStates.objutility === 'completed'
      ) {
        // Show the result
        myobj.objnight = 'completed'
        setNight(myobj.objnight)
        // console.log(myobj)
        await saveStates(myobj)
      }

      try {
        const apiUrl = process.env.EXPO_PUBLIC_API_URL

        const res = await fetch(`${apiUrl}/api/transportation/morning/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ total: totalCarbonFootprint }),
        })
      } catch (error) {
        console.log(error.message)
      }
    } else {
      console.log('quit without finishing')
    }
  }

  const chooseBackground = (survey) => {
    if (survey == 'morning') {
      return images.morningBg
    } else if (survey == 'afternoon') {
      return images.afternoonBg
    } else if (survey == 'night') {
      return images.nightBg
    }
  }

  return (
    <ImageBackground source={chooseBackground(surveyTime)}>
      <View style={styles.container}>
        {questions.map((questionObj) => {
          if (questionObj.id === currentQuestion) {
            return (
              <View key={questionObj.id}>
                <Text style={styles.question}>{questionObj.text}</Text>
                {questionObj.options.map((option) => (
                  <TouchableOpacity
                    key={option.id}
                    style={styles.button}
                    onPress={() => handleAnswer(option.id)}
                  >
                    <Text style={styles.buttonText}>{option.text}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )
          }
          return null
        })}
        {showResult && (
          <Text style={styles.question}>Total carbon footprint: {total}</Text>
        )}
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    width: 450,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  question: {
    color: 'white',
    width: 350,
    padding: 40,
    paddingVertical: 50,
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    color: 'black',
  },
  button: {
    backgroundColor: '#26D6AF',
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  image: {
    width: 50,
    height: 50,
    marginBottom: 30,
  },
})
