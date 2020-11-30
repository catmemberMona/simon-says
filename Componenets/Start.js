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
        <View style={{
          ...styles.view, 
          borderColor: (color !== 'transparent') ? color : 'white', 
          backgroundColor: isCorrect}}>

            {(!startBtnStatus) ?
              // when game already started, button previously pressed
              <View
                style={{...styles.startButton, borderColor: color}}
              >
                <Text style={styles.text}>{remainingClicks}</Text>
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
                  <Text style={styles.text}>Start</Text>
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
      borderRadius: 25,
      marginLeft: 8
    },
    startButton: {
        backgroundColor: 'transparent', 
        flex: 1,
        borderRadius: 25,
        borderColor: 'white',
        borderWidth: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
      color: 'white',
      fontSize: 16, 
      fontWeight: '500'
    }
})