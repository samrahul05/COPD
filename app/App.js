import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Basicinformation from './screen/Basicinformation'; 
import Symptoms from './screen/Symptoms';
import Instructions from './screen/Instruction';
import Result from './screen/Result';
import RegistrationForm from './screen/RegistrationForm';
import Login from './screen/Login';

// Home Screen
const HomeScreen = ({ navigation }) => (
  <View style={styles.container}>
    <CustomButton title="Basic information" onPress={() => navigation.navigate('Basicinformation')} />
    <CustomButton title="Symptoms" onPress={() => navigation.navigate('Symptoms')} />
    <CustomButton title="Instructions" onPress={() => navigation.navigate('Instructions')} />
    <CustomButton title="Result" onPress={() => navigation.navigate('Result')} />
  
  </View>
);

// Custom Button Component
const CustomButton = ({ title, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

// Stack Navigator
const Stack = createStackNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLoggedIn ? 'Home' : 'Login'}>
        <Stack.Screen name="Login">
          {props => <Login {...props} setIsLoggedIn={setIsLoggedIn} />}
        </Stack.Screen>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Basicinformation" component={Basicinformation} />
        <Stack.Screen name="Symptoms" component={Symptoms} />
        <Stack.Screen name="Instructions" component={Instructions} />
        <Stack.Screen name="Result" component={Result} />
        <Stack.Screen name="RegistrationForm" component={RegistrationForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  button: {
    width: 250,
    height: 50,
    backgroundColor: '#102a7e',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default App;
