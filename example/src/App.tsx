import * as React from 'react';
import {useState} from 'react';

import {ImageBackground, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {setSystemUIColor, StatusBar, toggleFitsSystemWindows} from 'react-native-sbnb';

export default function App() {
  const [statusBarVisible, setStatusBarVisible] = useState(false)

  return (
    <View style={styles.container}>
      {statusBarVisible && <StatusBar backgroundColor={'#f1f1f130'} translucent barStyle={'dark-content'} />}
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

      <TouchableOpacity style={{alignSelf: 'center', marginTop: 50, backgroundColor: 'black'}} onPress={() => {
        setStatusBarVisible(!statusBarVisible)
      }}>
        <Text children={'setStatusBarVisible'}/>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
