import { Divider } from "@/src/components/Divider";
import { ScreenContainer } from "@/src/components/ScreenContainer";
import { CityDetailInfo } from "@/src/containers/CityDetailInfo";
import { CityDetailsHeader } from "@/src/containers/CityDetailsHeader";
import { CityDetailsMap } from "@/src/containers/CityDetailsMap";
import { CityDetailsRelatedCities } from "@/src/containers/CityDetailsRelatedCities";
import { CityDetailsTouristAttactions } from "@/src/containers/CityDetailsTouristAttactions";
import { useCitieDetails } from "@/src/data/useCitieDetails";
import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";

export default function CityDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const city = useCitieDetails(id);

  if (!city) {
    return (
      <ScreenContainer>
        <Text>City Not Found</Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer style={{ paddingHorizontal: 0 }}>
      <CityDetailsHeader
        id={city.id}
        categories={city.categories}
        coverImage={city.coverImage}
      />
      <CityDetailInfo
        name={city.name}
        country={city.country}
        description={city.description}
      />
      <Divider paddingHorizontal="padding" />
      <CityDetailsTouristAttactions />
      <Divider paddingHorizontal="padding" />
      <CityDetailsMap />
      <Divider paddingHorizontal="padding" />
      <CityDetailsRelatedCities />
    </ScreenContainer>
  );
}
