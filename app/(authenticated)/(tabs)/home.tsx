import React from "react";
import { Button, ScrollView, Text, View, XStack, YStack } from "tamagui";
import { useHeaderHeight } from "@react-navigation/elements";
import { ButtonRounded, Dropdown } from "@/components";
import { useBalanceStore } from "@/store/balanceStore";
import { useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

export default function HomeScreen() {
  const headerHeight = useHeaderHeight();
  const { balance, runTransaction, transactions, clearTransactions } =
    useBalanceStore();
  const colorScheme = useColorScheme() as "light" | "dark";

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
      <YStack margin="$4" gap="$2">
        <Text fontSize="$6" fontWeight="bold">
          Transactions
        </Text>
        <YStack
          padding="$3"
          borderRadius="$4"
          gap={28}
          backgroundColor="$color2"
        >
          {transactions.length === 0 ? (
            <Text padding="$3" color="gray">
              No transactions yet
            </Text>
          ) : (
            transactions
              .sort((a, b) => b.date.getTime() - a.date.getTime())
              .map((transaction) => (
                <XStack key={transaction.id} alignItems="center" gap="$4">
                  <View
                    width={40}
                    height={40}
                    borderRadius={30}
                    justifyContent="center"
                    alignItems="center"
                    backgroundColor={
                      transaction.amount > 0 ? "$green10Dark" : "$red10Dark"
                    }
                  >
                    <Ionicons
                      name={transaction.amount > 0 ? "add" : "remove"}
                      size={24}
                      color={Colors[colorScheme].IconDefault}
                    />
                  </View>
                  <View flex={1} gap="$1">
                    <Text>{transaction.title}</Text>
                    <Text color="gray" fontSize="$3">
                      {transaction.date.toLocaleString()}
                    </Text>
                  </View>
                  <Text>{transaction.amount}€</Text>
                </XStack>
              ))
          )}
        </YStack>
      </YStack>
    </ScrollView>
  );
}
