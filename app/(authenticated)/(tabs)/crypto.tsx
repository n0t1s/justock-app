import { Currency } from "@/interfaces/crypto";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Text, View, XStack, Image } from "tamagui";

export default function CryptoScreen() {
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

  return (
    <View>
      {currencies.data?.map((currency: Currency) => (
        <XStack key={currency.id} alignItems="center" gap="$2">
          <Image
            source={{ uri: data?.[currency.id].logo, width: 40, height: 40 }}
          />
          <Text>{currency.name}</Text>
        </XStack>
      ))}
    </View>
  );
}
