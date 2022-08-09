import React, { useRef } from 'react';
import { StyleSheet, View, Dimensions } from "react-native";
import { SafeAreaView } from 'react-navigation';

import BestGameEver from '../game/game';
import Button from '../components/Button';


const  AthleteScreen = ({ navigation }) => {
  
    const onSwitchScreenPressed = () => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'LoginScreen' }],
        })
      }

    const engine = useRef(null);

    return (
        <SafeAreaView style={styles.container}>
            <View style={{flex: 1}}>
              <View style={styles.canvas}>
                  <BestGameEver /> 
                  
              </View>
            </View>
            <View style={styles.button} >
                <Button 
                  mode="contained" 
                  onPress={onSwitchScreenPressed}>
                    LoginScreen
                </Button>
            </View>
        </SafeAreaView>

        
    )
  }


  const styles = StyleSheet.create({
    canvas: {
      width: Dimensions.get("window").width * 0.9,
      height: Dimensions.get("window").height * 0.7
    },
    button: {
      paddingTop: 30,
      width: Dimensions.get("window").width * 0.9,
      height: 100
    },
    container: {
        flexDirection: 'column',
        flex: 1,
        padding: 20,
        alignContent: "center",
        backgroundColor: "lightgrey"
    }
  });

  export default AthleteScreen;

  /*
  <GameEngine
            ref={engine}
            style={{
            width: "80%",
            height: "60%",
            flex: null,
            backgroundColor: "white",
            }}
        />
        */