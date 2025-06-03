import { ScrollView } from "react-native";
import Box from "../components/Box";
import { CategoryPill } from "../components/CategoryPill";
import { SearchInput } from "../components/SearchInput";
import { Category } from "../types";

type CityFilterProps = {
  category: Category[];
  cityName: string;
  onChangeCityName: (name: string) => void;
  selectedCategoryId: string | null;
  onChangeSelectedCategoryId: (id: string | null) => void;
};

export function CityFilter({
  category,
  cityName,
  onChangeCityName,
  selectedCategoryId,
  onChangeSelectedCategoryId,
}: CityFilterProps) {
  return (
    <Box>
      <Box paddingHorizontal="s16">
        <SearchInput
          value={cityName}
          onChangeText={onChangeCityName}
          placeholder="Qual seu próximo destino?"
        />
      </Box>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Box mt="s16" flexDirection="row" gap="s8" paddingHorizontal="padding">
          {category.map((category) => (
            <CategoryPill
              key={category.id}
              category={category}
              active={category.id == selectedCategoryId}
              onPress={() => onChangeSelectedCategoryId(category.id === selectedCategoryId ? null : category.id)}
            />
          ))}
        </Box>
      </ScrollView>
    </Box>
  );
}
