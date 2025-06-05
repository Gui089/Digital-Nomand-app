import { PropsWithChildren } from "react";
import Box, { BoxProps } from "./Box";


export function ScreenContainer({children, ...boxProps}:PropsWithChildren & BoxProps) {
  return (
    <Box backgroundColor="background" flex={1}>
      {children}
    </Box>
  )
}