import { Tabs } from "expo-router";
import {
  Octicons,
  AntDesign,
  FontAwesome6,
  MaterialIcons,
} from "@expo/vector-icons";
import { colorTokens } from "@tamagui/themes";
import { BlurView } from "expo-blur";
import { CustomHeader } from "@/components";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colorTokens.light.green.green9,
        tabBarBackground: () => (
          <BlurView
            intensity={70}
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.05)",
            }}
          />
        ),
        tabBarStyle: {
          backgroundColor: "transparent",
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          borderTopWidth: 0,
          paddingTop: 7,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Octicons name="home" size={size} color={color} />
          ),
          header: () => <CustomHeader />,
          headerTransparent: true,
        }}
      />
      <Tabs.Screen
        name="invest"
        options={{
          title: "Invest",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="linechart" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="transfers"
        options={{
          title: "Transfers",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6
              name="money-bill-transfer"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="lifestyle"
        options={{
          title: "Lifestyle",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="nightlife" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
