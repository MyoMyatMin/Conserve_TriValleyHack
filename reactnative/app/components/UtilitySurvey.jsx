import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  TextInput,
  Button,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { images } from "../../constants";
import { utilityquestions } from "../../assets/questions/utilityquestions";
import { useGlobalContext } from "../../context/GlobalProvider";

const calculateUtilityCarbonFootprint = (answers) => {
  let totalCarbonFootprint = 0;

  answers.forEach((answer) => {
    if (answer.carbon_footprint) {
      totalCarbonFootprint += answer.carbon_footprint;
    }
  });

  return totalCarbonFootprint;
};

export default function UtilitySurvey({ surveyName, surveyTime }) {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);

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
  } = useGlobalContext();

  const loadInitialStates = async () => {
    const initialStates = await loadStates();
    return initialStates;
    // console.log(states)
  };

  const loadInitialMorningSurveyStates = async () => {
    const initialStates = await loadMorningSurveyStates();
    return initialStates;
  };
  const loadInitialAfternoonSurveyStates = async () => {
    const initialStates = await loadAfternoonSurveyStates();
    return initialStates;
  };
  const loadInitialNightSurveyStates = async () => {
    const initialStates = await loadNightSurveyStates();
    return initialStates;
  };

  const handleAnswer = async (answerId) => {
    const currentQuestionObj = utilityquestions.find(
      (q) => q.id === currentQuestion
    );
    const selectedOption = currentQuestionObj.options.find(
      (o) => o.id === answerId
    );

    const updatedAnswer = {
      ...selectedOption,
      carbon_footprint: selectedOption.carbon_footprint || 0,
    };

    setAnswers([...answers, updatedAnswer]);

    if (selectedOption.next_question && selectedOption.next_question !== 0) {
      setCurrentQuestion(selectedOption.next_question);
    } else if (selectedOption.next_question == 0) {
      const totalCarbonFootprint =
        calculateUtilityCarbonFootprint(answers) +
        selectedOption.carbon_footprint;
      console.log(`Total carbon footprint: ${totalCarbonFootprint}`);
      setCurrentQuestion(null); // Stop showing questions
      setShowResult(true);

      let myobj = await loadInitialStates();
      let morningSurveyStates = await loadInitialMorningSurveyStates();
      let afternoonSurveyStates = await loadInitialAfternoonSurveyStates();
      let nightSurveyStates = await loadInitialNightSurveyStates();
      // console.log(morningSurveyStates)
      if (surveyName === "morningTransportation") {
        morningSurveyStates.objtransportation = "completed";
        setMorningTransportation("completed");
        console.log(morningTransportation);
        await saveMorningSurveyStates(morningSurveyStates);
      } else if (surveyName === "morningFood") {
        morningSurveyStates.objfood = "completed";
        setMorningFood("completed");
        await saveMorningSurveyStates(morningSurveyStates);
      } else if (surveyName === "morningUtility") {
        morningSurveyStates.objutility = "completed";
        setMorningUtility("completed");
        await saveMorningSurveyStates(morningSurveyStates);
      } else if (surveyName === "afternoonTransportation") {
        afternoonSurveyStates.objtransportation = "completed";
        setAfternoonTransportation("completed");
        await saveAfternoonSurveyStates(afternoonSurveyStates);
      } else if (surveyName === "afternoonFood") {
        afternoonSurveyStates.objfood = "completed";
        setAfternoonFood("completed");
        await saveAfternoonSurveyStates(afternoonSurveyStates);
      } else if (surveyName === "afternoonUtility") {
        afternoonSurveyStates.objutility = "completed";
        setAfternoonUtility("completed");
        await saveAfternoonSurveyStates(afternoonSurveyStates);
      } else if (surveyName === "nightTransportation") {
        nightSurveyStates.objtransportation = "completed";
        setNightTransportation("completed");
        await saveNightSurveyStates(nightSurveyStates);
      } else if (surveyName === "nightFood") {
        nightSurveyStates.objfood = "completed";
        setNightFood("completed");
        await saveNightSurveyStates(nightSurveyStates);
      } else if (surveyName === "nightUtility") {
        nightSurveyStates.objutility = "completed";

        setNightUtility("completed");
        await saveNightSurveyStates(nightSurveyStates);
      }

      if (
        morningSurveyStates.objtransportation === "completed" &&
        morningSurveyStates.objfood === "completed" &&
        morningSurveyStates.objutility === "completed"
      ) {
        // Show the result
        myobj.objmorning = "completed";
        setMorning(myobj.objmorning);
        // console.log(myobj)
        await saveStates(myobj);
      }

      if (
        afternoonSurveyStates.objtransportation === "completed" &&
        afternoonSurveyStates.objfood === "completed" &&
        afternoonSurveyStates.objutility === "completed"
      ) {
        // Show the result
        myobj.objafternoon = "completed";
        setAfternoon(myobj.objafternoon);
        // console.log(myobj)
        await saveStates(myobj);
      }

      if (
        nightSurveyStates.objtransportation === "completed" &&
        nightSurveyStates.objfood === "completed" &&
        nightSurveyStates.objutility === "completed"
      ) {
        // Show the result
        myobj.objnight = "completed";
        setNight(myobj.objnight);
        // console.log(myobj)
        await saveStates(myobj);
      }

      if (surveyTime === "morning") {
        console.log(totalCarbonFootprint);
        try {
          const apiUrl = process.env.EXPO_PUBLIC_API_URL;
          const res = await fetch(`${apiUrl}/api/recycling/morning/create`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ data: totalCarbonFootprint }),
          });

          if (!res.ok) {
            throw new Error(`Error: ${res.status} ${res.statusText}`);
          }
          setShowResult(true);
        } catch (error) {
          console.log("Request failed:", error.message);
          Alert.alert("Error", `Request failed: ${error.message}`);
        }
      } else if (surveyTime === "afternoon") {
        // console.log(surveyTime, totalCarbonFootprint);
        try {
          const apiUrl = process.env.EXPO_PUBLIC_API_URL;
          // console.log(apiUrl);
          const res = await fetch(`${apiUrl}/api/recycling/noon/create`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ data: totalCarbonFootprint }),
          });

          if (!res.ok) {
            throw new Error(`Error: ${res.status} ${res.statusText}`);
          }

          const result = await res.json();
          setShowResult(true);
        } catch (error) {
          console.log("Request failed:", error.message);
          Alert.alert("Error", `Request failed: ${error.message}`);
        }
      } else {
        // console.log(totalCarbonFootprint);
        try {
          const apiUrl = process.env.EXPO_PUBLIC_API_URL;
          const res = await fetch(`${apiUrl}/api/recycling/evening/create`, {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ data: totalCarbonFootprint }),
          });

          if (!res.ok) {
            throw new Error(`Error: ${res.status} ${res.statusText}`);
          }

          setShowResult(true);
        } catch (error) {
          console.log("Request failed:", error.message);
          Alert.alert("Error", `Request failed: ${error.message}`);
        }
      }
    } else {
      console.log("quit without finishing");
    }
  };

  const chooseBackground = (survey) => {
    if (survey == "morning") {
      return images.morningBg;
    } else if (survey == "afternoon") {
      return images.afternoonBg;
    } else if (survey == "night") {
      return images.nightBg;
    }
  };

  return (
    <ImageBackground source={chooseBackground(surveyTime)}>
      <View style={styles.container}>
        {utilityquestions.map((questionObj) => {
          if (questionObj.id === currentQuestion) {
            return (
              <View key={questionObj.id}>
                <View style={styles.question} className="rounded-lg">
                  <Text className="text-xl text-center">
                    {questionObj.text}
                  </Text>
                </View>
                {questionObj.options.map((option) => (
                  <TouchableOpacity
                    key={option.id}
                    style={styles.button}
                    onPress={() => handleAnswer(option.id)}
                  >
                    <Text className="text-center text-xl text-slate-700">
                      {option.text}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            );
          }
          return null;
        })}
        {showResult && (
          <View style={styles.question} className="rounded-lg">
            <Text className="text-xl">
              Total carbon footprint: {calculateUtilityCarbonFootprint(answers)}
            </Text>
          </View>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    width: 450,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  question: {
    color: "white",
    width: 350,
    padding: 40,
    paddingVertical: 50,
    textAlign: "center",
    marginBottom: 20,
    fontSize: 20,
    backgroundColor: "white",
    borderRadius: 20,
    color: "black",
  },
  button: {
    backgroundColor: "#26D6AF",
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 20,
    alignItems: "center",
  },
  image: {
    width: 50,
    height: 50,
    marginBottom: 30,
  },
});
