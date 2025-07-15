import { PropsWithChildren } from 'react';
import { StyleSheet, TouchableOpacity } from "react-native";
import Animated, { SharedValue, useAnimatedStyle, useDerivedValue, useSharedValue, withDelay, withTiming } from "react-native-reanimated";

export type BottomSheetProps = {
  isOpen: SharedValue<boolean>;
  onPress: () => void;
  duration?: number;
};

export function BottomSheet({ children, onPress, isOpen, duration = 600 }: PropsWithChildren<BottomSheetProps>) {
  const progress = useDerivedValue(() => withTiming(isOpen.value ? 0 : 1, { duration }));

  const backDropAnimatedStyle =
    useAnimatedStyle(() => ({
      opacity: 1 - progress.value,
      zIndex: isOpen.value ? 1 : withDelay(duration, withTiming(-1, {duration: 0}))
    }));

  const height = useSharedValue(0);


  const sheetAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: progress.value * height.value }
    ],
    zIndex: 2
  }));

  return (
    <>
      <Animated.View style={[styles.backdrop, backDropAnimatedStyle]}>
        <TouchableOpacity style={{ flex: 1 }} onPress={onPress} />
      </Animated.View>

      <Animated.View
        style={[styles.sheet, sheetAnimatedStyle]}
        onLayout={(e) => {
          height.value = e.nativeEvent.layout.height;
        }}
      >
        {children}
      </Animated.View>
    </>
  )
}

const styles = StyleSheet.create({
  sheet: {
    position: 'absolute',
    width: '100%',
    bottom: 0
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)"
  }
})