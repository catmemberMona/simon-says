import React from 'react';
import Sound from 'react-native-sound';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';

// import greenSound from './../greenSound.wav'


// const playSoundEffect = color => {
//   // from react-native-sound doc -- look for more info
//   var whoosh = new Sound(greenSound, Sound.MAIN_BUNDLE, (error) => {
//     if (error) {
//       console.log('failed to load the sound', error);
//       return;
//     }
//     // loaded successfully
//     console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());
  
//     // Play the sound with an onEnd callback
//     whoosh.play((success) => {
//       if (success) {
//         console.log('successfully finished playing');
//       } else {
//         console.log('playback failed due to audio decoding errors');
//       }
//     });
//   });
// }

const RedButton = props => {
  const {pressed, styles} = props;
  return (
    <TouchableHighlight 
      underlayColor='red'
      style={{
        backgroundColor: 'pink', 
        ...styles.buttons,
        position: 'relative',
        top: 25,
        left: 133.33,
      }}
      onPress={() => {
        // console.log('picks inside of button onpress:', picks)
        // playSoundEffect();
        pressed('red')
      }}
    >
      <Text style={{...styles.colorText, 
        position: 'relative',
        top: 20,
        left: 32
        }}>RED</Text>
    </TouchableHighlight> 
  )
};

const YellowButton = props => {
  const {pressed, styles} = props;
  return (
    <TouchableHighlight 
      underlayColor='yellow'
      style={{
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
  )
};

const GreenButton = props => {
  const {pressed, styles} = props;
  return (
    <TouchableHighlight 
      underlayColor='green'
      style={{
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
  )
}

const BlueButton = props => {
  const {pressed, styles} = props;
  return (
    <TouchableHighlight 
      underlayColor='blue'
      style={{
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
  )
};


{/* Four buttons */}
export default UserResponse = (props) => {
  const {pressed} = props;
  return (
    <View style={styles.interactiveArea}>
      
      {/*--------------------------------------------------------- First row */}
      <View style={{...styles.rows}}>
        <RedButton pressed={pressed} styles={styles} />
      </View>
      {/*--------------------------------------------------------- Second row */}
      <View style={{...styles.rows, 
        position: 'relative'
      }}>
        <YellowButton pressed={pressed} styles={styles} />
        {/* Middle  */}
        <GreenButton pressed={pressed} styles={styles} />
      </View>
      {/*--------------------------------------------------------- Third row */}
      <View style={{...styles.rows, justifyContent: 'center'}}>
        <BlueButton pressed={pressed} styles={styles} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
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