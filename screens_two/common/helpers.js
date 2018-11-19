import { Dimensions, PixelRatio } from "react-native";

const { width, height } = Dimensions.get("window");

const isPortrait = height > width;

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 640;

const scale = size =>
  isPortrait
    ? (width / guidelineBaseWidth) * size
    : (height / guidelineBaseWidth) * size;
const heightScale = size =>
  isPortrait
    ? (height / guidelineBaseHeight) * size
    : (width / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

export { scale as w, heightScale as h, moderateScale as m };
