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

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.screen}>
        {/* Padding */}
        <View style={{flex: .3}}></View> 
        {/* View for simon and score */}
        <View style={styles.nonTouchableArea}>
          {/* Simon */}
          <View style={styles.view}>
            {/* Four cirlces */}
          </View>
          {/* padding */}
          <View style={{flex: .5}}></View>
          {/* Count */}
          <View style={styles.view}>
            {/* Highest Count */}
            <View style={styles.view}>
              <Text style={{color: 'black'}}>Highest Count: </Text>
            </View>
            
            {/* Current Count */}
            <View style={styles.view}>
              <Text>Count: </Text>
            </View>
          </View>
        </View>
        {/* Padding */}
        <View style={styles.bottomHalf}>
          {/* View for Touch area */}
          <View style={styles.interactiveArea}>
            {/* Four cirlces */}
            <View style={styles.rows}>
              <View style={styles.columns}></View>
              <View style={styles.columns}></View>
              <View style={styles.columns}></View>
            </View>
            <View style={styles.rows}>
            <View style={styles.columns}></View>
              <View style={styles.columns}></View>
              <View style={styles.columns}></View>
            </View>
            <View style={styles.rows}>
            <View style={styles.columns}></View>
              <View style={styles.columns}></View>
              <View style={styles.columns}></View>
            </View>
          </View>
        </View>
        
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  screen:{
    flex: 1, 
  },
  view:{
    flex: 1,
    borderStyle: 'solid',
    borderWidth: 1,

  },
  nonTouchableArea: {
    flex: 1,
    flexDirection: 'row',
    
  },
  counterView: {

  },
  bottomHalf: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  interactiveArea: {
    borderStyle: 'solid',
    borderWidth: 1,
    color: 'red',
    width: 400,
    height: 400,
  },
  rows: {
    flex: 1,
    flexDirection: 'row',
    borderStyle: 'solid',
    borderWidth: 1,
  },
  columns: {
    flex: 1,
    borderStyle: 'solid',
    borderWidth: 1,
    
  }
  

  
});

export default App;
