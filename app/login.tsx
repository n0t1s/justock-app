import { ButtonComponent } from "@/components";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  Alert,
} from "react-native";
import { View, Text, Input, XStack, H1, Paragraph, YStack } from "tamagui";
import Colors from "@/constants/Colors";
import { isClerkAPIResponseError, useSignIn } from "@clerk/clerk-expo";

enum SignInType {
  Phone,
  Email,
  Google,
  Apple,
}

const LoginPage = () => {
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const keyboardVerticalOffset = Platform.OS === "ios" ? 80 : 0;
  const router = useRouter();
  const colorScheme = useColorScheme() as "light" | "dark";
  const { signIn } = useSignIn();

  const onSignIn = async (type: SignInType) => {
    if (type === SignInType.Phone) {
      try {
        const fullPhoneNumber = `${countryCode}${phoneNumber}`;

        const { supportedFirstFactors } = await signIn!.create({
          identifier: fullPhoneNumber,
        });
        const firstPhoneFactor: any = supportedFirstFactors.find(
          (factor: any) => {
            return factor.strategy === "phone_code";
          }
        );

        const { phoneNumberId } = firstPhoneFactor;

        await signIn!.prepareFirstFactor({
          strategy: "phone_code",
          phoneNumberId,
        });

        router.push({
          pathname: "/verify/[phone]",
          params: { phone: fullPhoneNumber, signin: "true" },
        });
      } catch (err) {
        console.log("error", JSON.stringify(err, null, 2));
        if (isClerkAPIResponseError(err)) {
          if (err.errors[0].code === "form_identifier_not_found") {
            Alert.alert("Error", err.errors[0].message);
          }
        }
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <View flex={1} padding="$4">
        <YStack gap="$4.5">
          <H1>Welcome Back!</H1>
          <Paragraph fontSize="$5" color="$color11">
            Enter the phone number associated with your account.
          </Paragraph>
        </YStack>
        <XStack marginVertical="$7" gap="$2.5">
          <Input placeholder="Country code" value={countryCode} size="$5" />
          <Input
            size="$5"
            flex={1}
            placeholder="Mobile number"
            keyboardType="numeric"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </XStack>

        <TouchableOpacity onPress={() => router.replace("/signup")}>
          <XStack alignItems="center" gap="$2">
            <Paragraph fontSize="$6">First time using JuStock?</Paragraph>
            <Text fontSize="$6" color="$green10Dark">
              Create an Account
            </Text>
          </XStack>
        </TouchableOpacity>
        <View marginTop="$7" marginBottom="$5">
          <ButtonComponent
            onPress={() => onSignIn(SignInType.Phone)}
            backgroundColor="$green10Dark"
            theme="green"
            disabled={phoneNumber === ""}
            opacity={phoneNumber !== "" ? 1 : 0.5}
          >
            Login
          </ButtonComponent>
        </View>
        <XStack style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
          <View
            height={StyleSheet.hairlineWidth}
            flex={1}
            backgroundColor="$color11"
          />
          <Text fontSize="$6">or</Text>
          <View
            height={StyleSheet.hairlineWidth}
            flex={1}
            backgroundColor="$color11"
          />
        </XStack>

        <YStack gap="$5" marginVertical="$5">
          <ButtonComponent
            theme="alt1"
            onPress={() => onSignIn(SignInType.Email)}
          >
            <Ionicons
              name="mail"
              size={24}
              color={Colors[colorScheme].IconDefault}
            />
            <Text fontSize="$5">Continue with email</Text>
          </ButtonComponent>

          <ButtonComponent
            onPress={() => onSignIn(SignInType.Google)}
            theme="alt1"
          >
            <Ionicons
              name="logo-google"
              size={24}
              color={Colors[colorScheme].IconDefault}
            />
            <Text fontSize="$5">Continue with Google</Text>
          </ButtonComponent>

          <ButtonComponent
            onPress={() => onSignIn(SignInType.Apple)}
            theme="alt1"
          >
            <Ionicons
              name="logo-apple"
              size={24}
              color={Colors[colorScheme].IconDefault}
            />
            <Text fontSize="$5">Continue with Apple</Text>
          </ButtonComponent>
        </YStack>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginPage;
