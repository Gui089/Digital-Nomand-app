import Box from '@/src/components/Box';
import Text from '@/src/components/Text';
import { Theme } from '@/src/theme/theme';
import { useTheme } from '@shopify/restyle';

export default function HomeScreen() {
  const {colors} = useTheme<Theme>();
  
  return (
    <Box flex={1} backgroundColor='mainBackground'>
      <Text>
         home screen
      </Text>
    </Box>
  );
}
