import React, { PureComponent , useState} from "react";
import { StyleSheet, View } from "react-native";
import { Text } from 'react-native-paper';

// parts of the game.js, renderer.js and systems.js files are taken from a public github repository.
// Source: https://github.com/bberak/react-native-game-engine

const RADIUS = 20;

class Finger extends PureComponent {
  
  render() {
    let touched = this.props.touched
    const id = this.props.id
    const x = this.props.position[0] - RADIUS / 2;
    const y = this.props.position[1] - RADIUS / 2;
    return (
      <View style={[{borderColor: "#000000",
                    borderWidth: 4,
                    borderRadius: RADIUS * 2,
                    width: RADIUS * 2,
                    height: RADIUS * 2,
                    backgroundColor: this.props.color,
                    position: "absolute",
                    alignContent: "center"}, 
                    { left: x, top: y }]}>
        <Text style={styles.text}>{id}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    finger: {
      
    },
    text: {
      color: "#ffffff",
      paddingLeft: RADIUS / 2,
      paddingTop: RADIUS / 2 - 4, // manual overwrite, no time to do it correctly
      fontSize: 15
    }

  });
  
  export {Finger};