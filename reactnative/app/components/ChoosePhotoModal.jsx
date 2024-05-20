import { View, Text,Modal, TouchableOpacity } from 'react-native'
import React from 'react'

const ChoosePhotoModal = ({takeImageAsync, handleCancel, pickImageAsync, modalVisible}) => {
  return (
    <View>
      <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
        >
          <View className="bg-secondary w-full absolute bottom-0 rounded">
            <TouchableOpacity onPress={takeImageAsync}>
              <View className="bg-secondary-100 m-2 rounded items-center justify-center w-auto h-[56]">
                <Text className="text-l color-secondary">Take Photo</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={pickImageAsync}>
              <View className="bg-secondary-100 m-2 rounded items-center justify-center w-auto h-[56]">
                <Text className="text-l color-secondary">Choose from Library</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCancel}>
              <View className="bg-secondary-100 m-2 rounded items-center justify-center w-auto h-[56]">
                <Text className="text-l color-secondary">Cancel</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Modal>
    </View>
  )
}

export default ChoosePhotoModal