import { View, Text, Modal, Image, TouchableWithoutFeedback } from 'react-native';
import React from 'react';
import { icons } from '../../constants';

const DataDetail = ({ amount, modalVisible, closeModal }) => {
  return (
    <Modal animationType='fade' transparent={true} visible={modalVisible} onRequestClose={closeModal}>
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View className="bg-purple-100 justify-center rounded-3xl min-h-16 items-center flex-row py-3 mx-4">
              <Image
                className='px-6'
                source={icons.carbon}
                style={{
                  width: 35,
                  height: 35,
                  resizeMode: 'contain',
                }}
              />
              <Text className="text-purple flex-1 text-center px-1">Your Carbon Emission: {amount} KG</Text>
              <TouchableWithoutFeedback onPress={closeModal}>
                <Image
                  className='px-6'
                  source={icons.earth}
                  style={{
                    width: 25,
                    height: 25,
                    resizeMode: 'contain',
                  }}
                />
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default DataDetail;
