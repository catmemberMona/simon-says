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
  Alert,
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
    
    
    // if the button is not correct
  }

  // ------------------------------------------------generating and adding simon's colors/picks
  const [picks, setPicks] = useState([]);
  
  const generateRandomColors = () => {
    const colors = ['red', 'green', 'yellow', 'blue'];
    
    const randomInt = Math.floor(Math.random() * 4)
    picks.push(colors[randomInt]); //......WHAT????? 
    //setPicks([...picks, colors[randomInt]]) doesn't work....

  }

  const startBtn = () => {
    // if start button was already pressed, disable start button
    if (!startBtnStatus) return;

    // when start button is pressed for the first time
    generateRandomColors(); 
    setRemaining(picks.length);
    setBtnStatus(true);
    setStartBtnStatus(false);
    runColors();
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
      console.log('before:', remainingClicks)
      setRemaining(remainingClicks - 1);
      setUserResCount(userResCount + 1);
      setIsCorrect('green')
      correct(); // note * counter works, update same state in same function call will override previous set 
      
      const delay = setTimeout(function(){
        setIsCorrect('transparent');
        clearTimeout(delay);
      }, 500)


      // remainingClicks state isn't updated yet so subtract 1
      if (remainingClicks - 1 === 0){
        setNumOfPicks(numOfPicks + 1);
        
        // when start button is pressed for the first time
        generateRandomColors(); 
        // console.log(picks)
        setRemaining(picks.length);
        runColors();
        setUserResCount(0);
      } 




    } else {
      setIsCorrect('red')
      const delay = setTimeout(function(){
        setIsCorrect('transparent');
        clearTimeout(delay);
      }, 500);


      // reset game 
      setUserResCount(0);
      setRemaining(0);
      setNumOfPicks(1);
      setCount(0);
      setPicks([]);
      setBtnStatus(false);
      setStartBtnStatus(true);
    }
  }

  // -------------save to async storage
  const [highScore, setHighScore] = useState()

  const storeData = async (value) => {
    try {
      console.log(typeof value, value)
      const score = value.toString();
      console.log(typeof score, score)
      await AsyncStorage.setItem('@HighScore', score)
    } catch (e) {
      console.log('did not save');
    }
  }

  const isHighScore = () =>{
    if (count > highScore){
      console.log('does it reach here??')
      setHighScore(count);
      storeData(count);
    }
  }

  const getData = async () => {
    try {
      // Only get data on the very first render and last render of each game
      if (!startBtnStatus) return;
      // to clear the high score for storage for any reason 
      // await AsyncStorage.removeItem('@HighScore')
      const value = await AsyncStorage.getItem('@HighScore')
      if(value !== null) {
        // value previously stored
        const score = parseInt(value);
        setHighScore(score);
      } else {
        setHighScore(0);
      }
    } catch(e) {
      console.log('did not save');
    }
  }

  getData();
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
