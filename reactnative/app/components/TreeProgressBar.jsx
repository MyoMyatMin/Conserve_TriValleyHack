import { View, Text, Animated, Image } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Circle, G, Svg } from "react-native-svg";
import { icons } from "../../constants";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const TreeProgressBar = ({
  noOfTree,
  percentage = 0,
  radius = 90,
  strokeWidth = radius / 10,
  duration = 800,
  color = "#EBFF00",
  backColor = "#271D3B",
  delay = 2,
  max = 70,
  imageSource,
}) => {
  const [treeCount, setTreeCount] = useState(0);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const circleRef = useRef();
  const halfCircle = radius + strokeWidth;
  const circleCircumference = 2 * Math.PI * radius;

  const animation = (toValue) => {
    return Animated.timing(animatedValue, {
      toValue,
      delay,
      duration,
      useNativeDriver: true,
    }).start(() => {
      if (toValue === max) {
        setTreeCount((prevCount) => prevCount + 1);
        animatedValue.setValue(0);
        animation(0);
      }
    });
  };

  useEffect(() => {
    animation(percentage);
    animatedValue.addListener((v) => {
      if (circleRef?.current) {
        const maxPerc = (100 * v.value) / max;
        const strokeDashoffset =
          circleCircumference - (circleCircumference * maxPerc) / 100;
        circleRef.current.setNativeProps({
          strokeDashoffset,
        });
      }
    });

    return () => {
      animatedValue.removeAllListeners();
    };
  }, [max, percentage]);

  const circleStrokeColor = color;

  return (
    <View className="flex justify-center items-center my-5">
      <Svg
        width={radius * 2}
        height={radius * 2}
        viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}
      >
        <G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}>
          <Circle
            cx="50%"
            cy="50%"
            stroke={backColor}
            strokeWidth={strokeWidth}
            r={radius}
            fill="transparent"
          />
          <AnimatedCircle
            ref={circleRef}
            cx="50%"
            cy="50%"
            stroke={circleStrokeColor}
            strokeWidth={strokeWidth}
            r={radius}
            fill="transparent"
            strokeDasharray={circleCircumference}
            strokeDashoffset={circleCircumference}
            strokeLinecap="round"
          />
          <Image
            source={icons.tree}
            style={{
              position: "absolute",
              width: radius,
              height: radius,
              left: radius * 0.5,
              top: radius * 0.5,
              resizeMode: "contain",
            }}
          />
        </G>
      </Svg>

      <View className="bg-green-300 rounded-3xl min-h-10 flex-row items-center py-3 px-4 my-1">
        <Text className="text-lg text-white">You saved: {noOfTree}</Text>
        <Image
          source={icons.tree}
          className="w-5 h-5 ml-2"
          style={{ resizeMode: "contain" }}
        />
      </View>
    </View>
  );
};

export default TreeProgressBar;
