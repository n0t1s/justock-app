import { useAssets } from 'expo-asset';
import { ResizeMode, Video } from 'expo-av';
import { useRouter } from 'expo-router';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { View, Text, XStack } from 'tamagui';

const Page = () => {
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
        <Text fontSize="$9" fontWeight="900" textTransform="uppercase">
          Elevate Your Financial Game with Justock!
        </Text>
      </View>
      <XStack
        justifyContent="center"
        gap="$5"
        marginBottom="$11"
        paddingHorizontal="$5"
      >
        <TouchableOpacity
          onPress={() => router.push('/login')}
          style={[styles.buttons, { backgroundColor: '#141518' }]}
        >
          <Text fontSize="$7">Log in</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push('/signup')}
          style={[styles.buttons, { backgroundColor: 'white' }]}
        >
          <Text fontSize="$7" color="$color1">
            Sign up
          </Text>
        </TouchableOpacity>
      </XStack>
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    flex: 1,
    padding: 10,
    height: 60,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Page;
