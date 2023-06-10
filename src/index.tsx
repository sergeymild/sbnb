import {ColorValue, NativeModules, Platform, processColor} from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-sbnb' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const Sbnb = NativeModules.Sbnb
  ? NativeModules.Sbnb
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function setSystemUIColor(color: ColorValue, opacity: number = 0) {
  return Sbnb.setSystemUIColor(processColor(color), opacity)
}

export function toggleFitsSystemWindows(isEnabled: boolean) {
  return Sbnb.toggleFitsSystemWindows(isEnabled)
}
