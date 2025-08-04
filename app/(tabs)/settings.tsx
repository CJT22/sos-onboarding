import { View, Text, Pressable, Switch } from "react-native";
import { useState } from "react";
import { useAtom } from "jotai";
import { themeAtom } from "../../store/theme";

export default function SettingsScreen() {
  const [theme, setTheme] = useAtom(themeAtom);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [syncEnabled, setSyncEnabled] = useState(true);

  return (
    <View className="flex-1 bg-gray-50">
      <View className="bg-white p-6 shadow-sm">
        <Text className="text-2xl font-bold text-gray-900 mb-2">Settings</Text>
        <Text className="text-gray-600">Customize your app experience</Text>
      </View>

      <View className="p-6">
        {/* Appearance Section */}
        <View className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <Text className="text-lg font-semibold text-gray-900 mb-4">
            Appearance
          </Text>

          <View className="flex-row items-center justify-between py-3">
            <View>
              <Text className="text-gray-900 font-medium">Dark Mode</Text>
              <Text className="text-gray-500 text-sm">
                Switch to dark theme
              </Text>
            </View>
            <Switch
              value={theme === "dark"}
              onValueChange={(value) => setTheme(value ? "dark" : "light")}
            />
          </View>
        </View>

        {/* Notifications Section */}
        <View className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <Text className="text-lg font-semibold text-gray-900 mb-4">
            Notifications
          </Text>

          <View className="flex-row items-center justify-between py-3">
            <View>
              <Text className="text-gray-900 font-medium">
                Push Notifications
              </Text>
              <Text className="text-gray-500 text-sm">
                Get notified about updates
              </Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
            />
          </View>
        </View>

        {/* Sync Section */}
        <View className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <Text className="text-lg font-semibold text-gray-900 mb-4">
            Data & Sync
          </Text>

          <View className="flex-row items-center justify-between py-3">
            <View>
              <Text className="text-gray-900 font-medium">Auto Sync</Text>
              <Text className="text-gray-500 text-sm">
                Sync data automatically
              </Text>
            </View>
            <Switch value={syncEnabled} onValueChange={setSyncEnabled} />
          </View>
        </View>

        {/* About Section */}
        <View className="bg-white rounded-xl p-6 shadow-sm">
          <Text className="text-lg font-semibold text-gray-900 mb-4">
            About
          </Text>

          <View className="space-y-3">
            <View>
              <Text className="text-gray-700 font-medium">Version</Text>
              <Text className="text-gray-500">1.0.0</Text>
            </View>

            <View>
              <Text className="text-gray-700 font-medium">Build</Text>
              <Text className="text-gray-500">2025.01.01</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
