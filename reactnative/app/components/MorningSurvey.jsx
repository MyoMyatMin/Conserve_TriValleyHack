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

const calculateCarbonFootprint = (answers) => {
  let totalCarbonFootprint = 0

  answers.forEach((answer) => {
    if (answer.carbon_footprint) {
      totalCarbonFootprint += answer.carbon_footprint
    }
  })

  return totalCarbonFootprint
}

export default function MorningSurvey() {
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [answers, setAnswers] = useState([])
  const [showResult, setShowResult] = useState(false)
  const {
    morning,
    afternoon,
    night,
    setMorning,
    setAfternoon,
    setNight,
    saveStates,
    loadStates,
  } = useGlobalContext()

  const loadInitialStates = async () => {
    const initialStates = await loadStates()
    return initialStates
    // console.log(states)
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

    setAnswers([...answers, updatedAnswer])

    if (selectedOption.next_question && selectedOption.next_question !== 0) {
      setCurrentQuestion(selectedOption.next_question)
    } else if (selectedOption.next_question == 0) {
      const totalCarbonFootprint = calculateCarbonFootprint(answers)
      console.log(`Total carbon footprint: ${totalCarbonFootprint}`)
      setCurrentQuestion(null) // Stop showing questions
      setShowResult(true)

      let myobj = await loadInitialStates()
      // Show the result
      myobj.objmorning = 'completed'
      setMorning(myobj.objmorning)
      // console.log(myobj)
      await saveStates(myobj)
    } else {
      console.log('quit without finishing')
    }
  }

  return (
    <ImageBackground source={images.morningBg}>
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
          <Text style={styles.question}>
            Total carbon footprint: {calculateCarbonFootprint(answers)}
          </Text>
        )}
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  question: {
    color: 'white',
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
