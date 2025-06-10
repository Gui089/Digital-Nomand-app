import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
  interpolate,
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import theme from "../theme/theme";
import Box from "./Box";
import Text from "./Text";

type AccordionProps = {
  title: string;
  description: string;
};

export function Accordion({ title, description }: AccordionProps) {
  const isOpen = useSharedValue(false);
  const progress = useSharedValue(0);

  function handleOpenPress() {
    isOpen.value = !isOpen.value;
    progress.value = withTiming(isOpen.value ? 0 : 1, { duration: 500 });
  }

  return (
    <Pressable onPress={() => handleOpenPress()}>
      <View>
        <AccordionHeader title={title} progress={progress} />
        <AccordtionBody
          description={description}
          isOpen={isOpen}
          progress={progress}
        />
      </View>
    </Pressable>
  );
}

function AccordionHeader({
  title,
  progress,
}: {
  title: string;
  progress: SharedValue<number>;
}) {
  const iconAnimatedStyle = useAnimatedStyle(() => ({
    tintColor: interpolateColor(
      progress.value,
      [0, 1],
      [theme.colors.gray2, theme.colors.primary]
    ),
    transform: [
      {
        rotate: interpolate(progress.value, [0, 1], [0, -180]) + "deg",
      },
    ],
  }));

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [theme.colors.transparent, theme.colors.gray1]
    ),
    borderBottomLeftRadius: interpolate(
      progress.value,
      [0, 1],
      [theme.borderRadii.default, 0]
    ),
    borderBottomRightRadius: interpolate(
      progress.value,
      [0, 1],
      [theme.borderRadii.default, 0]
    ),
  }));

  return (
    <Animated.View style={[styles.header, animatedStyle]}>
      <Box flexShrink={1}>
        <Text variant="title16">{title}</Text>
      </Box>
      <Animated.Image
        source={require("../../assets/images/Chevron down.png")}
        style={[iconAnimatedStyle, { width: 24, height: 24 }]}
      />
    </Animated.View>
  );
}

function AccordtionBody({
  description,
  isOpen,
  progress,
}: {
  description: string;
  isOpen: SharedValue<boolean>;
  progress: SharedValue<number>;
}) {
  const height = useSharedValue(0);

  const anymatedStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(progress.value, [0, 1], [0, height.value]),
      borderTopLeftRadius: interpolate(
        progress.value,
        [0, 1],
        [theme.borderRadii.default, 0]
      ),
      borderTopRightRadius: interpolate(
        progress.value,
        [0, 1],
        [theme.borderRadii.default, 0]
      ),
      opacity: interpolate(progress.value, [0, 1], [0, 1]),
    };
  });

  return (
    <Animated.View style={[anymatedStyle, { overflow: "hidden" }]}>
      <View
        style={styles.body}
        onLayout={(e) => {
          height.value = e.nativeEvent.layout.height;
        }}
      >
        <Text>{description}</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderWidth: 2,
    borderColor: theme.colors.gray1,
    borderRadius: theme.borderRadii.default,
    alignItems: "center",
  },
  body: {
    position: "absolute",
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: theme.colors.gray1,
    borderBottomLeftRadius: theme.borderRadii.default,
    borderBottomRightRadius: theme.borderRadii.default,
  },
});
