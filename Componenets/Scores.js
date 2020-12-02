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
            <View style={{flex: 1, borderStyle: 'solid', borderBottomWidth: 1, borderColor: 'white'}}>
              <Text style={styles.scoreText}>Highest Accuracy</Text>
              <Text style={styles.scoreCount}>{highScore}</Text>
            </View>
            {/* Current Count */}
            <View style={{flex: 1}}>
              <Text style={styles.scoreText}>Correct this Game</Text>
              <Text style={styles.scoreCount}>{count}</Text>
            </View>
        </View>
        
    )
}

const styles = StyleSheet.create({
    view:{
      flex: 1,
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: 'white',
      borderRadius: 5,
      marginRight: 8,
    },
    scoreText: {
      flex: 1,
      color: 'white',
      textAlign: 'center',
    },
    scoreCount:{
      flex: 1.3,
      color: 'white',
      textAlign: 'center',
      fontSize: 16,
      fontWeight: '500',
    }
})