import { Pressable, PressableProps } from "react-native";
import Box, { BoxProps } from "./Box";
import { Icon, IconName } from "./Icon";
import Text from "./Text";

export type PillProps = {
  label: string;
  iconName: IconName;
  active: boolean;
  onPress?: PressableProps["onPress"];
};

export const PILL_HEIGHT = 16 + 16 + 4;

export function Pill({ label, iconName, active, onPress }: PillProps) {
  return (
    <Pressable onPress={onPress}>
      <Box {...boxStyle} backgroundColor={active ? "gray1" : "transparent"}>
        <Icon name={iconName} color={active ? "primary" : "gray2"} />
        <Text ml="s4" variant="text12">
          {label}
        </Text>
      </Box>
    </Pressable>
  );
}

const boxStyle: BoxProps = {
  flexDirection: "row",
  alignItems: "center",
  borderWidth: 2,
  borderRadius: "rounded",
  borderColor: "gray1",
  paddingVertical: "s8",
  paddingHorizontal: "s12",
};
