import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const Tasks = () => {
  return (
    <View>
      <Stack.Screen options={{ title: "Tasks" }} />
      <Text>Tasks</Text>
    </View>
  );
};

export default Tasks;
