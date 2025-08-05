import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Modal,
  ScrollView,
  Alert,
} from "react-native";
import { useCreateTask } from "../../hooks/useTasks";
import { useAtomValue } from "jotai";
import { userAtom } from "../../store/auth";
import { Link, router } from "expo-router";

interface TaskModalProps {
  visible: boolean;
  onClose: () => void;
}

const categories = [
  { id: "work", label: "Work", color: "bg-blue-500" },
  { id: "personal", label: "Personal", color: "bg-green-500" },
  { id: "shopping", label: "Shopping", color: "bg-yellow-500" },
  { id: "health", label: "Health", color: "bg-red-500" },
];

const priorities = [
  { id: "low", label: "Low Priority", color: "bg-green-100 text-green-800" },
  {
    id: "medium",
    label: "Medium Priority",
    color: "bg-yellow-100 text-yellow-800",
  },
  { id: "high", label: "High Priority", color: "bg-red-100 text-red-800" },
];

export default function TaskModal({ visible }: TaskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<
    "work" | "personal" | "shopping" | "health"
  >("work");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");

  const user = useAtomValue(userAtom);
  const createTaskMutation = useCreateTask();

  const handleSubmit = async () => {
    if (!title.trim()) {
      Alert.alert("Error", "Please enter a task title");
      return;
    }

    if (!user) {
      Alert.alert("Error", "Please log in to create tasks");
      return;
    }

    try {
      await createTaskMutation.mutateAsync({
        title: title.trim(),
        description: description.trim() || undefined,
        completed: false,
        category,
        priority,
        userId: user.id,
      });

      // Reset form
      setTitle("");
      setDescription("");
      setCategory("work");
      setPriority("medium");

      router.replace("/tasks");
    } catch (error) {
      console.warn(error);
      Alert.alert("Error", "Failed to create task. Please try again.");
    }
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white p-6 shadow-sm">
        <View className="flex-row items-center justify-between">
          <Link href="/tasks">
            <Text className="text-primary-500 text-lg font-medium">Cancel</Text>
          </Link>
          <Text className="text-xl font-bold text-gray-900">New Task</Text>
          <Pressable
            onPress={handleSubmit}
            disabled={createTaskMutation.isPending || !title.trim()}
            className="disabled:opacity-50"
          >
            <Text className="text-primary-500 text-lg font-medium">
              {createTaskMutation.isPending ? "Saving..." : "Save"}
            </Text>
          </Pressable>
        </View>
      </View>

      <ScrollView className="flex-1 p-6">
        {/* Title Input */}
        <View className="mb-6">
          <Text className="text-gray-700 font-medium mb-2">Title *</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Enter task title"
            className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
            multiline
          />
        </View>

        {/* Description Input */}
        <View className="mb-6">
          <Text className="text-gray-700 font-medium mb-2">Description</Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Enter task description (optional)"
            className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 h-24"
            multiline
            textAlignVertical="top"
          />
        </View>

        {/* Category Selection */}
        <View className="mb-6">
          <Text className="text-gray-700 font-medium mb-3">Category</Text>
          <View className="flex-row flex-wrap gap-3">
            {categories.map((cat) => (
              <Pressable
                key={cat.id}
                onPress={() => setCategory(cat.id as any)}
                className={`px-4 py-2 rounded-full ${
                  category === cat.id ? cat.color : "bg-gray-200"
                }`}
              >
                <Text
                  className={`font-medium ${
                    category === cat.id ? "text-white" : "text-gray-700"
                  }`}
                >
                  {cat.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Priority Selection */}
        <View className="mb-6">
          <Text className="text-gray-700 font-medium mb-3">Priority</Text>
          <View className="space-y-2">
            {priorities.map((prio) => (
              <Pressable
                key={prio.id}
                onPress={() => setPriority(prio.id as any)}
                className={`p-4 rounded-lg border-2 ${
                  priority === prio.id
                    ? "border-primary-500 bg-primary-50"
                    : "border-gray-200 bg-white"
                }`}
              >
                <View className="flex-row items-center justify-between">
                  <Text
                    className={`font-medium ${
                      priority === prio.id
                        ? "text-primary-900"
                        : "text-gray-900"
                    }`}
                  >
                    {prio.label}
                  </Text>
                  <View className={`px-2 py-1 rounded-full ${prio.color}`}>
                    <Text className="text-xs font-medium">
                      {prio.id.toUpperCase()}
                    </Text>
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
