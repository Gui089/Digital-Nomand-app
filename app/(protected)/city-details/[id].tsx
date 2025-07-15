import { Divider } from "@/src/components/Divider";
import { ScreenContainer } from "@/src/components/ScreenContainer";
import { BottoSheetMap } from "@/src/containers/BottomSheetMap";
import { CityDetailInfo } from "@/src/containers/CityDetailInfo";
import { CityDetailsHeader } from "@/src/containers/CityDetailsHeader";
import { CityDetailsMap } from "@/src/containers/CityDetailsMap";
import { CityDetailsRelatedCities } from "@/src/containers/CityDetailsRelatedCities";
import { CityDetailsTouristAttactions } from "@/src/containers/CityDetailsTouristAttactions";
import { useCitieDetails } from "@/src/data/useCitieDetails";
import { useLocalSearchParams } from "expo-router";
import { Pressable, Text } from "react-native";
import { useSharedValue } from "react-native-reanimated";

export default function CityDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const city = useCitieDetails(id);

  const isOpen = useSharedValue(false);

  const toggleBottomSheet = () => {
    isOpen.value = !isOpen.value;
  }

  if (!city) {
    return (
      <ScreenContainer>
        <Text>City Not Found</Text>
      </ScreenContainer>
    );
  }

  return (
    <>
      <ScreenContainer style={{ paddingHorizontal: 0 }} scrollable>
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
        <CityDetailsTouristAttactions touristAttractions={city.touristAttractions} />

        <Divider paddingHorizontal="padding" />

        <Pressable onPress={toggleBottomSheet}>
          <CityDetailsMap location={city.location} />
        </Pressable>

        <Divider paddingHorizontal="padding" />

        <CityDetailsRelatedCities relatedCitiesIds={city.relatedCitiesIds}/>
      </ScreenContainer>
      <BottoSheetMap location={city.location} isOpen={isOpen} onPress={toggleBottomSheet}/>
    </>

  );
}
