import { View, Text,Image,TouchableOpacity } from 'react-native'
import React from 'react'
import { icons } from '../../constants'

const CardProfile = ({handleChoosePhoto, records}) => {
  return (
    <View className="min-w-full p-6 my-6 bg-purple rounded-2xl">
          <View className="flex flex-row justify-start items-center gap-x-4 mb-6">
            <View>
              <TouchableOpacity onPress={handleChoosePhoto}>
                <Image
                  //source={images.profile}
                  source={
                    records.profilePic? {
                    uri: records.profilePic,
                  }: icons.user}
                  className="rounded-full w-[48] h-[48]"
                  resizeMode="contain"
                />
              </TouchableOpacity>
              
            </View>
            <View className="border-b-[2px] border-secondary">
              <Text className="text-2xl font-psemibold text-secondary">
                {records.username}
              </Text>
            </View>
          </View>

          <Text className="text-l my-2 font-psemibold text-secondary">
            Email : {records.email}
          </Text>
          <Text className="text-l my-2 font-psemibold text-secondary">
            Achievements : {records.achievements}
          </Text>
          <Text className="text-l my-2 font-psemibold text-secondary">
            Highest Streak: {records.highestStreak} days
          </Text>
          <Text className="text-l my-2 font-psemibold text-secondary">
            Current Streak: {records.currentStreak} days
          </Text>
          <Text className="text-l my-2 font-psemibold text-secondary">
            Account Age: {records.accountAgeInDays} days
          </Text>
        </View>
  )
}

export default CardProfile