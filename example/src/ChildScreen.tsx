import React from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {StatusBar} from "react-native-sbnb";

export const ChildScreen: React.FC = () => {
  const navigation = useNavigation<any>()
  return <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    <StatusBar barStyle={'dark-content'} backgroundColor={'#9342f5'}/>
    <TouchableOpacity onPress={navigation.goBack}>
      <Text children={'Go back'}  style={{color: 'black'}}/>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => navigation.navigate('ChildNested')}>
      <Text children={'Nested child'}  style={{color: 'black'}}/>
    </TouchableOpacity>
  </View>
};
