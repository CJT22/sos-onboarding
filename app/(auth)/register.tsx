import { useState } from "react";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { Link, router } from "expo-router";
import { useRegister } from "../../hooks/useAuth";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const registerMutation = useRegister();

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    try {
      await registerMutation.mutateAsync({ name, email, password });
      router.replace("/(tabs)/tasks");
    } catch (error: any) {
      Alert.alert("Registration Failed", error.message || "Please try again");
    }
  };

  return (
    <View className="flex-1 bg-gray-50 justify-center p-6">
      <View className="bg-white rounded-xl p-8 shadow-lg">
        <Text className="text-3xl font-bold text-gray-900 text-center mb-8">
          Create Account
        </Text>

        <View className="mb-4">
          <Text className="text-gray-700 font-medium mb-2">Full Name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Enter your full name"
            className="border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
          />
        </View>

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

        <View className="mb-4">
          <Text className="text-gray-700 font-medium mb-2">Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Create a password"
            secureTextEntry
            className="border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
          />
        </View>

        <View className="mb-6">
          <Text className="text-gray-700 font-medium mb-2">
            Confirm Password
          </Text>
          <TextInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm your password"
            secureTextEntry
            className="border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
          />
        </View>

        <Pressable
          onPress={handleRegister}
          disabled={registerMutation.isPending}
          className="bg-primary-500 rounded-lg py-4 mb-4 disabled:opacity-50"
        >
          <Text className="text-white text-center font-semibold text-lg">
            {registerMutation.isPending
              ? "Creating Account..."
              : "Create Account"}
          </Text>
        </Pressable>

        <View className="flex-row justify-center">
          <Text className="text-gray-600">Already have an account? </Text>
          <Link href="/(auth)/login" asChild>
            <Pressable>
              <Text className="text-primary-500 font-semibold">Sign In</Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </View>
  );
}
