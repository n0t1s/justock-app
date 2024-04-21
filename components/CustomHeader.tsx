import React from "react";
import Colors from "@/constants/Colors";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Avatar, Input, View, XStack } from "tamagui";
import { useColorScheme } from "react-native";

const CustomHeader = () => {
  const { top } = useSafeAreaInsets();
  const { user } = useUser();
  const { signOut } = useAuth();
  const colorScheme = useColorScheme() as "light" | "dark";

  return (
    <BlurView intensity={80} style={{ paddingTop: top, paddingBottom: 14 }}>
      <XStack
        paddingHorizontal="$4"
        gap="$4"
        justifyContent="space-between"
        alignItems="center"
      >
        <Avatar circular onPress={async () => await signOut()}>
          <Avatar.Image accessibilityLabel="Cam" src={user?.imageUrl} />
          <Avatar.Fallback backgroundColor="$red10" />
        </Avatar>
        <View flex={1}>
          <Input placeholder="Search" borderRadius="$8" paddingLeft="$7" />
          <Ionicons
            name="search"
            size={20}
            color={Colors[colorScheme].IconDefault}
            style={{ position: "absolute", padding: 12 }}
          />
        </View>
        <View
          width={40}
          height={40}
          borderRadius="$8"
          justifyContent="center"
          alignItems="center"
          backgroundColor="$color4"
        >
          <Ionicons
            name={"stats-chart"}
            size={20}
            color={Colors[colorScheme].IconDefault}
          />
        </View>
        <View
          width={40}
          height={40}
          borderRadius="$8"
          justifyContent="center"
          alignItems="center"
          backgroundColor="$color4"
        >
          <Ionicons
            name={"card"}
            size={20}
            color={Colors[colorScheme].IconDefault}
          />
        </View>
      </XStack>
    </BlurView>
  );
};

export default CustomHeader;
