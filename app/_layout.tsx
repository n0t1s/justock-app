import Colors from "@/constants/Colors";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Link, SplashScreen, Stack, useRouter, useSegments } from "expo-router";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { TamaguiProvider, View } from "tamagui";
import "../tamagui-web.css";
import { config } from "../tamagui.config";
const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
import * as SecureStore from "expo-secure-store";

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
  const [loaded, error] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });
  const colorScheme = useColorScheme() as "light" | "dark";
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    if (!isLoaded) return;
    const inAuthGroup = segments[0] === "(authenticated)";

    if (isSignedIn && !inAuthGroup) {
      router.replace("/(authenticated)/(tabs)/home");
    } else if (!isSignedIn) {
      router.replace("/");
    }
  }, [isSignedIn]);

  if (!loaded || !isLoaded) {
    return (
      <TamaguiProvider config={config} defaultTheme={colorScheme as any}>
        <View flex={1} justifyContent="center" alignItems="center">
          <ActivityIndicator size="large" />
        </View>
      </TamaguiProvider>
    );
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
          <Stack.Screen
            name="verify/[phone]"
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
            }}
          />
          <Stack.Screen
            name="(authenticated)/(tabs)"
            options={{ headerShown: false }}
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
