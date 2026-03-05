import React from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { WorkoutSet } from "@/modules/workouts/store/workout-store";
import { useColorScheme } from "nativewind";

interface WorkoutSetCardProps {
  set: WorkoutSet;
  setIndex: number;
  onUpdateReps: (reps: string) => void;
  onUpdateWeight: (weight: string) => void;
  onToggleComplete: () => void;
  onDelete: () => void;
  weightUnit: "kg" | "lbs";
  workoutStarted: boolean;
}

export default function WorkoutSetCard({
  set,
  setIndex,
  onUpdateReps,
  onUpdateWeight,
  onToggleComplete,
  onDelete,
  weightUnit,
  workoutStarted,
}: WorkoutSetCardProps) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 mb-2 flex-row items-center">
      {/* Set Number */}
      <View className="bg-blue-500 rounded-full w-8 h-8 items-center justify-center mr-3">
        <Text className="text-white text-sm font-lexend-bold">
          {setIndex + 1}
        </Text>
      </View>

      {/* Reps Input */}
      <View className="flex-1 mr-3">
        <Text className="text-xs text-gray-600 dark:text-gray-400 font-lexend-medium mb-1">
          Reps
        </Text>
        <TextInput
          value={set.reps}
          onChangeText={onUpdateReps}
          placeholder="0"
          keyboardType="numeric"
          placeholderTextColor={isDark ? "#6b7280" : "#9ca3af"}
          style={{ color: isDark ? "#ffffff" : "#111827" }}
          className="bg-white dark:bg-gray-700 rounded-lg px-3 py-2 text-center font-lexend-semibold"
        />
      </View>

      {/* Weight Input */}
      <View className="flex-1 mr-3">
        <Text className="text-xs text-gray-600 dark:text-gray-400 font-lexend-medium mb-1">
          Weight ({weightUnit})
        </Text>
        <TextInput
          value={set.weight}
          onChangeText={onUpdateWeight}
          placeholder="0"
          keyboardType="numeric"
          placeholderTextColor={isDark ? "#6b7280" : "#9ca3af"}
          style={{ color: isDark ? "#ffffff" : "#111827" }}
          className="bg-white dark:bg-gray-700 rounded-lg px-3 py-2 text-center font-lexend-semibold"
        />
      </View>

      {/* Complete Button */}
      <TouchableOpacity
        onPress={workoutStarted ? onToggleComplete : undefined}
        disabled={!workoutStarted}
        className={`rounded-full p-2 mr-2 ${
          set.isCompleted ? "bg-green-500" : workoutStarted ? "bg-gray-300" : "bg-gray-200"
        } ${!workoutStarted ? "opacity-50" : ""}`}
      >
        <Ionicons
          name={set.isCompleted ? "checkmark" : "checkmark-outline"}
          size={16}
          color={set.isCompleted ? "white" : workoutStarted ? "#6b7280" : "#9ca3af"}
        />
      </TouchableOpacity>

      {/* Delete Button */}
      <TouchableOpacity
        onPress={onDelete}
        className="bg-red-100 rounded-full p-2"
      >
        <Ionicons name="trash-outline" size={16} color="#dc2626" />
      </TouchableOpacity>
    </View>
  );
}