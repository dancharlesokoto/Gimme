import { useFonts } from "expo-font";
import { fonts } from "../constants/fonts";
export function useAppFonts() {
  const [isLoaded] = useFonts({
    "Satoshi-Bold": fonts.BOLD,
    "Satoshi-Regular": fonts.REGULAR,
    "Satoshi-SemiBold": fonts.SEMIBOLD,
    "Satoshi-Medium": fonts.MEDIUM,
  });

  return isLoaded;
}
