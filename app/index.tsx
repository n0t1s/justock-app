import React from 'react';
import { useAssets } from 'expo-asset';
import { ResizeMode, Video } from 'expo-av';
import { useRouter } from 'expo-router';
import { View, Text, XStack } from 'tamagui';
import { ButtonComponent } from '@/components';

const LandingPage = () => {
  const [assets] = useAssets([require('@/assets/videos/intro.mp4')]);
  const router = useRouter();
  return (
    <View flex={1} justifyContent="space-between">
      {assets && (
        <Video
          resizeMode={ResizeMode.COVER}
          isMuted
          isLooping
          shouldPlay
          source={{ uri: assets[0].uri }}
          style={{ width: '100%', height: '100%', position: 'absolute' }}
        />
      )}
      <View style={{ marginTop: 80, padding: 20 }}>
        <Text
          fontSize="$9"
          fontWeight="900"
          textTransform="uppercase"
          color="$white2"
        >
          Elevate Your Financial Game with Justock!
        </Text>
      </View>
      <XStack
        justifyContent="center"
        gap="$5"
        marginBottom="$11"
        paddingHorizontal="$5"
      >
        <ButtonComponent
          theme="alt1"
          onPress={() => router.push('/login')}
          flex={1}
        >
          Log in
        </ButtonComponent>
        <ButtonComponent
          theme="alt1"
          onPress={() => router.push('/signup')}
          flex={1}
          themeInverse
        >
          Sign up
        </ButtonComponent>
      </XStack>
    </View>
  );
};

export default LandingPage;
