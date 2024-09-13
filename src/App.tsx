import '../gesture-handler.native';
import {View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './presentation/screens/home/HomeScreen';

const App = () => {
  return (
    <NavigationContainer>
      <View>
        <HomeScreen />
      </View>
    </NavigationContainer>
  );
};

export default App;
