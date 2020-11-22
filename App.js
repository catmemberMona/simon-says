/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableHighlight,
} from 'react-native';

const App = () => {

  // counter updates after button pressed
  const [count, setCount] = useState(0);
  const correct = () => {
    setCount(count+1);
  }
  const incorrect = () => {
    setCount(0);
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.screen}>
        {/* Padding */}
        <View style={{flex: .3}}></View> 
        {/*-------------------------------------------- View for simon and score */}
        <View style={styles.nonTouchableArea}>
          {/* Simon */}
          <View style={styles.view}>
            {/* Four cirlces */}
          </View>
          {/* padding */}
          <View style={{flex: .5}}></View>
          {/* ------------------------------------------------------------ Count */}
          <View style={styles.view}>
            {/* Highest Count */}
            <View style={styles.view}>
              <Text style={{color: 'black'}}>Highest Accuracy: </Text>
            </View>
            {/* Current Count */}
            <View style={styles.view}>
              <Text>Pressed this Round: {count}</Text>
            </View>
          </View>
        </View>
        {/* Padding */}
        <View style={styles.bottomHalf}>
          {/* View for Touch area */}
          <View style={styles.interactiveArea}>
            {/* ------------------------------------------------------Four cirlces */}
            {/*--------------------------------------------------------- First row */}
            <View style={{...styles.rows,
              // alignSelf: 'center',
              }}>
              {/* <View style={styles.columns}></View> */}
              <TouchableHighlight 
                underlayColor='red'
                style={{...styles.columns, 
                  backgroundColor: 'pink', 
                  ...styles.buttons,
                  position: 'absolute',
                  top: 25,
                  left: 133.33,
                }}
                onPress={correct}
              >
                <Text>RED</Text>
              </TouchableHighlight>
              {/* <View style={styles.columns}></View> */}
            </View>
            {/*--------------------------------------------------------- Second row */}
            <View style={{...styles.rows, 
              position: 'relative'
            }}>
              <TouchableHighlight 
                underlayColor='yellow'
                style={{...styles.columns, 
                  backgroundColor: 'lightyellow',
                  position: 'absolute',
                  left: 25,
                  ...styles.buttons,}}
                onPress={correct}
              >
                <Text>YELLOW</Text>
              </TouchableHighlight>
              {/*------------------------------------------------- Middle  */}
              <View style={{flex: .5, alignSelf: 'center'}}>
                <Text>Current Count Remaining</Text>
              </View>
              <TouchableHighlight 
                underlayColor='green'
                style={{...styles.columns, 
                  ...styles.buttons, 
                  position: 'absolute',
                  right: 25,
                  backgroundColor: 'lightgreen'}
                }
                onPress={correct}
              >
                <Text>GREEN</Text>
              </TouchableHighlight>
            </View>
            {/*--------------------------------------------------------- Third row */}
            <View style={{...styles.rows, justifyContent: 'center'}}>
              {/* <View style={styles.columns}></View> */}
              <TouchableHighlight 
                underlayColor='blue'
                style={{...styles.columns,
                  ...styles.buttons, 
                  bottom: 25,
                  left: 133.33,
                  backgroundColor: 'lightblue'}
                }
                onPress={correct}
              >
                <Text>BLUE</Text>
              </TouchableHighlight>
              {/* <View style={styles.columns}></View> */}
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
    backgroundColor: 'darkgrey'
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
    // borderStyle: 'solid',
    // borderWidth: 1,
    width: 400,
    height: 400,
  },
  rows: {
    flex: 1,
    // flexDirection: 'row',
    // borderStyle: 'solid',
    // borderWidth: 1,
  },
  columns: {
    // flex: 1,
    // borderRadius: 100,
    // backgroundColor: 'green'
    // borderStyle: 'solid',
    // borderWidth: 1,
  },
  buttons:{
    width: 133,
    height: 133,
    borderRadius: 25,
    transform: [{ rotate: "45deg" }]

  }

  

  
});

/*
notes: round buttons using borderRadius - clickable outside of circle - change shapes 

*/ 

export default App;
