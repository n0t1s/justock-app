import {
  isClerkAPIResponseError,
  useSignIn,
  useSignUp,
} from "@clerk/clerk-expo";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Fragment, useEffect, useState } from "react";
import { View, Text, XStack, Paragraph, Separator, YStack } from "tamagui";
import { TouchableOpacity, Alert } from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
const CELL_COUNT = 6;

const Page = () => {
  const router = useRouter();
  const { phone, signin } = useLocalSearchParams<{
    phone: string;
    signin: string;
  }>();
  const [code, setCode] = useState("");
  const { signIn } = useSignIn();
  const { signUp, setActive } = useSignUp();

  const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });

  useEffect(() => {
    if (code.length === 6) {
      if (signin === "true") {
        verifySignIn();
      } else {
        verifyCode();
      }
    }
  }, [code]);

  const verifyCode = async () => {
    try {
      await signUp!.attemptPhoneNumberVerification({
        code,
      });
      await setActive!({ session: signUp!.createdSessionId });
    } catch (err) {
      console.log("error", JSON.stringify(err, null, 2));
      if (isClerkAPIResponseError(err)) {
        Alert.alert("Error", err.errors[0].message);
      }
    }
  };

  const verifySignIn = async () => {
    try {
      await signIn!.attemptFirstFactor({
        strategy: "phone_code",
        code,
      });
      await setActive!({ session: signIn!.createdSessionId });
    } catch (err) {
      console.log("error", JSON.stringify(err, null, 2));
      if (isClerkAPIResponseError(err)) {
        Alert.alert("Error", err.errors[0].message);
      }
    }
  };

  return (
    <View flex={1} padding="$4" gap="$5">
      <YStack>
        <Text fontWeight="700" fontSize="$10">
          6-digit code
        </Text>
        <Text fontSize="$6" marginTop="$5" color="$color11">
          Code sent to {phone} unless you already have an account
        </Text>
      </YStack>
      <CodeField
        ref={ref}
        {...props}
        value={code}
        onChangeText={setCode}
        cellCount={CELL_COUNT}
        rootStyle={{
          marginVertical: 20,
          marginLeft: "auto",
          marginRight: "auto",
          gap: 12,
        }}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <Fragment key={index}>
            <View
              onLayout={getCellOnLayoutHandler(index)}
              key={index}
              width={55}
              height={55}
              backgroundColor="$color10"
              borderRadius="$3"
              justifyContent="center"
            >
              <Text fontSize="$9" textAlign="center">
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            </View>
          </Fragment>
        )}
      />

      <TouchableOpacity onPress={() => router.replace("/login")}>
        <XStack alignItems="center" gap="$2">
          <Paragraph fontSize="$6">Already have an account?</Paragraph>
          <Text fontSize="$6" color="$green10Dark">
            Log in
          </Text>
        </XStack>
      </TouchableOpacity>
    </View>
  );
};

export default Page;
