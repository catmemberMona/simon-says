import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';


export default Start = (props) => {
    let {isCorrect, startBtnStatus, color, remainingClicks, startBtn} = props;

    return (
        <View style={{...styles.view, backgroundColor: isCorrect}}>
            {(!startBtnStatus) ?
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
    )
}

const styles = StyleSheet.create({
    view:{
      flex: 1,
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: 'white'
  
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
})