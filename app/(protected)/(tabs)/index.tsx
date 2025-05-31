import { CityCard } from "@/src/components/CityCard";
import { ScreenContainer } from "@/src/components/ScreenContainer";
import { CityFilter } from "@/src/containers/CityFilter";
import { cityPreviewList } from "@/src/data/cities";
import { Theme } from "@/src/theme/theme";
import { CityPreview } from "@/src/types";
import { useScrollToTop } from "@react-navigation/native";
import { useTheme } from "@shopify/restyle";
import { useRef } from "react";
import { FlatList, ListRenderItemInfo } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { colors } = useTheme<Theme>();
  const flatListRef = useRef(null);
  const {top} = useSafeAreaInsets();
  useScrollToTop(flatListRef);

  function renderItemCity({ item }: ListRenderItemInfo<CityPreview>) {
    return <CityCard cityPreview={item} />;
  }

  return (
    <ScreenContainer>
      <FlatList
        ref={flatListRef}
        data={cityPreviewList}
        renderItem={renderItemCity}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 16, paddingTop:top, paddingBottom:16 }}
        ListHeaderComponent={<CityFilter />}
      />
    </ScreenContainer>
  );
}
