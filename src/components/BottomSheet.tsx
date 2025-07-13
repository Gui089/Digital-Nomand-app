import { PropsWithChildren } from 'react';
import { StyleSheet, TouchableOpacity } from "react-native";
import Animated, { SharedValue, useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from "react-native-reanimated";

type BottomSheetProps = {
  isOpen: SharedValue<boolean>;
  onPress: () => void;
  duration?: number;
};

export function BottomSheet({ children, onPress, isOpen, duration = 600 }: PropsWithChildren<BottomSheetProps>) {

  const backDropAnimatedStyle =
    useAnimatedStyle(() => ({
      zIndex: isOpen.value ? 1 : -1
    }));

  const height = useSharedValue(0);

  const progress = useDerivedValue(() => withTiming(isOpen.value ? 0 : 1, { duration }));

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