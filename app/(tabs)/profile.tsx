import { View, Text, Pressable, Alert } from "react-native";
import { router } from "expo-router";
import { useAtom, useAtomValue } from "jotai";
import { userAtom, logoutAtom } from "../../store/auth";
import { useProfile } from "../../hooks/useAuth";

export default function ProfileScreen() {
  const [user, setUser] = useAtom(userAtom);
  const logout = useAtomValue(logoutAtom);
  const { data: profile, isLoading } = useProfile(user?.id || "");

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => {
          setUser(null);
          router.replace("/");
        },
      },
    ]);
  };

  if (!user) {
    return (
      <View className="flex-1 bg-gray-50 justify-center items-center p-6">
        <Text className="text-gray-500 text-lg mb-4">Please sign in</Text>
        <Pressable
          onPress={() => router.push("/(auth)/login")}
          className="bg-primary-500 px-6 py-3 rounded-lg"
        >
          <Text className="text-white font-semibold">Sign In</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      <View className="bg-white p-6 shadow-sm">
        <Text className="text-2xl font-bold text-gray-900 mb-2">Profile</Text>
        <Text className="text-gray-600">Manage your account settings</Text>
      </View>

      <View className="p-6">
        <View className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <View className="items-center mb-6">
            <View className="w-20 h-20 bg-primary-500 rounded-full justify-center items-center mb-4">
              <Text className="text-white text-2xl font-bold">
                {user.name.charAt(0).toUpperCase()}
              </Text>
            </View>
            <Text className="text-xl font-bold text-gray-900">{user.name}</Text>
            <Text className="text-gray-600">{user.email}</Text>
          </View>

          <View className="space-y-4">
            <View className="border-b border-gray-100 pb-4">
              <Text className="text-gray-700 font-medium mb-1">Full Name</Text>
              <Text className="text-gray-900">
                {profile?.name || user.name}
              </Text>
            </View>

            <View className="border-b border-gray-100 pb-4">
              <Text className="text-gray-700 font-medium mb-1">Email</Text>
              <Text className="text-gray-900">
                {profile?.email || user.email}
              </Text>
            </View>

            <View>
              <Text className="text-gray-700 font-medium mb-1">User ID</Text>
              <Text className="text-gray-500 text-sm">{user.id}</Text>
            </View>
          </View>
        </View>

        <View className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <Text className="text-lg font-semibold text-gray-900 mb-4">
            Account Actions
          </Text>

          <Pressable className="flex-row items-center py-3 border-b border-gray-100">
            <Text className="text-gray-700 flex-1">Edit Profile</Text>
            <Text className="text-gray-400">›</Text>
          </Pressable>

          <Pressable className="flex-row items-center py-3 border-b border-gray-100">
            <Text className="text-gray-700 flex-1">Notifications</Text>
            <Text className="text-gray-400">›</Text>
          </Pressable>

          <Pressable className="flex-row items-center py-3">
            <Text className="text-gray-700 flex-1">Privacy Settings</Text>
            <Text className="text-gray-400">›</Text>
          </Pressable>
        </View>

        <Pressable
          onPress={handleLogout}
          className="bg-red-500 rounded-lg py-4"
        >
          <Text className="text-white text-center font-semibold text-lg">
            Logout
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
