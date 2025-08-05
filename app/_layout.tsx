import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import QueryProvider from "../providers/QueryProvider";
import ErrorBoundary from "../components/ErrorBoundary";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <ErrorBoundary>
      <QueryProvider>
        <SafeAreaView className="flex-1">
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          </Stack>
        </SafeAreaView>
        <StatusBar style="auto" />
      </QueryProvider>
    </ErrorBoundary>
  );
}
