import React from "react";
import { TouchableOpacity, useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { View, Text } from "tamagui";
import Colors from "@/constants/Colors";

type ButtonRoundedProps = {
  icon: typeof Ionicons.defaultProps;
  text: string;
  onPress?: () => void;
};

const ButtonRounded = ({ icon, text, onPress }: ButtonRoundedProps) => {
  const colorScheme = useColorScheme() as "light" | "dark";
  return (
    <TouchableOpacity
      style={{
        alignItems: "center",
        gap: 10,
      }}
      onPress={onPress}
    >
      <View
        width={60}
        height={60}
        borderRadius={30}
        justifyContent="center"
        alignItems="center"
        backgroundColor="$green10Dark"
      >
        <Ionicons
          name={icon}
          size={30}
          color={Colors[colorScheme].IconDefault}
        />
      </View>
      <Text fontSize="$4" fontWeight="500">
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonRounded;
