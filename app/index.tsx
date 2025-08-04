import { View, Text, Pressable } from "react-native";
import { Link } from "expo-router";
import "../global.css";

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-gray-50 justify-center items-center p-6">
      <View className="bg-white rounded-xl p-8 shadow-lg w-full max-w-sm">
        <Text className="text-3xl font-bold text-gray-900 text-center mb-2">
          Task Manager
        </Text>
        <Text className="text-gray-600 text-center mb-8">
          Organize your life, one task at a time
        </Text>

        <Link href="/(tabs)/tasks" asChild>
          <Pressable className="bg-primary-500 rounded-lg py-4 mb-4">
            <Text className="text-white text-center font-semibold text-lg">
              Get Started
            </Text>
          </Pressable>
        </Link>

        <Link href="/(auth)/login" asChild>
          <Pressable className="border border-primary-500 rounded-lg py-4">
            <Text className="text-primary-500 text-center font-semibold text-lg">
              Sign In
            </Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}
