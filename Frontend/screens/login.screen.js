import React, { useState } from 'react';
import { StyleSheet, View } from "react-native";
import {decode as atob, encode as btoa} from 'base-64'

import TextInput from '../components/TextInput';
import Button from '../components/Button';
import { SafeAreaView } from 'react-navigation';

/* 
Parts of the Login Screen and its components (Button, TextInput, theme) were taken from a 
public github repository: https://github.com/venits/react-native-login-template
*/
const  LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState({ value: '', error: '' })
    const [password, setPassword] = useState({ value: '', error: '' })

    /*
    // HTTP request provided by postman - excluded because of time issues
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic YWRtaW46cGFzc3dvcmQ=");
    myHeaders.append("Cookie", "JSESSIONID=38DDBE05D76AD07AA1CC264B41AE1CD5");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    */
    const onLoginPressed = () => {
      /*
        //HTTP Request for Login - excluded because it's unfinished
        fetch("http://192.168.0.53:8080/admin/getAthletes", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

      */  
     // After the Login request there should be a screen switch here
    }

    const onAdminPressed = () => {
      //workaround Button because Login is not ready
      navigation.reset({
        index: 0,
        routes: [{ name: 'AdminScreen' }],
      })
    }

    const onAthletePressed = () => {
      //workaround Button because Login is not ready
      navigation.reset({
        index: 0,
        routes: [{ name: 'AthleteScreen' }],
      })
    }
  
    return (
        <SafeAreaView style={styles.container}>
          <View >
            <TextInput
              label="Username"
              returnKeyType="next"
              value={username.value}
              onChangeText={(text) => setUsername({ value: text, error: '' })}
              error={!!username.error}
              errorText={username.error}
              autoCapitalize="none"
              autoCompleteType="username"
              textContentType="username"
            />
          </View>
          <View>
            <TextInput
              label="Password"
              returnKeyType="done"
              value={password.value}
              onChangeText={(text) => setPassword({ value: text, error: '' })}
              error={!!password.error}
              errorText={password.error}
              secureTextEntry
            />
          </View>
          <Button mode="contained" onPress={onLoginPressed}>
            Login
          </Button>
          <Button mode="contained" onPress={onAdminPressed}>
            AdminScreen
          </Button>
          <Button mode="contained" onPress={onAthletePressed}>
            AthleteScreen
          </Button>
          
          
        </SafeAreaView>
        
    )
  }

  const styles = StyleSheet.create({
    container: {
      paddingTop: "55%", 
      backgroundColor: "lightgrey",
      flex: 1
    }
  });
  export default LoginScreen;