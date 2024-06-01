import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import Api from './Api'

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

function LoginPage() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit() {
    console.log(email, password);
    const userData = {
      email:email,
      password: password,
    };
    console.log(userData);
    try {
      const response = await axios.post(
        `${Api}login`,
        userData
      );
      console.log(response.data);
      if (response.data.status === 'ok') {
        Alert.alert('Logged In Successfully');
        AsyncStorage.setItem('token', response.data.data);
        AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
        // AsyncStorage.setItem('userType', response.data.userType);
        if (response.data.userType) { // Check if userType is defined
          AsyncStorage.setItem('userType', response.data.userType);
        }
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.data}`;
        navigation.navigate('Home');
       
      }
      else{
        Alert.alert(response.data.message);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      Alert.alert('Login Failed', 'Please check your credentials and try again');
    }
  }

  async function getData() {
    try {
      const data = await AsyncStorage.getItem('isLoggedIn');
      console.log(data, 'at app.jsx');
    } catch (error) {
      console.error('Error while getting data:', error);
    }
  }

  useEffect(() => {
    getData();
    console.log('Hello');
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="always">
      <View style={{ backgroundColor: 'white'}}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('../assets/02.jpg')}
          />
        </View>
        <View style={styles.loginContainer}>
          <Text style={styles.text_header}>Login !!!</Text>
          <View style={styles.action}>
            {/* <FontAwesome
              name="user-o"
              color="#64c4c4"
              style={styles.smallIcon}
            /> */}
            <TextInput
              placeholder="Email"
              style={styles.textInput}
              onChangeText={text => setEmail(text)}
            />
          </View>
          <View style={styles.action}>
            {/* <FontAwesome
              name="lock"
              color="#64c4c4"
              style={styles.smallIcon}
            /> */}
            <TextInput
              placeholder="Password"
              style={styles.textInput}
              onChangeText={text => setPassword(text)}
              secureTextEntry
            />
          </View>
        </View>
        <View style={styles.button}>
          <TouchableOpacity style={styles.inBut} onPress={handleSubmit}>
            <View>
              <Text style={styles.textSign}>Log in</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.registerContainer}>
            {/* <Text style={styles.text}>Don't have an account?</Text> */}
            <TouchableOpacity
              onPress={() => navigation.navigate('RegistrationForm')}>
              <Text style={styles.registerText}>Register here</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}



export default LoginPage;
