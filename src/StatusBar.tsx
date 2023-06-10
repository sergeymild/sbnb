import React from "react";
import {Platform} from "react-native";
import {setStatusBarStyle, setSystemUIColor, toggleFitsSystemWindows} from "./index";


function createStackEntry(props: any): any {
  return {
    backgroundColor: props.backgroundColor,
    barStyle: props.barStyle,
    translucent: props.translucent,
    hidden: props.hidden,
  }
}

function mergePropsStack(
  propsStack: Array<any>,
  defaultValues: any,
): any {
  return propsStack.reduce(
    (prev, cur) => {
      for (const prop in cur) {
        // @ts-ignore
        if (cur[prop] != null) {
          // @ts-ignore
          prev[prop] = cur[prop];
        }
      }
      return prev;
    },
    {...defaultValues},
  );
}



export class StatusBar extends React.Component<{
  backgroundColor?: string;
  translucent?: boolean;
  barStyle?: ('default' | 'light-content' | 'dark-content'),
}> {
  static _propsStack: Array<any> = []

  static _defaultProps: any = createStackEntry({
    backgroundColor: 'black',
    barStyle: 'default',
    translucent: false,
    hidden: false,
    networkActivityIndicatorVisible: false,
  })
  static _updateImmediate?: any;
  static _currentValues: {
    hidden: boolean;
    translucent: boolean;
    barStyle:('default' | 'light-content' | 'dark-content')
  } | null = null;

  static setBackgroundColor(color: string): void {
    setSystemUIColor(color)
  }

  static toggleFitsSystemWindows(isEnabled: boolean) {
    if (Platform.OS !== 'android') return
    StatusBar._defaultProps.translucent = isEnabled
    toggleFitsSystemWindows(isEnabled)
  }

  static pushStackEntry(props: any): any {
    const entry = createStackEntry(props)
    StatusBar._propsStack.push(entry)
    StatusBar._updatePropsStack()
    return entry
  }

  static popStackEntry(entry: any) {
    const index = StatusBar._propsStack.indexOf(entry)
    if (index !== -1) StatusBar._propsStack.splice(index, 1)

    StatusBar._updatePropsStack()
  }

  static replaceStackEntry(entry: any, props: any): any {
    const newEntry = createStackEntry(props)
    const index = StatusBar._propsStack.indexOf(entry)
    if (index !== -1) StatusBar._propsStack[index] = newEntry

    StatusBar._updatePropsStack()
    return newEntry
  }

  _stackEntry = null

  componentDidMount() {
    this._stackEntry = StatusBar.pushStackEntry(this.props)
  }

  componentWillUnmount() {
    StatusBar.popStackEntry(this._stackEntry)
  }

  componentDidUpdate() {
    this._stackEntry = StatusBar.replaceStackEntry(this._stackEntry, this.props)
  }

  /**
   * Updates the native status bar with the props from the stack.
   */
  static _updatePropsStack = () => {
    // Send the update to the native module only once at the end of the frame.
    clearImmediate(StatusBar._updateImmediate)
    StatusBar._updateImmediate = setImmediate(() => {
      const oldProps = StatusBar._currentValues
      const mergedProps = mergePropsStack(
        StatusBar._propsStack,
        StatusBar._defaultProps,
      )
      console.log('[StatusBar.]', mergedProps)

      // Update the props that have changed using the merged values from the props stack.
      if (Platform.OS === 'ios') {
        if (!oldProps || oldProps.hidden !== mergedProps.hidden) {

        }
      } else if (Platform.OS === 'android') {
        if (mergedProps.backgroundColor == null) {
        } else {
          setSystemUIColor(mergedProps.backgroundColor)
        }
        setStatusBarStyle(mergedProps.barStyle === 'dark-content')

        if (
          !oldProps ||
          oldProps.translucent !== mergedProps.translucent ||
          mergedProps.translucent
        ) {
          toggleFitsSystemWindows(mergedProps.translucent)
        }
      }
      // Update the current prop values.
      StatusBar._currentValues = mergedProps
    })
  }

  render() {
    return null
  }
}
