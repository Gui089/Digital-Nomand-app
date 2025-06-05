import { cities } from "./cities";

export function useCitieDetails(id:string) {
  const city = cities.find(city => city.id === id);
  return city;
}