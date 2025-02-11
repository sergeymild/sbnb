import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { MainScreen } from './MainScreen';
import { ChildScreen } from './ChildScreen';
import { ChildNestedScreen } from './ChildNestedScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator<any>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name={'Main'} component={MainScreen} />
          <Stack.Screen name={'Child'} component={ChildScreen} />
          <Stack.Screen
            name={'ChildNested'}
            options={{ headerShown: false }}
            component={ChildNestedScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
