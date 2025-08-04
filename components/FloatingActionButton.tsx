import { Pressable, Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";

interface FloatingActionButtonProps {
  onPress: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function FloatingActionButton({
  onPress,
}: FloatingActionButtonProps) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.9);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={animatedStyle}
      className="absolute bottom-6 right-6 w-14 h-14 bg-primary-500 rounded-full shadow-lg justify-center items-center"
    >
      <Text className="text-white text-2xl font-light">+</Text>
    </AnimatedPressable>
  );
}
