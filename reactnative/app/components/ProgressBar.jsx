import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Image } from 'react-native';
import { icons } from '../../constants';

const ProgressBar = () => {
  const [progress] = useState(new Animated.Value(0));
  const [value] = useState(70);
  const [barColor, setBarColor] = useState('#26D6AF');

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 100,
      duration: 2000,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  useEffect(() => {
    if (value > 75 && value < 100) {
      setBarColor('#e3a024');
    } else if (value >= 100) {
      setBarColor('#db2212');
    }
  }, [value]);

  const widthInterpolate = progress.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', `${value}%`]
  });

  return (
    <View style={styles.container}>
      <Image style={styles.barIcon} source={icons.electricity} resizeMode='contain'/>
      <Animated.View style={[styles.bar, { width: widthInterpolate, backgroundColor: barColor }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  barIcon: {
    position: 'absolute',
    left: 10,
    top: 2,
    zIndex: 2,
    width: 30,
    padding: 2
  },
  container: {
    height: 36,
    backgroundColor: '#271D3B',
    borderRadius: 10,
    margin: 10,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    borderRadius: 10,
    position: 'absolute',
    left: 0,
    top: 0,
  },
});

export default ProgressBar;
