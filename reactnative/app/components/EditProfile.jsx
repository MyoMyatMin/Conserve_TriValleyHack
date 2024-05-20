import { View, Text, Modal, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { icons, images } from '../../constants'
import ImageView from './ImageView'

const EditProfile = ({ pickImageAsync, editModalVisible, records, handleSaveUpdate, selectedImage }) => {
  const [editedUserName, setEditedUserName] = useState(records.username)
  const saveUpdate = () => {
    const updatedData = {
      username: editedUserName,
      profilePic: selectedImage
    };
    handleSaveUpdate(updatedData)
  }
  return (
    <Modal
      visible={editModalVisible}
      animationType="slide"
    >
      <View className="flex h-full items-center justify-center">
        <View className="min-w-full max-w-sm p-6 my-12 bg-purple rounded-2xl">
          <View>
            <TouchableOpacity onPress={pickImageAsync}>
              <ImageView placeholderImageSource={icons.profile} selectedImage={selectedImage} />
            </TouchableOpacity>
          </View>
          <View className="border-b-[2px] border-secondary">
              <TextInput
                className="text-xl text-secondary border-b-[2px] border-secondary mt-4"
                onChangeText={setEditedUserName}
            >{records.username}</TextInput>
                
          </View>
          <TouchableOpacity onPress={saveUpdate}>
            <View className="bg-secondary-100 m-6 rounded items-center justify-center w-auto h-[56]">
              <Text className="text-xl text-secondary">Save</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

export default EditProfile
