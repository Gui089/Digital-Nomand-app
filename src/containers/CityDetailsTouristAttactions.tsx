import { Accordion } from "../components/Accordion";
import Box from "../components/Box";
import Text from "../components/Text";
import { City } from "../types";

type CityDetailsTouristAttactionsProps = Pick<City, "touristAttractions">;

export function CityDetailsTouristAttactions({
  touristAttractions,
}: CityDetailsTouristAttactionsProps) {
  return (
    <Box padding="padding">
      <Text variant="title22" mb="s8">Ponstos turísticos</Text>
      <Box gap="s8">
        {touristAttractions.map((atrraction) => (
          <Accordion
            title={atrraction.name}
            key={atrraction.id}
            description={atrraction.description}
          />
        ))}
      </Box>
    </Box>
  );
}
