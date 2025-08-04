import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const Login = () => {
  return (
    <View>
      <Stack.Screen options={{ title: "Login" }} />
      <Text>Login</Text>
    </View>
  );
};

export default Login;
