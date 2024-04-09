import React from "react";
import { Button, ScrollView, Text, XStack, YStack } from "tamagui";
import { useHeaderHeight } from "@react-navigation/elements";
import { ButtonRounded, Dropdown } from "@/components";
import { useBalanceStore } from "@/store/balanceStore";

export default function HomeScreen() {
  const headerHeight = useHeaderHeight();
  const { balance, runTransaction, transactions, clearTransactions } =
    useBalanceStore();

  const onAddMoney = () => {
    runTransaction({
      id: Math.random().toString(),
      amount: Math.floor(Math.random() * 1000) * (Math.random() > 0.5 ? 1 : -1),
      date: new Date(),
      title: "Added money",
    });
  };

  return (
    <ScrollView
      contentContainerStyle={{
        paddingTop: headerHeight,
      }}
    >
      <YStack margin="$6" alignItems="center">
        <XStack alignItems="flex-end" justifyContent="center" gap="$3">
          <Text fontSize={50} fontWeight="bold">
            {balance()}
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
