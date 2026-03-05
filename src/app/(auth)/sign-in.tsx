import { ScrollView, Text, View } from "react-native";
import { Link } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import CustomInput from "@/shared/components/ui/CustomInput";
import CustomButton from "@/shared/components/ui/CustomButton";
import GoogleSignInButton from "@/modules/auth/components/GoogleSignInButton";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { useAuth } from "@/modules/auth/hooks/useAuth";

export default function SignIn() {
  const { signInWithGoogle, signInWithEmail, isLoading, isLoaded } = useAuth();

  const [form, setForm] = useState({
    emailAddress: "",
    password: "",
  });

  const onSignInPress = async () => {
    if (!isLoaded) return;

    const { emailAddress, password } = form;

    if (!emailAddress || !password) {
      alert("Please enter both email and password.");
      return;
    }

    signInWithEmail(emailAddress, password);
  };

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

      <View className="p-6 items-center">
        <Text className="text-3xl font-lexend-semibold mb-2 text-gray-800 dark:text-white">
          Welcome Back
        </Text>
        <Text className="text-lg text-gray-500 dark:text-gray-400 mb-8 text-center font-lexend">
          Sign in to continue your fitness journey!
        </Text>

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
          title="Login"
          onPress={onSignInPress}
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

        <Link
          href="sign-up"
          className="text-lg text-center text-gray-600 dark:text-gray-300 mt-10"
        >
          Don&apos;t have an account?{" "}
          <Text className="font-lexend-semibold text-green-600">Sign Up</Text>
        </Link>
      </View>
    </ScrollView>
  );
}
