import React, { useCallback } from "react";
import { View, Text, XStack, YStack } from "tamagui";
import { StyleSheet, useColorScheme } from "react-native";
import ButtonComponent from "./ButtonComponent";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { useWarmUpBrowser } from "@/hooks/useWarmupBrowser";
import { useOAuth } from "@clerk/clerk-expo";

enum Strategy {
  Google = "oauth_google",
  Apple = "oauth_apple",
  Facebook = "oauth_facebook",
}

const OAuthSection = () => {
  useWarmUpBrowser();
  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: "oauth_google" });
  const { startOAuthFlow: appleAuth } = useOAuth({ strategy: "oauth_apple" });
  const { startOAuthFlow: facebookAuth } = useOAuth({
    strategy: "oauth_facebook",
  });
  const colorScheme = useColorScheme() as "light" | "dark";

  const onSelectAuth = useCallback(async (strategy: Strategy) => {
    const selectedAuth = {
      [Strategy.Google]: googleAuth,
      [Strategy.Apple]: appleAuth,
      [Strategy.Facebook]: facebookAuth,
    }[strategy];

    try {
      const { createdSessionId, setActive } = await selectedAuth();
      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

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
        <ButtonComponent
          onPress={() => onSelectAuth(Strategy.Google)}
          theme="alt1"
        >
          <Ionicons
            name="logo-google"
            size={24}
            color={Colors[colorScheme].IconDefault}
          />
          <Text fontSize="$5">Continue with Google</Text>
        </ButtonComponent>

        <ButtonComponent
          onPress={() => onSelectAuth(Strategy.Apple)}
          theme="alt1"
        >
          <Ionicons
            name="logo-apple"
            size={24}
            color={Colors[colorScheme].IconDefault}
          />
          <Text fontSize="$5">Continue with Apple</Text>
        </ButtonComponent>

        <ButtonComponent
          theme="alt1"
          onPress={() => onSelectAuth(Strategy.Facebook)}
        >
          <Ionicons
            name="logo-facebook"
            size={24}
            color={Colors[colorScheme].IconDefault}
          />
          <Text fontSize="$5">Continue with Facebook</Text>
        </ButtonComponent>
      </YStack>
    </View>
  );
};

export default OAuthSection;
