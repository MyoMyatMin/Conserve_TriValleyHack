import { View, Image, StyleSheet } from 'react-native'
import React from 'react'

const ImageView = ({ placeholderImageSource, selectedImage }) => {
  const imageSource = selectedImage ? { uri: selectedImage } : placeholderImageSource;
  return (
    <View style={styles.imageContainer}>
      <Image source={imageSource} style={styles.image} />
    </View>
  );
  }

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  }
});

export default ImageView;
