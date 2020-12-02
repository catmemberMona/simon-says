/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
} from 'react-native';

import Start from './Componenets/Start';
import Scores from './Componenets/Scores';
import UserResponse from './Componenets/UserResponse';


const App = () => {
  // count update after button pressed for the whole game
  const [count, setCount] = useState(0);

  // count for each round 
  // starting at 1 and incrementing by 1 if user input is correct
  const [numOfPicks, setNumOfPicks] = useState(1);
 
  // number of picks decrementing to show number of responses remaining
  const [remainingClicks, setRemaining] = useState(1);
 
  // conditions for state of start button
  const [buttonStatus, setBtnStatus] = useState(false); // user response button
  const [startBtnStatus, setStartBtnStatus] = useState(true);

  // list of colors for the game
  const [picks, setPicks] = useState([]);

  // color that will show for simon 
  const [color, setColor] = useState('transparent');

  // color shown to show correctness of user choice
  // green for incorrect, red for correct, and transparent for waiting
  const [isCorrect, setIsCorrect] = useState('transparent');

  // user response count for each round in the game
  const [userResCount, setUserResCount] = useState(0);

  // highest score the user ever had on this device
  const [highScore, setHighScore] = useState();


  // user's response 
  const pressed = (colorChoice) => {
    // if game hasn't started yet
    if (!buttonStatus) return;

    // check to see if user response is correct or incorrect
    isMatch(colorChoice);
  }

  // generating and adding simon's colors/picks
  const generateRandomColor = () => {
    const colors = ['red', 'green', 'yellow', 'blue'];
    const randomInt = Math.floor(Math.random() * 4)

    picks.push(colors[randomInt]);
    //setPicks([...picks, colors[randomInt]]) doesn't work.
  }

  const startBtn = () => {
    // if start button was already pressed, disable start button
    if (!startBtnStatus) return;

    // when start button is pressed for the first time
    generateRandomColor(); 
    setBtnStatus(true);
    setStartBtnStatus(false);
    runColors();
  }

  // simon runs through colors in picks
  const runColors = () => {
    let index = 0;
    let runningPicks = [];

    // to differentiate between each color that is running
    for (let i = 0; i < picks.length; i++){
      runningPicks.push(picks[i]);
      runningPicks.push('transparent');
    }

    // slight delay to when colors start running
    const delay = setTimeout(function(){
      // each color will appear at a set time 
      const run = setInterval(function(){
        let nextColor;
        
        nextColor = runningPicks[index];
        index+=1;
        setColor(nextColor);

        // once all colors have run, this loop will end
        if (index === runningPicks.length){ 
          clearInterval(run);
        }
      }, 800); 

      // once run ends, need to clear delay
      clearTimeout(delay);
    }, 500)
  }

  // match user response to correct answer
  const isMatch = (usersPick) => {
    const pick = picks[userResCount];

    // user response is correct
    if (usersPick === pick){
      setRemaining(remainingClicks - 1);
      setUserResCount(userResCount + 1);
      setIsCorrect('green')
      setCount(count+1);
      
      // sets back to transparent when waiting for next response
      const delay = setTimeout(function(){
        setIsCorrect('transparent');
        clearTimeout(delay);
      }, 500)

      // remainingClicks state isn't updated yet so subtract 1
      if (remainingClicks - 1 === 0){
        // increase the number of colors by one 
        setNumOfPicks(numOfPicks + 1);
        generateRandomColor(); 
        
        // start of next round
        setRemaining(picks.length);
        runColors();
        setUserResCount(0);
      } 

    } else {
      // user response is incorrect
      setIsCorrect('red')

      // sets back to transparent when waiting for next response
      const delay = setTimeout(function(){
        setIsCorrect('transparent');
        clearTimeout(delay);
      }, 500);

      // reset entire game 
      setUserResCount(0);
      setRemaining(1);
      setNumOfPicks(1);
      setCount(0);
      setPicks([]);
      setBtnStatus(false);
      setStartBtnStatus(true);
    }
  }

  // save to async storage
  const storeData = async (value) => {
    try {
      // can store str type, not int type
      const score = value.toString();
      await AsyncStorage.setItem('@HighScore', score)
    } catch (e) {
      console.log('did not save');
    }
  }
  // only save new highScore to storage if current score is higher
  const isHighScore = () =>{
    if (count > highScore){
      setHighScore(count);
      storeData(count);
    } 
  }

  const getData = async () => {
    try {
      // to clear the high score from storage for any reason 
      // await AsyncStorage.removeItem('@HighScore')

      // Only get data on the very first render and last render of each game
      if (!startBtnStatus) return;

      const value = await AsyncStorage.getItem('@HighScore')
      if(value !== null) {
        // value previously stored will return as a str type
        const score = parseInt(value);
        setHighScore(score);
      } else {
        // high score was not previously stored 
        setHighScore(0);
      }
    } catch(e) {
      console.log('did not save');
    }
  }

  // get the saved data from local storage - high score
  getData();
  // checks to see if current score is higher than high score
  isHighScore();

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.screen}>
        {/* Padding */}
        <View style={{flex: .3}}></View> 
        <View style={styles.topArea}> 
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
          <Scores count={count} highScore={highScore}/>
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
  topArea: {
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
