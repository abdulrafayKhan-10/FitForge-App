import { CustomInputProps } from "@/shared/types/customComponents";
import { Image, Text, TextInput, View } from "react-native";
import { useColorScheme } from "nativewind";

const CustomInput = ({
  label,
  icon,
  secureTextEntry = false,
  labelStyle,
  containerStyle,
  inputStyle,
  iconStyle,
  className,
  ...props
}: CustomInputProps) => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  return (
    <View className="my-2 w-full">
      {label && (
        <Text className={`text-lg font-lexend-semibold mb-2 dark:text-white ${labelStyle}`}>
          {label}
        </Text>
      )}
      <View
        className={`flex flex-row justify-start items-center relative bg-neutral-100 dark:bg-gray-700 rounded-2xl border border-neutral-100 dark:border-gray-600 focus:border-primary-500 ${
          icon ? "pl-4" : ""
        }  ${containerStyle}`}
      >
        {icon && icon}
        <TextInput
          className={`rounded-full p-4 font-lexend text-[15px] flex-1 ${inputStyle} text-left text-gray-900 dark:text-white`}
          secureTextEntry={secureTextEntry}
          placeholderTextColor={isDark ? "#6b7280" : "#9ca3af"}
          {...props}
        />
      </View>
    </View>
  );
};

export default CustomInput;
