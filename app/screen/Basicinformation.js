import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import API from './Api'

import axios from 'axios';
const FormComponent = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('');
  const [smokingStatus, setSmokingStatus] = useState('');

  const handleSubmit = () => {
    // Create a data object with the form values
    const data = {
      name: name,
      age: age,
      height: height,
      weight: weight,
      gender: gender,
      smokingStatus:smokingStatus
    };
    console.log(data);

    // Perform Axios POST request
    axios.post(`${API}BasicInformation`, data)
      .then(response => {
        // Handle success
        console.log('POST request successful:', response.data);
         
        // Reset form fields after successful submission
        setName('');
        setAge('');
        setHeight('');
        setWeight('');
        setGender('');
        setSmokingStatus('');
        Alert.alert(response.data.message);
        navigation.navigate('Home');
      })
      
      .catch(error => {
        // Handle error
        console.error('Error:', error);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={text => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        value={age}
        onChangeText={text => setAge(text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Height (cm)"
        value={height}
        onChangeText={text => setHeight(text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Weight (kg)"
        value={weight}
        onChangeText={text => setWeight(text)}
        keyboardType="numeric"
      />
      <View style={styles.buttonGroup}>
      <TouchableOpacity
          style={[styles.optionButton, gender === 'Male' && styles.selectedOption]}
          onPress={() => setGender('Male')}>
          <Text>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.optionButton, gender === 'Female' && styles.selectedOption]}
          onPress={() => setGender('Female')}>
          <Text>Female</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.optionButton, gender === 'Others' && styles.selectedOption]}
          onPress={() => setGender('Others')}>
          <Text>Others</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={[styles.optionButton, smokingStatus === 'Smoker' && styles.selectedOption]}
          onPress={() => setSmokingStatus('Smoker')}>
          <Text>Smoker</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.optionButton, smokingStatus === 'Non-Smoker' && styles.selectedOption]}
          onPress={() => setSmokingStatus('Non-Smoker')}>
          <Text>Non-smoker</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.optionButton, smokingStatus === 'Ex-smoker' && styles.selectedOption]}
          onPress={() => setSmokingStatus('Ex-Smoker')}>
          <Text>Ex-smoker</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
 
    paddingHorizontal: 20,
  },
  input: {
    // borderWidth: 1,
    // borderColor: '#ccc',
    // borderRadius: 5,
    // width: '100%',
    // height: 40,
    // paddingHorizontal: 10,
    // marginBottom: 10,
    width: '100%',
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#64c4c4',
    fontWeight:"bold",
    color:"black",
    fontSize:15,
    borderRadius:10 ,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 10,
  },
  optionButton: {
    borderWidth: 1,
    borderColor: '#64c4c4',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    // alignItems: 'center',
    flex: 1,
    marginRight: 5,
  },
  selectedOption: {
    backgroundColor: '#ccc',
  },
  submitButton: {

    width: '100%',
    backgroundColor: '#64c4c4', 
    textAlign:"center",
    alignItems: 'center',
    marginTop:30,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 20,
  },
  submitButtonText: {
    color: '#fff', // Text color
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FormComponent;
