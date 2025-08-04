import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import QueryProvider from "../providers/QueryProvider";
import ErrorBoundary from "../components/ErrorBoundary";

export default function RootLayout() {
  return (
    <ErrorBoundary>
      <QueryProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="auto" />
      </QueryProvider>
    </ErrorBoundary>
  );
}
