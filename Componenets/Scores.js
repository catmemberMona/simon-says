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
            <Text style={{color: 'white'}}>Highest Accuracy: {highScore}</Text>
            </View>
            {/* Current Count */}
            <View style={{flex: 1}}>
              <Text style={{color: 'white'}}>Correct this Game: {count}</Text>
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
      marginRight: 8
  
    }
})