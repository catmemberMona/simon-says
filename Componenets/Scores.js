import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

export default Scores = (props) => {
    let {count, highScore} = props;

    return (
        <View style={styles.view}>
            {/* Highest Count */}
            <View style={styles.view}>
            <Text style={{color: 'white'}}>Highest Accuracy: {highScore}</Text>
            </View>
            {/* Current Count */}
            <View style={styles.view}>
              <Text style={{color: 'white'}}>Pressed this Game: {count}</Text>
            </View>
        </View>
        
    )
}

const styles = StyleSheet.create({
    view:{
      flex: 1,
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: 'white'
  
    }
})