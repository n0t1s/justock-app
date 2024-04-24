import React from "react";
import { Currency } from "@/interfaces/crypto";
import { useQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import { useHeaderHeight } from "@react-navigation/elements";
import { Text, XStack, Image, ScrollView, YStack } from "tamagui";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

export default function CryptoScreen() {
  const headerHeight = useHeaderHeight();
  const currencies = useQuery({
    queryKey: ["listings"],
    queryFn: () => fetch("/api/listings").then((res) => res.json()),
  });
  const ids = currencies.data
    ?.map((currency: Currency) => currency.id)
    .join(",");

  const { data } = useQuery({
    queryKey: ["info", ids],
    queryFn: () => fetch(`/api/info?ids=${ids}`).then((res) => res.json()),
    enabled: !!ids,
  });

  const getHourlyChange = (currency: Currency) =>
    currency.quote.EUR.percent_change_1h;

  return (
    <ScrollView
      contentContainerStyle={{
        paddingTop: headerHeight,
      }}
      showsVerticalScrollIndicator={false}
    >
      <YStack margin="$4" gap="$2">
        <Text marginVertical="$2" fontSize="$6" fontWeight="bold">
          Latest Crypto
        </Text>
        <YStack
          padding="$3"
          borderRadius="$4"
          gap={28}
          backgroundColor="$color2"
        >
          {currencies.data?.map((currency: Currency) => (
            <Link href={`/crypto/${currency.id}`} key={currency.id} asChild>
              <TouchableOpacity>
                <XStack alignItems="center" justifyContent="space-between">
                  <XStack gap="$3.5">
                    <Image
                      source={{
                        uri: data?.[currency.id].logo,
                        width: 40,
                        height: 40,
                      }}
                    />
                    <YStack gap="$2">
                      <Text>{currency.name}</Text>
                      <Text color="$color10">{currency.symbol}</Text>
                    </YStack>
                  </XStack>
                  <YStack alignItems="flex-end" gap="$2">
                    <Text>{currency.quote.EUR.price.toFixed(2)} €</Text>
                    <XStack gap="$1.5">
                      <Ionicons
                        name={
                          getHourlyChange(currency) > 0
                            ? "caret-up"
                            : "caret-down"
                        }
                        size={16}
                        color={getHourlyChange(currency) > 0 ? "green" : "red"}
                      />
                      <Text
                        color={getHourlyChange(currency) > 0 ? "green" : "red"}
                      >
                        {getHourlyChange(currency).toFixed(2)} %
                      </Text>
                    </XStack>
                  </YStack>
                </XStack>
              </TouchableOpacity>
            </Link>
          ))}
        </YStack>
      </YStack>
    </ScrollView>
  );
}
