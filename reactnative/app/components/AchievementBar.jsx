import { View, Text ,Image} from 'react-native'
import React from 'react'
import { icons } from '../../constants'
const AchievementBar = ({ title}) => {
    return (
      <View className={"bg-green rounded-3xl min-h-16 items-center flex-row py-3 px-4 "}>
        <Image
          source={icons.trophy}
          style={{
            width: 40,
            height: 40,
            resizeMode: 'contain',
            marginRight: 5,
          }}
        />
        <Text className="text-xl text-secondary flex-1 text-center pr-11">
          {title}
         
        </Text>
       
      </View>
    );
  };
 
export default AchievementBar