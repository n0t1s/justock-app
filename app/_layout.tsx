import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { SplashScreen, Stack, useRouter } from 'expo-router';
import { TouchableOpacity, useColorScheme } from 'react-native';
import { TamaguiProvider } from 'tamagui';
import { Ionicons } from '@expo/vector-icons';
import '../tamagui-web.css';

import { config } from '../tamagui.config';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import Colors from '@/constants/Colors';

export { ErrorBoundary } from 'expo-router';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [interLoaded, interError] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  useEffect(() => {
    if (interLoaded || interError) {
      SplashScreen.hideAsync();
    }
  }, [interLoaded, interError]);

  if (!interLoaded && !interError) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme() as 'light' | 'dark';
  const router = useRouter();

  return (
    <TamaguiProvider config={config} defaultTheme={colorScheme as any}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen
            name="signup"
            options={{
              title: '',
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
        </Stack>
      </ThemeProvider>
    </TamaguiProvider>
  );
}
