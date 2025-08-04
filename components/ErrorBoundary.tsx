import React from "react";
import { View, Text, Pressable } from "react-native";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View className="flex-1 justify-center items-center bg-gray-50 p-6">
          <Text className="text-xl font-bold text-gray-900 mb-4">
            Oops! Something went wrong
          </Text>
          <Text className="text-gray-600 text-center mb-6">
            The app encountered an unexpected error. Please try restarting the
            application.
          </Text>
          <Pressable
            onPress={() => this.setState({ hasError: false, error: undefined })}
            className="bg-primary-500 px-6 py-3 rounded-lg"
          >
            <Text className="text-white font-semibold">Try Again</Text>
          </Pressable>
        </View>
      );
    }

    return this.props.children;
  }
}
