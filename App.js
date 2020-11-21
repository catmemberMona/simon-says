/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.screen}>
        {/* View for simon and score */}
        <View>
          {/* Simon */}
          <View>
            {/* Four cirlces */}
          </View>
          {/* Count */}
          <View>
            {/* Highest Count */}
            <View>
              <Text></Text>
            </View>
            {/* Current Count */}
            <View>
              <Text></Text>
            </View>
          </View>
        </View>
        {/* View for Touch area */}
        <View>
          {/* Four cirlces */}
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  screen:{
    flex: 1, 
    backgroundColor: 'green'

  },
  
});

export default App;
