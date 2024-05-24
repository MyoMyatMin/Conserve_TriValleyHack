import { useContext, useState, createContext, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import moment from 'moment'

const saveStates = async (states) => {
  try {
    await AsyncStorage.setItem('states', JSON.stringify(states))
  } catch (e) {
    console.log('Failed to save states:', e)
  }
}

const loadStates = async () => {
  try {
    const statesJson = await AsyncStorage.getItem('states')
    if (statesJson) {
      return JSON.parse(statesJson)
    } else {
      return {
        objmorning: 'pending',
        objafternoon: 'pending',
        objnight: 'pending',
      }
    }
  } catch (e) {
    console.log('Failed to load states:', e)
  }
}

const loadDay = async () => {
  try {
    const storedData = await AsyncStorage.getItem('previousDate')
    // console.log(storedData)
    return storedData
  } catch (e) {
    console.log('Failed to load day')
  }
}

const GlobalContext = createContext()
export const useGlobalContext = () => useContext(GlobalContext)
const GlobalProvider = ({ children }) => {
  // const [states, setStates] = useState()
  const [morning, setMorning] = useState('pending')
  const [afternoon, setAfternoon] = useState('pending')
  const [night, setNight] = useState('pending')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [previousDate, setPreviousDate] = useState(null)

  const loadInitialStates = async () => {
    const initialStates = await loadStates()
    setMorning(initialStates.objmorning)
    setAfternoon(initialStates.objafternoon)
    setNight(initialStates.objnight)
    return initialStates
  }

  const loadInitialDays = async () => {
    const initialDate = moment()
    // console.log('initial')
    // console.log(initialDate)
    const storedDate = await loadDay()
    setPreviousDate(storedDate ? moment(storedDate) : initialDate)
    // console.log(previousDate)
    return storedDate
  }

  // useEffect(() => {
  //   loadInitialStates()
  // }, [])
  useEffect(() => {
    loadInitialDays()
  }, [])
  useEffect(() => {
    const updateStates = async () => {
      const currentHour = new Date().getHours()
      let prevDate = await loadInitialDays()
      const currentDate = moment()
      // console.log(currentDate.date())
      const isNewDay = currentDate.date() != moment(prevDate).date()

      if (isNewDay) {
        let myobj = await loadInitialStates()
        myobj.objmorning = 'pending'
        myobj.objafternoon = 'pending'
        myobj.objnight = 'pending'
        setMorning(myobj.objmorning)
        setAfternoon(myobj.objafternoon)
        setNight(myobj.objnight)
        setPreviousDate(currentDate)
        await AsyncStorage.setItem('previousDate', currentDate.toISOString())
        await saveStates(myobj)
      }
      let myobj = await loadInitialStates()
      let newMorning = 'pending'
      let newAfternoon = 'pending'
      let newNight = 'pending'

      if (
        currentHour >= 0 &&
        currentHour <= 23 &&
        myobj.objmorning != 'completed'
      ) {
        newMorning = 'ready'
      } else if (myobj.objmorning == 'completed') {
        newMorning = 'completed'
      } else {
        newMorning = 'pending'
      }

      if (currentHour >= 12 && myobj.objafternoon != 'completed') {
        newAfternoon = 'ready'
      } else if (myobj.objafternoon === 'completed') {
        newAfternoon = 'completed'
      } else {
        newAfternoon = 'pending'
      }

      if (currentHour >= 18 && myobj.objnight != 'completed') {
        newNight = 'ready'
      } else if (myobj.objnight == 'pending') {
        newNight = 'pending'
      } else if (myobj.objnight === 'completed') {
        newNight = 'completed'
      }

      myobj.objmorning = newMorning
      myobj.objafternoon = newAfternoon
      myobj.objnight = newNight
      setMorning(newMorning)
      setAfternoon(newAfternoon)
      setNight(newNight)

      await saveStates(myobj)
    }

    updateStates()
    const interval = setInterval(updateStates, 60 * 60 * 1000) // update every minute
    return () => clearInterval(interval)
  }, [])

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
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider
