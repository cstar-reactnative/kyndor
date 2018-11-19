import { Dimensions, Platform } from 'react-native';

const IsIphoneX = () => {
  let d = Dimensions.get('window');
  const { height, width } = d;

  return (
    // This has to be iOS duh
    // Accounting for the height in either orientation
    Platform.OS === 'ios' && (height === 812 || width === 812)
  );
}
export default IsIphoneX;
