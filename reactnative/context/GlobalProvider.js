import { useContext, useState, createContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

const saveMorningSurveyStates = async (states) => {
  try {
    await AsyncStorage.setItem("morningSurveyStates", JSON.stringify(states));
  } catch (e) {
    console.log("Failed to save surveyStates", e);
  }
};
const saveAfternoonSurveyStates = async (states) => {
  try {
    await AsyncStorage.setItem("afternoonSurveyStates", JSON.stringify(states));
  } catch (e) {
    console.log("Failed to save surveyStates", e);
  }
};
const saveNightSurveyStates = async (states) => {
  try {
    await AsyncStorage.setItem("nightSurveyStates", JSON.stringify(states));
  } catch (e) {
    console.log("Failed to save surveyStates", e);
  }
};

const saveStates = async (states) => {
  try {
    await AsyncStorage.setItem("states", JSON.stringify(states));
  } catch (e) {
    console.log("Failed to save states:", e);
  }
};

const loadMorningSurveyStates = async () => {
  try {
    const statesJson = await AsyncStorage.getItem("morningSurveyStates");
    if (statesJson) {
      return JSON.parse(statesJson);
    } else {
      return {
        objtransportation: "pending",
        objfood: "pending",
        objutility: "pending",
      };
    }
  } catch (e) {
    console.log("Failed to load states: ", e);
  }
};
const loadAfternoonSurveyStates = async () => {
  try {
    const statesJson = await AsyncStorage.getItem("afternoonSurveyStates");
    if (statesJson) {
      return JSON.parse(statesJson);
    } else {
      return {
        objtransportation: "pending",
        objfood: "pending",
        objutility: "pending",
      };
    }
  } catch (e) {
    console.log("Failed to load states: ", e);
  }
};
const loadNightSurveyStates = async () => {
  try {
    const statesJson = await AsyncStorage.getItem("nightSurveyStates");
    if (statesJson) {
      return JSON.parse(statesJson);
    } else {
      return {
        objtransportation: "pending",
        objfood: "pending",
        objutility: "pending",
      };
    }
  } catch (e) {
    console.log("Failed to load states: ", e);
  }
};

const loadStates = async () => {
  try {
    const statesJson = await AsyncStorage.getItem("states");
    if (statesJson) {
      return JSON.parse(statesJson);
    } else {
      return {
        objmorning: "pending",
        objafternoon: "pending",
        objnight: "pending",
      };
    }
  } catch (e) {
    console.log("Failed to load states:", e);
  }
};

const loadDay = async () => {
  try {
    const storedData = await AsyncStorage.getItem("previousDate");
    // console.log(storedData)
    return storedData;
  } catch (e) {
    console.log("Failed to load day");
  }
};

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);
const GlobalProvider = ({ children }) => {
  // const [states, setStates] = useState()
  const [morningTransportation, setMorningTransportation] = useState("pending");
  const [morningFood, setMorningFood] = useState("pending");
  const [morningUtility, setMorningUtility] = useState("pending");
  const [afternoonTransportation, setAfternoonTransportation] =
    useState("pending");
  const [afternoonFood, setAfternoonFood] = useState("pending");
  const [afternoonUtility, setAfternoonUtility] = useState("pending");
  const [nightTransportation, setNightTransportation] = useState("pending");
  const [nightFood, setNightFood] = useState("pending");
  const [nightUtility, setNightUtility] = useState("pending");
  const [morning, setMorning] = useState("pending");
  const [afternoon, setAfternoon] = useState("pending");
  const [night, setNight] = useState("pending");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [previousDate, setPreviousDate] = useState(null);

  const loadInitialMorningSurveyStates = async () => {
    const initialStates = await loadMorningSurveyStates();
    setMorningTransportation(initialStates.objtransportation);
    setMorningFood(initialStates.objfood);
    setMorningUtility(initialStates.objutility);
    return initialStates;
  };
  const loadInitialAfternoonSurveyStates = async () => {
    const initialStates = await loadAfternoonSurveyStates();
    setAfternoonTransportation(initialStates.objtransportation);
    setAfternoonFood(initialStates.objfood);
    setAfternoonUtility(initialStates.objutility);
    return initialStates;
  };
  const loadInitialNightSurveyStates = async () => {
    const initialStates = await loadNightSurveyStates();
    setNightTransportation(initialStates.objtransportation);
    setNightFood(initialStates.objfood);
    setNightUtility(initialStates.objutility);
    return initialStates;
  };

  const loadInitialStates = async () => {
    const initialStates = await loadStates();
    setMorning(initialStates.objmorning);
    setAfternoon(initialStates.objafternoon);
    setNight(initialStates.objnight);
    return initialStates;
  };

  const loadInitialDays = async () => {
    const initialDate = moment();
    // console.log('initial')
    // console.log(initialDate)
    const storedDate = await loadDay();
    setPreviousDate(storedDate ? moment(storedDate) : initialDate);
    // console.log(previousDate)
    return storedDate;
  };

  // useEffect(() => {
  //   loadInitialStates()
  // }, [])
  useEffect(() => {
    loadInitialDays();
  }, []);
  useEffect(() => {
    const updateStates = async () => {
      const currentHour = new Date().getHours();
      let prevDate = await loadInitialDays();
      const currentDate = moment();
      // console.log(currentDate.date())
      const isNewDay = currentDate.date() != moment(prevDate).date();

      if (isNewDay) {
        let myobj = await loadInitialStates();
        let morningSurveyStates = await loadInitialMorningSurveyStates();
        morningSurveyStates.objtransportation = "pending";
        morningSurveyStates.objfood = "pending";
        morningSurveyStates.objutility = "pending";
        setMorningTransportation("pending");
        setMorningFood("pending");
        setMorningUtility("pending");
        let afternoonSurveyStates = await loadInitialAfternoonSurveyStates();
        afternoonSurveyStates.objtransportation = "pending";
        afternoonSurveyStates.objfood = "pending";
        afternoonSurveyStates.objutility = "pending";
        setAfternoonTransportation("pending");
        setAfternoonFood("pending");
        setAfternoonUtility("pending");
        let nightSurveyStates = await loadInitialNightSurveyStates();
        nightSurveyStates.objtransportation = "pending";
        nightSurveyStates.objfood = "pending";
        nightSurveyStates.objutility = "pending";
        setNightTransportation("pending");
        setNightFood("pending");
        setNightUtility("pending");

        myobj.objmorning = "pending";
        myobj.objafternoon = "pending";
        myobj.objnight = "pending";
        setMorning(myobj.objmorning);
        setAfternoon(myobj.objafternoon);
        setNight(myobj.objnight);
        setPreviousDate(currentDate);

        await AsyncStorage.setItem("previousDate", currentDate.toISOString());
        await saveStates(myobj);
        await saveMorningSurveyStates(morningSurveyStates);
        await saveAfternoonSurveyStates(afternoonSurveyStates);
        await saveNightSurveyStates(nightSurveyStates);
      }
      let myobj = await loadInitialStates();
      let morningSurveyStates = await loadInitialMorningSurveyStates();
      let afternoonSurveyStates = await loadInitialAfternoonSurveyStates();
      let nightSurveyStates = await loadInitialNightSurveyStates();

      let newMorning = "pending";
      let newAfternoon = "pending";
      let newNight = "pending";

      if (
        currentHour >= 0 &&
        currentHour <= 23 &&
        myobj.objmorning != "completed"
      ) {
        newMorning = "ready";
      } else if (myobj.objmorning == "completed") {
        newMorning = "completed";
      } else {
        newMorning = "pending";
      }

      if (currentHour >= 12 && myobj.objafternoon != "completed") {
        newAfternoon = "ready";
      } else if (myobj.objafternoon === "completed") {
        newAfternoon = "completed";
      } else {
        newAfternoon = "pending";
      }

      if (currentHour >= 18 && myobj.objnight != "completed") {
        newNight = "ready";
      } else if (myobj.objnight == "pending") {
        newNight = "pending";
      } else if (myobj.objnight === "completed") {
        newNight = "completed";
      }

      myobj.objmorning = newMorning;
      myobj.objafternoon = newAfternoon;
      myobj.objnight = newNight;
      setMorning(newMorning);
      setAfternoon(newAfternoon);
      setNight(newNight);
      setMorningTransportation(morningSurveyStates.objtransportation);
      setMorningFood(morningSurveyStates.objfood);
      setMorningUtility(morningSurveyStates.objutility);
      setAfternoonTransportation(afternoonSurveyStates.objtransportation);
      setAfternoonFood(afternoonSurveyStates.objfood);
      setAfternoonUtility(afternoonSurveyStates.objutility);
      setNightTransportation(nightSurveyStates.objtransportation);
      setNightFood(nightSurveyStates.objfood);
      setNightUtility(nightSurveyStates.objutility);

      await saveStates(myobj);
    };

    updateStates();
    const interval = setInterval(updateStates, 60 * 60 * 1000); // update every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        isLoading,
        morning,
        setMorning,
        afternoon,
        setAfternoon,
        night,
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
        setAfternoonTransportation,
        afternoonFood,
        setAfternoonFood,
        afternoonUtility,
        setAfternoonUtility,
        saveAfternoonSurveyStates,
        loadAfternoonSurveyStates,
        nightTransportation,
        setNightTransportation,
        nightFood,
        setNightFood,
        nightUtility,
        setNightUtility,
        loadNightSurveyStates,
        saveNightSurveyStates,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
