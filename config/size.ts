import { Dimensions, PixelRatio, Platform } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// Reference sizes for scaling (based on iPhone 12)
const BASE_WIDTH = 393;
const BASE_HEIGHT = 862;

// Scale based on width
const scale = (size: number) => (SCREEN_WIDTH / BASE_WIDTH) * size;

// Scale based on height
const verticalScale = (size: number) => (SCREEN_HEIGHT / BASE_HEIGHT) * size;

// Moderate scale for font sizes (with factor for fine-tuning)
const moderateScale = (size: number, factor = 0.8) =>
    size + (scale(size) - size) * factor;

// Font scaling that respects user font settings
const fontScale = (size: number) => moderateScale(size, 0.2);

// Exported size utility object
export const size = {
    getWidthSize: scale,
    getHeightSize: verticalScale,
    fontSize: fontScale,
    scale,
    verticalScale,
    moderateScale,
    screenWidth: SCREEN_WIDTH,
    screenHeight: SCREEN_HEIGHT,
};
