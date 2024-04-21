import React from "react";
import { View, Text, XStack, YStack } from "tamagui";
import { StyleSheet, useColorScheme } from "react-native";
import ButtonComponent from "./ButtonComponent";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

const OAuthSection = () => {
  const colorScheme = useColorScheme() as "light" | "dark";
  return (
    <View flex={1} padding="$4">
      <XStack style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
        <View
          height={StyleSheet.hairlineWidth}
          flex={1}
          backgroundColor="$color11"
        />
        <Text fontSize="$6">or</Text>
        <View
          height={StyleSheet.hairlineWidth}
          flex={1}
          backgroundColor="$color11"
        />
      </XStack>

      <YStack gap="$5" marginVertical="$5">
        <ButtonComponent onPress={() => {}} theme="alt1">
          <Ionicons
            name="logo-google"
            size={24}
            color={Colors[colorScheme].IconDefault}
          />
          <Text fontSize="$5">Continue with Google</Text>
        </ButtonComponent>

        <ButtonComponent onPress={() => {}} theme="alt1">
          <Ionicons
            name="logo-apple"
            size={24}
            color={Colors[colorScheme].IconDefault}
          />
          <Text fontSize="$5">Continue with Apple</Text>
        </ButtonComponent>

        <ButtonComponent theme="alt1" onPress={() => {}}>
          <Ionicons
            name="logo-microsoft"
            size={24}
            color={Colors[colorScheme].IconDefault}
          />
          <Text fontSize="$5">Continue with Microsoft</Text>
        </ButtonComponent>
      </YStack>
    </View>
  );
};

export default OAuthSection;
