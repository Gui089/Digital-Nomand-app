import { PropsWithChildren } from "react";
import { ScrollView } from "react-native";
import Box, { BoxProps } from "./Box";

export function ScreenContainer({
  children,
  scrollable = false,
  ...boxProps
}: PropsWithChildren & BoxProps & { scrollable?: boolean }) {
  const Container = scrollable ? ScrollView : Box;
  return (
    <Box backgroundColor="background" flex={1} {...boxProps}>
      <Container>{children}</Container>
    </Box>
  );
}
