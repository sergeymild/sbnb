import * as React from 'react';

import {ImageBackground, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {setSystemUIColor, toggleFitsSystemWindows} from 'react-native-sbnb';

export default function App() {


  return (
    <View style={styles.container}>
      <ImageBackground source={{uri: 'https://i.stack.imgur.com/0iSwH.png'}} style={StyleSheet.absoluteFill} />
      <TouchableOpacity style={{alignSelf: 'center', marginTop: 300, backgroundColor: 'black'}} onPress={() => {
        const randomColor = Math.floor(Math.random()*16777215).toString(16);
        setSystemUIColor(`#${randomColor}80`)
        // setSystemUIColor(`#${randomColor}`)
      }}>
        <Text children={'Change color'}/>
      </TouchableOpacity>

      <TouchableOpacity style={{alignSelf: 'center', marginTop: 50, backgroundColor: 'black'}} onPress={() => {
        toggleFitsSystemWindows(true)
      }}>
        <Text children={'immersiveStatusBar'}/>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
