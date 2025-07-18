import { Link } from "expo-router";
import { ImageBackground, ImageBackgroundProps, Pressable } from "react-native";
import { useAppTheme } from "../theme/useAppTheme";
import { CityPreview } from "../types";
import Box from "./Box";
import { Icon } from "./Icon";
import Text from "./Text";

type CityCardProps = {
  cityPreview: CityPreview;
  style?:ImageBackgroundProps;
};

export function CityCard({ cityPreview, style}: CityCardProps) {
  const { borderRadii } = useAppTheme();

  return (
    <Link push href={`/city-details/${cityPreview.id}`} asChild>
      <Pressable>
        <ImageBackground
          source={cityPreview.coverImage}
          style={[{ width: "100%", height: 280 }, style]}
          imageStyle={{ borderRadius: borderRadii.default }}
        >
          <Box
            position="absolute"
            width="100%"
            height="100%"
            backgroundColor="midnightBlack"
            opacity={0.25}
          />
          <Box flex={1} padding="s24" justifyContent="space-between">
            <Box alignSelf="flex-end">
              <Icon name="Favorite-outline" color="text" />
            </Box>

            <Box>
              <Text variant="title22">{cityPreview.name}</Text>
              <Text variant="text16">{cityPreview.country}</Text>
            </Box>
          </Box>
        </ImageBackground>
      </Pressable>
    </Link>
  );
}
