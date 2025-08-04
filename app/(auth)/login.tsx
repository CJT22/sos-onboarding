import { useState } from "react";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { Link, router } from "expo-router";
import { useLogin } from "../../hooks/useAuth";

export default function LoginScreen() {
  const [email, setEmail] = useState("demo@example.com");
  const [password, setPassword] = useState("password");
  const loginMutation = useLogin();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      await loginMutation.mutateAsync({ email, password });
      router.replace("/(tabs)/tasks");
    } catch (error: any) {
      Alert.alert("Login Failed", error.message || "Invalid credentials");
    }
  };

  return (
    <View className="flex-1 bg-gray-50 justify-center p-6">
      <View className="bg-white rounded-xl p-8 shadow-lg">
        <Text className="text-3xl font-bold text-gray-900 text-center mb-8">
          Welcome Back
        </Text>

        <View className="mb-4">
          <Text className="text-gray-700 font-medium mb-2">Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            className="border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
          />
        </View>

        <View className="mb-6">
          <Text className="text-gray-700 font-medium mb-2">Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry
            className="border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
          />
        </View>

        <Pressable
          onPress={handleLogin}
          disabled={loginMutation.isPending}
          className="bg-primary-500 rounded-lg py-4 mb-4 disabled:opacity-50"
        >
          <Text className="text-white text-center font-semibold text-lg">
            {loginMutation.isPending ? "Signing In..." : "Sign In"}
          </Text>
        </Pressable>

        <View className="flex-row justify-center">
          <Text className="text-gray-600">Don't have an account? </Text>
          <Link href="/(auth)/register" asChild>
            <Pressable>
              <Text className="text-primary-500 font-semibold">Sign Up</Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </View>
  );
}
