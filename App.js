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
  View,
  StatusBar,
} from 'react-native';

import Start from './Componenets/Start'
import Scores from './Componenets/Scores'
import UserResponse from './Componenets/UserResponse';


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
  const [buttonStatus, setBtnStatus] = useState(false); // user response button
  const [startBtnStatus, setStartBtnStatus] = useState(true);

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
    if (!startBtnStatus) return;

    // when start button is pressed for the first time
    generateRandomColors(numOfPicks); 
    setRemaining(picks.length);
    setBtnStatus(true);
    setStartBtnStatus(false);
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

        // needs to be length of arr plus 1 to go through all colors 
        // will console log color as 'transparent' for all
        if (index === picks.length + 1){ 
          setColor('transparent');
          clearInterval(run);
        }

    }, 800); 
  }

  // ------------------------------------------------------------------- match user input for color chosen 
  const [isCorrect, setIsCorrect] = useState('transparent');
  const [userResCount, setUserResCount] = useState(0);
  const isMatch = (usersPick) => {
    
    const pick = picks[userResCount];
    // console.log(usersPick, picks)
    if (usersPick === pick){
      setRemaining(remainingClicks - 1);
      setUserResCount(userResCount + 1);
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
        <View style={styles.nonTouchableArea}> 
          {/* Simon and Start button */}
          <Start 
            isCorrect={isCorrect} 
            startBtnStatus={startBtnStatus} 
            color={color} 
            remainingClicks={remainingClicks} 
            startBtn={startBtn}
            />
          {/* padding */}
          <View style={{flex: .6}}></View>
          {/* Scores/Counters */}
          <Scores count={count} />
        </View>
        {/* Padding */}
        <View style={styles.bottomHalf}>
          {/* View for Touch area/ User Says buttons */}
          <UserResponse pressed={pressed}/>
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
  nonTouchableArea: {
    flex: 1,
    flexDirection: 'row',
    
  },
  bottomHalf: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },

});


export default App;
