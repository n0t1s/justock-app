import { ButtonComponent, OAuthSection } from "@/components";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
} from "react-native";
import { View, Text, Input, XStack, H1, Paragraph, YStack } from "tamagui";
import { isClerkAPIResponseError, useSignIn } from "@clerk/clerk-expo";

const LoginPage = () => {
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const keyboardVerticalOffset = Platform.OS === "ios" ? 80 : 0;
  const router = useRouter();
  const { signIn } = useSignIn();

  const onSignIn = async () => {
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
      console.log("error", err);
      if (isClerkAPIResponseError(err)) {
        if (err.errors[0].code === "form_identifier_not_found") {
          Alert.alert("Error", err.errors[0].message);
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
            onPress={onSignIn}
            backgroundColor="$green10Dark"
            theme="green"
            disabled={phoneNumber === ""}
            opacity={phoneNumber !== "" ? 1 : 0.5}
          >
            Login
          </ButtonComponent>
        </View>
        <OAuthSection />
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginPage;
