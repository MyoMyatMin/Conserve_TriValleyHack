import { View, Text, Modal, Image, TouchableWithoutFeedback } from 'react-native';
import React from 'react';
import { icons } from '../../constants';

const DataDetail = ({ amount, time, maxAvg, type, modalVisible, closeModal }) => {
  return (
    <Modal animationType='fade' transparent={true} visible={modalVisible} onRequestClose={closeModal}>
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View className="bg-purple-100 justify-center rounded-3xl min-h-16 items-center  py-3 mx-4">
              <View className='justify-center rounded-3xl min-h-16 items-center flex-row'>
                <Image
                className='px-6'
                source={icons.carbon}
                style={{
                  width: 35,
                  height: 35,
                  resizeMode: 'contain',
                }}
                />
                <Text className="text-xl text-purple font-bold flex-1 text-center px-1">DATA DETAILS</Text>
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
              <View className='  px-3'>
                <Text className='text-purple text-center pt-5'>Your Current emission amount: {amount}kgs</Text> 
               
                <Text className='text-purple font-semibold text-center pt-5 '>
                  Tip: It is recommented to keep your {time}  {type} emission amount under {maxAvg} kgs to CONSERVE!
                </Text>                       
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
// Your Carbon Emission: {amount} KG
export default DataDetail;
