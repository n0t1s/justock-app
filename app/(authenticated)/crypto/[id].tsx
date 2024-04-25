import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { useHeaderHeight } from "@react-navigation/elements";
import { Text } from "tamagui";
import { useQuery } from "@tanstack/react-query";
import { SectionList } from "react-native";

const DetailsPage = () => {
  const { id } = useLocalSearchParams();
  const headerHeight = useHeaderHeight();

  return (
    <>
      <Stack.Screen options={{ title: "Bitcoin" }} />
      <SectionList
        style={{ paddingTop: headerHeight }}
        keyExtractor={(i) => i.title}
        sections={[{ data: [{ title: "Chart" }] }]}
        renderItem={({ item }) => <Text>render item</Text>}
      ></SectionList>
    </>
  );
};

export default DetailsPage;
