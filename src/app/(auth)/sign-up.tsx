import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import CustomInput from "@/shared/components/ui/CustomInput";
import CustomButton from "@/shared/components/ui/CustomButton";
import GoogleSignInButton from "@/modules/auth/components/GoogleSignInButton";
import { LinearGradient } from "expo-linear-gradient";
import { useRef, useState } from "react";
import { useAuth } from "@/modules/auth/hooks/useAuth";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const { signInWithGoogle } = useAuth();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "",
  });
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const inputRef0 = useRef<TextInput>(null);
  const inputRef1 = useRef<TextInput>(null);
  const inputRef2 = useRef<TextInput>(null);
  const inputRef3 = useRef<TextInput>(null);
  const inputRef4 = useRef<TextInput>(null);
  const inputRef5 = useRef<TextInput>(null);
  const inputRefs = [inputRef0, inputRef1, inputRef2, inputRef3, inputRef4, inputRef5];

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    const { firstName, lastName, emailAddress, password } = form;

    if (!firstName || !lastName || !emailAddress || !password) {
      alert("Please enter both email and password.");
      return;
    }

    // Start sign-up process using email and password provided
    try {
      setIsLoading(true);
      await signUp.create({
        firstName,
        lastName,
        emailAddress,
        password,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true);
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setIsLoading(false);
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;
    if (!code) {
      alert("Please enter the verification code sent to your email.");
      return;
    }

    try {
      setIsLoading(true);
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/");
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setIsLoading(false);
    }
  };

  if (pendingVerification) {
    return (
      <View className="flex-1 bg-neutral-50 justify-center">
        <View className="flex-1 px-6 py-8 justify-center dark:bg-gray-900">
          <View className="mb-6">
            <TouchableOpacity
              className="flex-row items-center gap-2"
              onPress={() => setPendingVerification(false)}
            >
              <MaterialIcons
                name="arrow-back-ios-new"
                size={20}
                color="#757575"
              />
              <Text className="font-medium text-neutral-500">Back</Text>
            </TouchableOpacity>
          </View>
          <View className="items-center mb-8">
            <Text className="text-3xl font-bold mb-2 text-neutral-900 dark:text-white">
              Verify Your Account
            </Text>
            <Text className="text-neutral-500 dark:text-gray-400">
              Enter the 6-digit code sent to your email.
            </Text>
          </View>
          <View className="flex-row justify-center gap-2 mb-8">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <TextInput
                key={i}
                ref={inputRefs[i]}
                className="w-12 h-12 text-center text-xl font-bold rounded-xl border border-neutral-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                maxLength={1}
                keyboardType="number-pad"
                value={code[i] || ""}
                onChangeText={(val) => {
                  let newCode = code.split("");
                  newCode[i] = val;
                  setCode(newCode.join(""));
                  // Auto-focus next input
                  if (val && i < 5) {
                    inputRefs[i + 1].current?.focus();
                  }
                }}
                onKeyPress={({ nativeEvent }) => {
                  if (nativeEvent.key === "Backspace" && !code[i] && i > 0) {
                    inputRefs[i - 1].current?.focus();
                  }
                }}
              />
            ))}
          </View>
          <View className="items-center mb-4">
            <Text className="text-sm text-neutral-500 dark:text-gray-400">
              Didn't receive the code?
            </Text>
            <TouchableOpacity
              onPress={() => {
                /* handle resend code */
              }}
            >
              <Text className="font-medium text-green-500 mt-1 underline">
                Resend Code
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="px-6 pb-8">
          <CustomButton
            title="Verify"
            onPress={onVerifyPress}
            bgVariant="success"
            className="w-full h-14 rounded-full shadow-lg"
            isLoading={isLoading}
          />
        </View>
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-white dark:bg-gray-900"
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <LinearGradient
        colors={["#1d4ed8", "#1e40af", "#1e3a8a"]}
        style={{ width: "100%", height: 220, alignItems: "center", justifyContent: "center" }}
      >
        <View style={{ width: 76, height: 76, backgroundColor: "rgba(255,255,255,0.2)", borderRadius: 38, alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
          <MaterialIcons name="fitness-center" size={40} color="white" />
        </View>
        <Text style={{ fontSize: 34, fontWeight: "bold", color: "white" }}>FitForge</Text>
        <Text style={{ color: "#bfdbfe", fontSize: 14, marginTop: 4 }}>Your AI Fitness Companion</Text>
      </LinearGradient>

      <View className="w-full items-end px-6 mt-4">
        <Link
          href="/sign-in"
          className="text-lg text-green-600 font-lexend-semibold"
        >
          Sign In
        </Link>
      </View>

      <View className="p-6 items-center">
        <Text className="text-3xl font-lexend-semibold mb-2 text-gray-800 dark:text-white">
          Create Account
        </Text>
        <Text className="text-lg text-gray-500 dark:text-gray-400 mb-8 text-center font-lexend">
          Let's get you started on your fitness journey!
        </Text>

        <CustomInput
          label="First Name"
          placeholder="Enter your first name"
          icon={
            <MaterialIcons name="person-outline" size={24} color="#757575" />
          }
          value={form.firstName}
          onChangeText={(value) => setForm({ ...form, firstName: value })}
        />
        <CustomInput
          label="Last Name"
          placeholder="Enter your last name"
          icon={
            <MaterialIcons name="person-outline" size={24} color="#757575" />
          }
          value={form.lastName}
          onChangeText={(value) => setForm({ ...form, lastName: value })}
        />
        <CustomInput
          label="Email"
          placeholder="Enter email"
          icon={<MaterialIcons name="email" size={24} color="#757575" />}
          value={form.emailAddress}
          onChangeText={(value) => setForm({ ...form, emailAddress: value })}
          textContentType="emailAddress"
        />
        <CustomInput
          label="Password"
          placeholder="Enter your password"
          icon={<MaterialIcons name="lock-outline" size={24} color="#757575" />}
          value={form.password}
          onChangeText={(value) => setForm({ ...form, password: value })}
          secureTextEntry
        />

        <CustomButton
          title="Sign Up"
          onPress={onSignUpPress}
          bgVariant="success"
          className="mt-4"
          isLoading={isLoading}
        />

        <View className="my-6 flex-row items-center justify-center">
          <View className="flex-1 h-px bg-gray-300 dark:bg-gray-700" />
          <Text className="mx-4 text-gray-500 dark:text-gray-400 font-lexend">or</Text>
          <View className="flex-1 h-px bg-gray-300 dark:bg-gray-700" />
        </View>

        <GoogleSignInButton onPress={signInWithGoogle} />

        <View className="mt-4 text-center">
          <Text className="text-gray-500 dark:text-gray-400 text-sm">
            By creating an account, you agree to our{" "}
            <Text className="text-gray-800 dark:text-white font-bold underline">
              Terms of Service
            </Text>{" "}
            and{" "}
            <Text className="text-gray-800 dark:text-white font-bold underline">
              Privacy Policy.
            </Text>
          </Text>
        </View>

        <Link
          href="sign-in"
          className="text-lg text-center text-gray-600 dark:text-gray-300 mt-6"
        >
          Already have an account?{" "}
          <Text className="font-lexend-semibold text-green-600">Sign In</Text>
        </Link>
      </View>
    </ScrollView>
  );
}
