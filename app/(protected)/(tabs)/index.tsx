import { CityCard } from '@/src/components/CityCard';
import { ScreenContainer } from '@/src/components/ScreenContainer';
import { cityPreviewList } from '@/src/data/cities';
import { Theme } from '@/src/theme/theme';
import { CityPreview } from '@/src/types';
import { useTheme } from '@shopify/restyle';
import { FlatList, ListRenderItemInfo } from 'react-native';

export default function HomeScreen() {
  const {colors} = useTheme<Theme>();

  function renderItemCity({item}:ListRenderItemInfo<CityPreview>) {
    return <CityCard cityPreview={item}/>
  };
  
  return (
    <ScreenContainer>
      <FlatList data={cityPreviewList} renderItem={renderItemCity}/>
    </ScreenContainer>
  );
}
