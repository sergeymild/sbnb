import React from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import {StatusBar} from "react-native-sbnb";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator<any>()



export const One: React.FC = () => {
return (
  <View style={{flex: 1}}>
    <StatusBar backgroundColor={'#9342f550'} translucent barStyle={'dark-content'}/>
    <TouchableOpacity>
      <Text children={'Go back'} style={{color: 'black'}}/>
    </TouchableOpacity>
  </View>
)
};

export const Two: React.FC = () => {
return (
  <View style={{flex: 1}}>
    <StatusBar backgroundColor={'#ddf542'} changeOnFocus translucent={false} barStyle={'light-content'}/>
    <TouchableOpacity style={{}}>
      <Text children={'Go back'} style={{color: 'black'}}/>
    </TouchableOpacity>
  </View>
)
};

export const ChildNestedScreen: React.FC = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name={'One'} component={One}/>
      <Tab.Screen name={'Two'} component={Two}/>
    </Tab.Navigator>
  )
};
