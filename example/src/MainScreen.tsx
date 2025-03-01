import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native-sbnb';

export const MainScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <StatusBar
        navBarColor={'yellow'}
        barStyle={'light-content'}
        backgroundColor={'#42f55a'}
      />
      <TouchableOpacity onPress={() => navigation.navigate('Child')}>
        <Text children={'Open Child'} />
      </TouchableOpacity>
    </View>
  );
};
