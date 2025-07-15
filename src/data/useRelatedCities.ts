import { CityPreview } from "../types";
import { cities } from "./cities";

export function useReatedCities(relatedCitiesId: string[]):CityPreview[] {
   return cities.filter((city) => relatedCitiesId.includes(city.id));
}