import Colors from "@/constants/Colors";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Link, SplashScreen, Stack, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { TouchableOpacity, useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { TamaguiProvider } from "tamagui";
import "../tamagui-web.css";
import { config } from "../tamagui.config";
const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
import * as SecureStore from "expo-secure-store";

// Cache the Clerk JWT
const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export { ErrorBoundary } from "expo-router";

SplashScreen.preventAutoHideAsync();

function InitialLayout() {
  const [interLoaded, interError] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });
  const colorScheme = useColorScheme() as "light" | "dark";
  const router = useRouter();

  useEffect(() => {
    if (interLoaded || interError) {
      SplashScreen.hideAsync();
    }
  }, [interLoaded, interError]);

  if (!interLoaded && !interError) {
    return null;
  }

  return (
    <TamaguiProvider config={config} defaultTheme={colorScheme as any}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen
            name="signup"
            options={{
              title: "",
              headerShadowVisible: false,
              headerStyle: { backgroundColor: Colors[colorScheme].background },
              headerLeft: () => (
                <TouchableOpacity onPress={router.back}>
                  <Ionicons
                    name="arrow-back"
                    size={32}
                    color={Colors[colorScheme].IconDefault}
                  />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="login"
            options={{
              title: "",
              headerBackTitle: "",
              headerShadowVisible: false,
              headerStyle: { backgroundColor: Colors[colorScheme].background },
              headerLeft: () => (
                <TouchableOpacity onPress={router.back}>
                  <Ionicons
                    name="arrow-back"
                    size={34}
                    color={Colors[colorScheme].IconDefault}
                  />
                </TouchableOpacity>
              ),
              headerRight: () => (
                <Link href={"/help"} asChild>
                  <TouchableOpacity>
                    <Ionicons
                      name="help-circle-outline"
                      size={34}
                      color={Colors[colorScheme].IconDefault}
                    />
                  </TouchableOpacity>
                </Link>
              ),
            }}
          />
          <Stack.Screen
            name="help"
            options={{ title: "Help", presentation: "modal" }}
          />
        </Stack>
      </ThemeProvider>
    </TamaguiProvider>
  );
}

export default function RootLayoutNav() {
  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY!}
      tokenCache={tokenCache}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <InitialLayout />
      </GestureHandlerRootView>
    </ClerkProvider>
  );
}
