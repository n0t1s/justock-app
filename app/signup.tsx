import { ButtonComponent, OAuthSection } from "@/components";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native";
import { View, Text, Input, XStack, H1, Paragraph, YStack } from "tamagui";

const SignUpPage = () => {
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const keyboardVerticalOffset = Platform.OS === "ios" ? 80 : 0;
  const router = useRouter();
  const { signUp } = useSignUp();

  const onSignup = async () => {
    const fullPhoneNumber = `${countryCode}${phoneNumber}`;

    try {
      await signUp!.create({
        phoneNumber: fullPhoneNumber,
      });
      signUp!.preparePhoneNumberVerification();

      router.push({
        pathname: "/verify/[phone]",
        params: { phone: fullPhoneNumber },
      });
    } catch (error) {
      console.error("Error signing up:", error);
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
          <H1>Let's get started!</H1>
          <Paragraph fontSize="$5" color="$color11">
            Enter your phone number. We will send you a confirmation code there.
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

        <TouchableOpacity onPress={() => router.replace("/login")}>
          <XStack alignItems="center" gap="$2">
            <Paragraph fontSize="$6">Already have an account?</Paragraph>
            <Text fontSize="$6" color="$green10Dark">
              Log in
            </Text>
          </XStack>
        </TouchableOpacity>
        <View marginTop="$7" marginBottom="$5">
          <ButtonComponent
            onPress={onSignup}
            backgroundColor="$green10Dark"
            theme="green"
            disabled={phoneNumber === ""}
            opacity={phoneNumber !== "" ? 1 : 0.5}
          >
            Sign up
          </ButtonComponent>
        </View>
        <OAuthSection />
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUpPage;
