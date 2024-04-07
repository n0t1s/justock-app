import { Tabs } from "expo-router";
import {
  Octicons,
  AntDesign,
  FontAwesome6,
  MaterialIcons,
} from "@expo/vector-icons";
import { colorTokens } from "@tamagui/themes";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colorTokens.light.green.green9,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Octicons name="home" size={size} color={color} />
          ),
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
