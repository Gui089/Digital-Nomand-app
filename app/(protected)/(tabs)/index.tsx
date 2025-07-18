import Box from "@/src/components/Box";
import { CityCard } from "@/src/components/CityCard";
import { ScreenContainer } from "@/src/components/ScreenContainer";
import { CityFilter } from "@/src/containers/CityFilter";
import { categories } from "@/src/data/categories";
import { useCities } from "@/src/data/useCities";
import { useDebounce } from "@/src/hooks/useDebounce";
import { Theme } from "@/src/theme/theme";
import { CityPreview } from "@/src/types";
import { useScrollToTop } from "@react-navigation/native";
import { useTheme } from "@shopify/restyle";
import { useRef, useState } from "react";
import { ListRenderItemInfo } from "react-native";
import Animated, { FadingTransition } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { colors } = useTheme<Theme>();
  const flatListRef = useRef(null);
  const { top } = useSafeAreaInsets();
  const [name, setName] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const debouncedCityName = useDebounce(name);
  const { cityPreviewList } = useCities({name:debouncedCityName, categoryId: selectedCategoryId});

  useScrollToTop(flatListRef);

  function renderItemCity({ item }: ListRenderItemInfo<CityPreview>) {
    return (
      <Box paddingHorizontal="s16">
        <CityCard cityPreview={item} />
      </Box>
    );
  }

  return (
    <ScreenContainer style={{ paddingHorizontal: 0 }}>
      <Animated.FlatList
        itemLayoutAnimation={FadingTransition.duration(500)}
        ref={flatListRef}
        data={cityPreviewList}
        renderItem={renderItemCity}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 16, paddingTop: top, paddingBottom: 16 }}
        ListHeaderComponent={
          <CityFilter
            category={categories}
            cityName={name}
            onChangeCityName={setName}
            selectedCategoryId={selectedCategoryId}
            onChangeSelectedCategoryId={setSelectedCategoryId}
          />
        }
      />
    </ScreenContainer>
  );
}
