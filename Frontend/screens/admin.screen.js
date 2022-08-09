import React, { useState, useEffect  } from 'react';
import { SafeAreaView } from 'react-navigation';
import { View, StyleSheet, Dimensions } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Text } from 'react-native-paper';
import {decode as atob, encode as btoa} from 'base-64'


import Button from '../components/Button';



const  AdminScreen = ({ navigation }) => {

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);
  const [testResult, setTestResult] = useState([]);
  const [show, setShow] = useState(false);
  const [avgTime, setAvgTime] = useState(0);
  const [avgMistake, setAvgMistake] = useState(0);

  useEffect(() => {
    const getAthletes = async () => {
      // method needs to be async to use await
      // await needed for turning response into json
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Basic " + btoa("admin:password")); // this should be variable
  
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
  
      let response = await fetch("http://192.168.0.53:8080/admin/getAthletes/3", requestOptions) // need variable coachID for production
      let result = await response.json()
      
      let athletes = []
      //Athlete Object: {ID: "", firstname: "", lastname: "", CoachID: ""}
      //Needed format: {label: "firstname lastname", value: ID}
      for (let i = 0; i < result.length; i++){
        let athlete = {label: result[i].firstname + " " + result[i].lastname, value: result[i].id}
        athletes.push(athlete)
      }
      setItems(athletes)
    }
    getAthletes();
  }, []);

  const onSwitchScreenPressed = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'LoginScreen' }],
    })
  }

  const onStatsPressed = () => {
    //get statistics for chosen athlete
    let athleteID = value;
    
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic " + btoa("admin:password")); // this should be variable

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    // getStats only returns finished tests
    fetch("http://192.168.0.53:8080/admin/getStats/" + athleteID, requestOptions) 
    .then(response => response.json())
    .then(result => setTestResult(result))
    
    // calculate average testresults
    if (testResult.length > 0){
      let sumTime = 0;
      let sumMistakes = 0;
      for (let i = 0; i < testResult.length; i++){
        sumTime += testResult[i].time_to_complete;
        sumMistakes += testResult[i].mistakes;
      }
      // set results to component
      setAvgTime(sumTime / testResult.length)
      setAvgMistake(sumMistakes / testResult.length)
      //make component visible
      setShow(true);
    } else {
      setAvgTime("No data found")
      setAvgMistake("No data found")
      //to show text: 
      //setShow(true)
    }
  }

  const DisplayComponent = () => {
    return (
      <View>
        <Text> Average Time: {avgTime} </Text>
        <Text> Average Mistakes: {avgMistake} </Text>
      </View>
    )
  }
    
    
    return (
        <SafeAreaView style={styles.container}>
          <View style={styles.contentContainer}>
            <View style={styles.dropdown}>
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
              />

              <View style={{paddingLeft: Dimensions.get("window").width * 0.25}}>
                <Button style={styles.button} mode="contained" onPress={onStatsPressed}>
                  Get Stats
                </Button>
              </View>
            </View>

            <View style={styles.display}>
              {show && <DisplayComponent />}
            </View>
          </View>

          <View >
            <Button mode="contained" onPress={onSwitchScreenPressed}>
              LoginScreen
            </Button>
          </View>
        </SafeAreaView>
        
    );
  }

  const styles = StyleSheet.create({
    button: {
      width: Dimensions.get("window").width * 0.5
    },
    container: {
      flex: 1,
      backgroundColor: "#FFF",
      alignContent: "center",
      padding: 20,
      backgroundColor: "lightgrey"
    },
    contentContainer: {
      flex: 1
    },
    dropdown: {
      flex: 2, 
      alignContent: "center"
    },
    display: {
      flex: 1
    }
  });

  export default AdminScreen;