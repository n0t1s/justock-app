import React, { useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { useHeaderHeight } from "@react-navigation/elements";
import {
  Text,
  View,
  XStack,
  Image,
  Button,
  YStack,
  ThemeName,
  ScrollView,
} from "tamagui";
import {
  SectionList,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
const categories = ["Overview", "News", "Orders", "Transactions"];
import { LineChart } from "react-native-gifted-charts";
import { Currency } from "@/interfaces/crypto";

interface CTAProps {
  text: string;
  icon: keyof typeof Ionicons.glyphMap;
  backgroundColor: string;
  theme: ThemeName | null | undefined;
}
const CTA: React.FC<CTAProps> = ({ text, icon, backgroundColor, theme }) => {
  return (
    <Button
      paddingHorizontal="$6"
      borderRadius="$8"
      backgroundColor={backgroundColor}
      theme={theme}
      icon={<Ionicons name={icon} size={24} color="white" />}
    >
      {text}
    </Button>
  );
};

const DetailsPage = () => {
  const { id } = useLocalSearchParams();
  const headerHeight = useHeaderHeight();
  const [activeIndex, setActiveIndex] = useState(0);
  const colorScheme = useColorScheme() as "light" | "dark";

  const { data } = useQuery({
    queryKey: ["info", id],
    queryFn: async () => {
      const info = await fetch(`/api/info?ids=${id}`).then((res) => res.json());
      return info[+id];
    },
  });

  const getHourlyChange = (data: Currency) =>
    data?.quote?.EUR?.percent_change_1h;

  const { data: tickers } = useQuery({
    queryKey: ["tickers"],
    queryFn: async () => fetch(`/api/tickers`).then((res) => res.json()),
  });

  return (
    <>
      <Stack.Screen options={{ title: data?.name }} />
      <SectionList
        style={{ marginTop: headerHeight }}
        keyExtractor={(i) => i.title}
        contentInsetAdjustmentBehavior="automatic"
        sections={[{ data: [{ title: "Chart" }] }]}
        showsVerticalScrollIndicator={false}
        renderSectionHeader={() => (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              alignItems: "center",
              width: "100%",
              justifyContent: "space-between",
              padding: "$3.5",
              backgroundColor: Colors[colorScheme].background,
              borderBottomColor: "$color8",
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          >
            {categories.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setActiveIndex(index)}
                style={{
                  padding: 10,
                  paddingHorizontal: 14,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor:
                    activeIndex === index
                      ? Colors[colorScheme === "dark" ? "light" : "dark"]
                          .background
                      : Colors[colorScheme].background,
                  borderRadius: 20,
                }}
              >
                <Text color={activeIndex === index ? "$color1" : "$color10"}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
        ListHeaderComponent={() => (
          <YStack marginVertical="$1.5" marginHorizontal="$4">
            <XStack justifyContent="space-between" alignItems="center">
              <Text fontSize={20} fontWeight="bold" color="$color11">
                {data?.symbol}
              </Text>
              <Image source={{ uri: data?.logo, width: 60, height: 60 }} />
            </XStack>
            <XStack gap="$3.5" alignItems="center">
              <CTA
                text="Buy"
                icon="add"
                backgroundColor="$green9"
                theme="green"
              />
              <CTA
                text="Recieve"
                icon="arrow-back"
                backgroundColor="$red9"
                theme="red"
              />
            </XStack>
          </YStack>
        )}
        renderItem={() => (
          <View margin="$4">
            <View height={600}>
              <LineChart
                areaChart
                height={600}
                data={tickers}
                hideDataPoints
                spacing={10}
                color={getHourlyChange(data) > 0 ? "#00ff83" : "#F2555A"}
                startFillColor={
                  getHourlyChange(data) > 0
                    ? "rgba(20,105,81,0.3)"
                    : "rgba(105,20,31,0.3)"
                }
                endFillColor="rgba(0,25,10,0.5)"
                startOpacity={0.9}
                endOpacity={0.2}
                initialSpacing={0}
                yAxisThickness={0}
                xAxisThickness={0}
                rulesThickness={0}
                yAxisLabelWidth={0}
              />
            </View>
            <View
              padding="$3"
              borderRadius="$4"
              gap={28}
              backgroundColor="$color2"
            >
              <Text fontSize={20} fontWeight="bold" color="$color11">
                Overview
              </Text>
              <Text color="$color10">{data?.description}</Text>
            </View>
          </View>
        )}
      ></SectionList>
    </>
  );
};

export default DetailsPage;
