import React from "react";
import { Button, ScrollView, Text, XStack, YStack } from "tamagui";
import { useHeaderHeight } from "@react-navigation/elements";
import { ButtonRounded, Dropdown } from "@/components";

export default function HomeScreen() {
  const headerHeight = useHeaderHeight();

  const onAddMoney = () => {};
  const clearTransactions = () => {};

  return (
    <ScrollView
      contentContainerStyle={{
        paddingTop: headerHeight,
      }}
    >
      <YStack margin="$6" alignItems="center">
        <XStack alignItems="flex-end" justifyContent="center" gap="$3">
          <Text fontSize={50} fontWeight="bold">
            1234
          </Text>
          <Text fontSize={20} fontWeight="500">
            €
          </Text>
        </XStack>
        <Button borderRadius="$8" marginVertical="$5">
          Accounts
        </Button>
      </YStack>

      <XStack justifyContent="space-between" padding={20}>
        <ButtonRounded icon={"add"} text={"Add money"} onPress={onAddMoney} />
        <ButtonRounded
          icon={"refresh"}
          text={"Exchange"}
          onPress={clearTransactions}
        />
        <ButtonRounded icon={"list"} text={"Details"} />
        <Dropdown />
      </XStack>
    </ScrollView>
  );
}
