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
  // count for the whole game
  const [count, setCount] = useState(0);
  const correct = () => {
    setCount(count+1);
  }
  const incorrect = () => {
    setCount(0);
  }

  // count starting at 1 and incrementing by 1 if user input is correct
  const [numOfPicks, setNumOfPicks] = useState(1);
 
  // number of picks decrementing to show how many inputs remaining
  const [remainingClicks, setRemaining] = useState(0);

  // generating and adding simon's colors/picks
  const [picks, setPicks] = useState([]);
  
  const generateRandomColors = (num) => {
    const colors = ['red', 'green', 'yellow', 'blue'];
    let thisPicks = [];
    for (let i = 0; i < num; i++){
      const randomInt = Math.floor(Math.random() * 4)
      console.log(randomInt)
      picks.push(colors[randomInt]);
    }
    setPicks(thisPicks);
  }

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.screen}>
        {/* Padding */}
        <View style={{flex: .3}}></View> 
        {/*-------------------------------------------- View for simon and score */}
        <View style={styles.nonTouchableArea}>
          {/*------------------------------------------------------------- Simon */}
          <View style={styles.view}>
            <TouchableHighlight 
                underlayColor='white'
                style={{...styles.columns, 
                  backgroundColor: 'transparent', 
                  flex: 1,
                  borderRadius: 100,
                  borderColor: 'white',
                  borderWidth: 3,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                onPress={() => {
                  generateRandomColors(numOfPicks) 
                  setRemaining(picks.length);
                  
                }}
              >
                <Text style={{color: 'white'}}>Start</Text>
              </TouchableHighlight>
          </View>
          {/* padding */}
          <View style={{flex: .6}}></View>
          {/* ------------------------------------------------------------ Count */}
          <View style={styles.view}>
            {/*--------------------------------------------------- Highest Count */}
            <View style={styles.view}>
              <Text style={{color: 'white'}}>Highest Accuracy: </Text>
            </View>
            {/*--------------------------------------------------- Current Count */}
            <View style={styles.view}>
              <Text style={{color: 'white'}}>Pressed this Round: {count}</Text>
            </View>
          </View>
        </View>
        {/* Padding */}
        <View style={styles.bottomHalf}>
          {/* -------------------------------------------------View for Touch area */}
          <View style={styles.interactiveArea}>
            {/* ------------------------------------------------------Four cirlces */}
            {/*--------------------------------------------------------- First row */}
            <View style={{...styles.rows}}>
              <TouchableHighlight 
                underlayColor='red'
                style={{...styles.columns, 
                  backgroundColor: 'pink', 
                  ...styles.buttons,
                  position: 'relative',
                  top: 25,
                  left: 133.33,
                }}
                onPress={correct}
              >
                <Text style={{...styles.colorText, 
                  position: 'relative',
                  top: 20,
                  left: 32
                  }}>RED</Text>
              </TouchableHighlight>
            </View>
            {/*--------------------------------------------------------- Second row */}
            <View style={{...styles.rows, 
              position: 'relative'
            }}>
              <TouchableHighlight 
                underlayColor='yellow'
                style={{...styles.columns, 
                  backgroundColor: 'lightyellow',
                  position: 'relative',
                  left: 25,
                  ...styles.buttons,}}
                onPress={correct}
              >
                <Text style={{...styles.colorText,  
                top: 30,
                left: 15
                }}>YELLOW</Text>
              </TouchableHighlight>
              {/*------------------------------------------------- Middle  */}
              {/* <View style={{alignSelf: 'center'}}>
                <Text>Current Count Remaining</Text>
              </View> */}
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
                <Text style={{...styles.colorText,
                top: 28,
                left: 20
                }}>GREEN</Text>
              </TouchableHighlight>
            </View>
            {/*--------------------------------------------------------- Third row */}
            <View style={{...styles.rows, justifyContent: 'center'}}>
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
                <Text style={{...styles.colorText,
                top: 23,
                left: 26
                }}>BLUE</Text>
              </TouchableHighlight>
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
    backgroundColor: 'black'
  },
  view:{
    flex: 1,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'white'

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
    width: 400,
    height: 400,
  },
  rows: {
    flex: 1,
  },
  buttons:{
    width: 133,
    height: 133,
    borderRadius: 25,
    transform: [{ rotate: "45deg" }]

  },
  colorText: {
    transform: [{ rotate: "-45deg" }],
    color: 'black',
    fontSize: 20,
    fontWeight: '400',
  }

  

  
});


export default App;
