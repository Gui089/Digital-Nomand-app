import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Box from "../components/Box";
import { CityCard } from "../components/CityCard";
import Text from "../components/Text";
import { useReatedCities } from "../data/useRelatedCities";
import { useAppTheme } from "../theme/useAppTheme";
import { City } from "../types";

type Props = Pick<City, "relatedCitiesIds">;

export function CityDetailsRelatedCities({ relatedCitiesIds }: Props) {
  const cities = useReatedCities(relatedCitiesIds);
  const { spacing } = useAppTheme();
  const {bottom} = useSafeAreaInsets();

  return (
    <Box style={{paddingBottom:bottom}}>
      <Text variant="title22" mb="s16" paddingHorizontal="padding">
        Veja Também
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: spacing.padding, paddingHorizontal:spacing.padding }}
      >
        {cities.map((city) => (
          <CityCard
            key={city.id}
            cityPreview={city}
            style={{ width: 200, height: 200 }}
          />
        ))}
      </ScrollView>
    </Box>
  );
}
