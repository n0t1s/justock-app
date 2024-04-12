import React from "react";
import Colors from "@/constants/Colors";
import { useBalanceStore } from "@/store/balanceStore";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, useColorScheme } from "react-native";
import { Text, View } from "tamagui";
import { SIZE } from "./Config";

interface TileProps {
  id: string;
  onLongPress: () => void;
}

const Tile = ({ id }: TileProps) => {
  const { transactions } = useBalanceStore();
  const colorScheme = useColorScheme() as "light" | "dark";

  if (id === "spent") {
    return (
      <View
        style={styles.container}
        backgroundColor="$color3"
        pointerEvents="none"
      >
        <Text fontSize={16} color="$color11">
          Spent this month
        </Text>
        <Text marginTop="$5" fontSize="$9" fontWeight="bold" textAlign="center">
          1024€
        </Text>
      </View>
    );
  }

  if (id === "cashback") {
    return (
      <View
        style={styles.container}
        backgroundColor="$color3"
        pointerEvents="none"
        justifyContent="center"
      >
        <View
          style={{ alignItems: "center", justifyContent: "center", gap: 10 }}
        >
          <View
            width={60}
            height={60}
            borderRadius={30}
            justifyContent="center"
            alignItems="center"
            backgroundColor="$green10Dark"
          >
            <Text fontSize="$6" color="$color">
              5%
            </Text>
          </View>
          <Text fontSize={16} color="$color11">
            Profit this month
          </Text>
        </View>
      </View>
    );
  }

  if (id === "recent") {
    return (
      <View
        style={styles.container}
        backgroundColor="$color3"
        pointerEvents="none"
      >
        <View>
          <Text fontSize={16} color="$color11">
            Recent transaction
          </Text>

          {transactions.length === 0 && (
            <Text fontSize={18} color="$color11" marginTop="$5">
              No transactions
            </Text>
          )}

          {transactions.length > 0 && (
            <>
              <Text fontSize={18} fontWeight="bold" paddingVertical="$3">
                {transactions[transactions.length - 1].amount}€
              </Text>
              <Text fontSize={16} color="$color11">
                {transactions[transactions.length - 1].title}
              </Text>
            </>
          )}
        </View>
      </View>
    );
  }

  if (id === "cards") {
    return (
      <View
        style={styles.container}
        backgroundColor="$color3"
        pointerEvents="none"
      >
        <Text fontSize={16} color="$color11">
          Cards
        </Text>
        <Ionicons
          name="card"
          size={50}
          color="rgb(24,160,100)"
          style={{ marginTop: 20, alignSelf: "center" }}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    width: SIZE - 20,
    height: 150,
    borderRadius: 20,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
    padding: 14,
    alignSelf: "center",
  },
});

export default Tile;
