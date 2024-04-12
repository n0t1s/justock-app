import React from "react";
import { ScrollView, Text, View, XStack, YStack } from "tamagui";
import { useHeaderHeight } from "@react-navigation/elements";
import { ButtonRounded, Dropdown } from "@/components";
import { useBalanceStore } from "@/store/balanceStore";
import { useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import WidgetList from "@/components/sortableList/WidgetList";

export default function HomeScreen() {
  const headerHeight = useHeaderHeight();
  const { balance, runTransaction, transactions, clearTransactions } =
    useBalanceStore();
  const colorScheme = useColorScheme() as "light" | "dark";

  const onTransaction = () => {
    const amount =
      Math.floor(Math.random() * 1000) * (Math.random() > 0.5 ? 1 : -1);
    const title = amount > 0 ? "Credited" : "Debited";

    runTransaction({
      id: Math.random().toString(),
      amount: amount,
      date: new Date(),
      title: title,
    });
  };

  return (
    <ScrollView
      contentContainerStyle={{
        paddingTop: headerHeight,
      }}
    >
      <YStack margin="$10" alignItems="center">
        <XStack alignItems="flex-end" justifyContent="center" gap="$3">
          <Text fontSize={50} fontWeight="bold">
            {balance()}
          </Text>
          <Text fontSize={20} fontWeight="500">
            €
          </Text>
        </XStack>
      </YStack>

      <XStack justifyContent="space-between" padding={20}>
        <ButtonRounded
          icon={"add"}
          text={"Add money"}
          onPress={onTransaction}
        />
        <ButtonRounded
          icon={"refresh"}
          text={"Exchange"}
          onPress={clearTransactions}
        />
        <ButtonRounded icon={"list"} text={"Details"} />
        <Dropdown />
      </XStack>
      <YStack margin="$4" gap="$2">
        <Text marginVertical="$2" fontSize="$6" fontWeight="bold">
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
            transactions.map((transaction) => (
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
      <YStack gap="$2">
        <Text margin="$4" fontSize="$6" fontWeight="bold">
          Summary
        </Text>
        <WidgetList />
      </YStack>
    </ScrollView>
  );
}
