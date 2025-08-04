import { View, Text, FlatList, Pressable } from "react-native";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  filteredTasksAtom,
  selectedCategoryAtom,
  toggleTaskAtom,
  addTaskAtom,
  Task,
} from "../../store/tasks";
import { Stack } from "expo-router";

const categories = [
  { id: "all", label: "All", color: "bg-gray-500" },
  { id: "work", label: "Work", color: "bg-blue-500" },
  { id: "personal", label: "Personal", color: "bg-green-500" },
  { id: "shopping", label: "Shopping", color: "bg-yellow-500" },
  { id: "health", label: "Health", color: "bg-red-500" },
];

export default function TasksScreen() {
  const tasks = useAtomValue(filteredTasksAtom);
  const [selectedCategory, setSelectedCategory] = useAtom(selectedCategoryAtom);
  const toggleTask = useSetAtom(toggleTaskAtom);
  const addTask = useSetAtom(addTaskAtom);

  const addSampleTask = () => {
    addTask({
      title: "Sample Task",
      description: "This is a sample task",
      completed: false,
      category: "work",
      priority: "medium",
    });
  };

  const renderTask = ({ item }: { item: Task }) => (
    <View className="bg-white p-4 mb-3 rounded-lg shadow-sm border border-gray-100">
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <Text
            className={`text-lg font-semibold ${
              item.completed ? "text-gray-500 line-through" : "text-gray-900"
            }`}
          >
            {item.title}
          </Text>
          {item.description && (
            <Text className="text-gray-600 mt-1">{item.description}</Text>
          )}
          <View className="flex-row items-center mt-2">
            <View
              className={`px-2 py-1 rounded-full mr-2 ${
                categories.find((c) => c.id === item.category)?.color ||
                "bg-gray-500"
              }`}
            >
              <Text className="text-white text-xs font-medium">
                {categories.find((c) => c.id === item.category)?.label}
              </Text>
            </View>
            <View
              className={`px-2 py-1 rounded-full ${
                item.priority === "high"
                  ? "bg-red-100"
                  : item.priority === "medium"
                  ? "bg-yellow-100"
                  : "bg-green-100"
              }`}
            >
              <Text
                className={`text-xs font-medium ${
                  item.priority === "high"
                    ? "text-red-800"
                    : item.priority === "medium"
                    ? "text-yellow-800"
                    : "text-green-800"
                }`}
              >
                {item.priority}
              </Text>
            </View>
          </View>
        </View>
        <Pressable
          onPress={() => toggleTask(item.id)}
          className={`w-6 h-6 rounded-full border-2 ${
            item.completed ? "bg-green-500 border-green-500" : "border-gray-300"
          }`}
        >
          {item.completed && (
            <Text className="text-white text-center text-xs leading-5">✓</Text>
          )}
        </Pressable>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-50">
      <Stack.Screen options={{ title: "Tasks" }} />
      {/* Category Filter */}
      <View className="p-4">
        <Text className="text-xl font-bold text-gray-900 mb-4">My Tasks</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => setSelectedCategory(item.id)}
              className={`px-4 py-2 rounded-full mr-3 ${
                selectedCategory === item.id
                  ? "bg-primary-500"
                  : "bg-white border border-gray-200"
              }`}
            >
              <Text
                className={`font-medium ${
                  selectedCategory === item.id ? "text-white" : "text-gray-700"
                }`}
              >
                {item.label}
              </Text>
            </Pressable>
          )}
        />
      </View>

      {/* Tasks List */}
      <View className="flex-1 px-4">
        {tasks.length === 0 ? (
          <View className="flex-1 justify-center items-center">
            <Text className="text-gray-500 text-lg mb-4">No tasks yet</Text>
            <Pressable
              onPress={addSampleTask}
              className="bg-primary-500 px-6 py-3 rounded-lg"
            >
              <Text className="text-white font-semibold">Add Sample Task</Text>
            </Pressable>
          </View>
        ) : (
          <FlatList
            data={tasks}
            keyExtractor={(item) => item.id}
            renderItem={renderTask}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
}
