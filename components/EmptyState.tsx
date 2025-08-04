import { View, Text, Pressable } from "react-native";

interface EmptyStateProps {
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
}

export default function EmptyState({
  title,
  description,
  actionText,
  onAction,
}: EmptyStateProps) {
  return (
    <View className="flex-1 justify-center items-center p-8">
      <Text className="text-xl font-bold text-gray-900 mb-2 text-center">
        {title}
      </Text>
      <Text className="text-gray-600 text-center mb-6">{description}</Text>
      {actionText && onAction && (
        <Pressable
          onPress={onAction}
          className="bg-primary-500 px-6 py-3 rounded-lg"
        >
          <Text className="text-white font-semibold">{actionText}</Text>
        </Pressable>
      )}
    </View>
  );
}
