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
  // ---------------------------------------------------------------- count for the whole game
  const [count, setCount] = useState(0);
  const correct = () => {
    setCount(count+1);
  }
  const incorrect = () => {
    setCount(0);
  }


  // ----------------------------------------------------------------- count for each rount 
  // count starting at 1 and incrementing by 1 if user input is correct
  const [numOfPicks, setNumOfPicks] = useState(1);
 
  // number of picks decrementing to show how many inputs remaining
  const [remainingClicks, setRemaining] = useState(0);


  // ---------------------------------------------------- conditions for state of start button
  const [buttonStatus, setBtnStatus] = useState(false);

  const pressed = (colorChoice) => {
    if (!buttonStatus) return;
    // console.log('remainingClicks inside pressed func:', remainingClicks)
    // if the button is correct
    isMatch(colorChoice);
    correct();
    // if the button is not correct
  }

  // ------------------------------------------------generating and adding simon's colors/picks
  const [picks, setPicks] = useState([]);
  
  const generateRandomColors = (num) => {
    const colors = ['red', 'green', 'yellow', 'blue'];
    let thisPicks = [];
    for (let i = 0; i < num; i++){
      const randomInt = Math.floor(Math.random() * 4)
      picks.push(colors[randomInt]);
    }
    setPicks(thisPicks);
  }

  const startBtn = () => {
    // if start button was already pressed, disable start button
    if (buttonStatus) return;

    // when start button is pressed for the first time
    generateRandomColors(numOfPicks); 
    setRemaining(picks.length);
    setBtnStatus(true);
    runColors();
    // need to set state again or else could not use picks inside isMatch function later on
    // and is reset to and empty array...
    setPicks(picks);
  }

  // ------------------------------------------------------------------- simon runs through colors in picks
  const [color, setColor] = useState('transparent')
  const runColors = () => {
    let index = 0;

    const run = setInterval(function(){
        let nextColor;
        
        if (color === 'transparent'){
          nextColor = picks[index];
          index += 1; 
        } else {
          nextColor = 'transparent';
        }

        setColor(nextColor);

        // needs to be length of array + 1 to go through all colors 
        // will console log as 'transparent' for all
        if (index === picks.length + 1){ 
          setColor('transparent');
          clearInterval(run);
        }

    }, 500); 
  }

  // ------------------------------------------------------------------- match user input for color chosen 
  const [isCorrect, setIsCorrect] = useState('transparent');
  const isMatch = (usersPick) => {
    
    const index = remainingClicks - 1; // might need to run colors backwards
    const pick = picks[index]
    console.log(usersPick, picks)
    if (usersPick === pick){
      setRemaining(remainingClicks - 1);
      setIsCorrect('green')
      const delay = setTimeout(function(){
        setIsCorrect('transparent');
        clearTimeout(delay);
      }, 500)
    } else {
      setIsCorrect('red')
      const delay = setTimeout(function(){
        setIsCorrect('transparent');
        clearTimeout(delay);
      }, 500)
    }
  }



  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.screen}>
        {/* Padding */}
        <View style={{flex: .3}}></View> 
        {/*-------------------------------------------- View for simon and score */}
        <View style={styles.nonTouchableArea}>
          {/*------------------------------------------------------------- Simon and Start button */}
          <View style={{...styles.view, backgroundColor: isCorrect}}>
            {(buttonStatus) ?
              // when game already started, button previously pressed
              <View
                style={{...styles.startButton, borderColor: color}}
              >
                <Text style={{color: 'white'}}>{remainingClicks}</Text>
              </View> :
              // when start button hasn't been pressed yet
              <TouchableHighlight 
                  underlayColor='white'
                  style={styles.startButton}
                  onPress={() => {
                    startBtn();
                    // console.log('picks inside of touch start button onpress:', picks)
                  }}
                >
                  <Text style={{color: 'white'}}>Start</Text>
                </TouchableHighlight>
            }
            
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
              <Text style={{color: 'white'}}>Pressed this Game: {count}</Text>
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
                onPress={() => {
                  // console.log('picks inside of button onpress:', picks)
                  pressed('red')}}
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
                onPress={() => pressed('yellow')}
              >
                <Text style={{...styles.colorText,  
                top: 30,
                left: 15
                }}>YELLOW</Text>
              </TouchableHighlight>
              {/*------------------------------------------------- Middle  */}
              <TouchableHighlight 
                underlayColor='green'
                style={{...styles.columns,
                  ...styles.buttons, 
                  position: 'absolute',
                  right: 25,
                  backgroundColor: 'lightgreen'}
                }
                onPress={() => pressed('green')}
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
                onPress={() => pressed('blue')}
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
  },
  startButton: {
    ...this.columns, 
    backgroundColor: 'transparent', 
    flex: 1,
    borderRadius: 100,
    borderColor: 'white',
    borderWidth: 5,
    justifyContent: 'center',
    alignItems: 'center'
  }

  

  
});


export default App;
