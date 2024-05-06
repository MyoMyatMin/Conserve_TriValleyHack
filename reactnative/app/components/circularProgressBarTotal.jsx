import { View, Text, Animated, TextInput,StyleSheet, Alert, Image } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { Circle, G, Svg } from 'react-native-svg'

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const CircularProgressBarTotal = ({
  percentage = 1200,
  radius = 40,
  strokeWidth = radius/10,
  duration = 800,
  color = '#26D6AF',
  backColor = '#271D3B',
  delay = 2,
  textColor = '#FFFFFF',
  max = 1000,
  imageSource,
  title
}) => {
  
  const animatedValue = useRef(new Animated.Value(0)).current;
  const circleRef = useRef();
  const inputRef = useRef();
  const halfCircle = radius + strokeWidth;
  const circleCircumference = 2 * Math.PI * radius;

  const animation = (toValue) => {
    return Animated.timing(animatedValue, {
      toValue,
      delay,
      duration,
      useNativeDriver: true
    }).start();
  }

  useEffect(() => {
    animation(percentage);
    animatedValue.addListener((v) => {
      if (circleRef?.current) {
        const maxPerc = (100 * v.value) / max;
        const strokeDashoffset = circleCircumference - (circleCircumference * maxPerc) / 100;
        if (strokeDashoffset >= 0) {
          circleRef.current.setNativeProps({
            strokeDashoffset,
          });
        }
        else{
          circleRef.current.setNativeProps({
            max
          });
        }
        
      }

      if (inputRef?.current) {
        inputRef.current.setNativeProps({
          text: `${Math.round((v.value / max) * 100)}%`,
        });
      }
    });
    
    return () => {
      animatedValue.removeAllListeners(); // Cleanup listener
    };
  }, [max, percentage]);

  const circleStrokeColor = percentage >= max ? 'red' : color;

  return (
    <View className="flex justify-center items-center">
      <Svg width={radius * 2} height={radius * 2} viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}>
        <G rotation='-90' origin={`${halfCircle}, ${halfCircle}`}>
          <Circle
            cx='50%'
            cy='50%'
            stroke={backColor}
            strokeWidth={strokeWidth}
            r={radius}
            fill="transparent"
          />
          <AnimatedCircle
            ref={circleRef}
            cx='50%'
            cy='50%'
            stroke={circleStrokeColor}
            strokeWidth={strokeWidth}
            r={radius}
            fill="transparent"
            strokeDasharray={circleCircumference}
            strokeDashoffset={circleCircumference}
            strokeLinecap='round'
          />
          <View 
            style={{
              position: 'absolute',
              width: radius *1.5,
              height: radius,
              left: radius *0.3,
              top: radius * 0.6,
            }}
            className="flex items-center">
            <Text className="text-secondary mt-2">{title}</Text>
            <AnimatedTextInput
                ref={inputRef}
                underlineColorAndroid="transparent"
                editable={false}
                defaultValue="0"
                style={[
                    { fontSize: radius / 3, color: textColor ?? color },
                    {fontWeight: '500', marginTop: 5}
                ]}
            />
          </View>
        </G>
       
      </Svg>
    </View>
  );
}
export default CircularProgressBarTotal;