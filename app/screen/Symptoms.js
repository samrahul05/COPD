import React, { useState } from 'react';
import {ScrollView, View, Text, TouchableOpacity, StyleSheet,Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import API from './Api'
const FormComponent = () => {
  const navigation = useNavigation();
  const [coughFrequency, setCoughFrequency] = useState('');
  const [breathlessness, setBreathlessness] = useState('');
  const [chestTightness, setChestTightness] = useState('');
  const [difficultySleeping, setDifficultySleeping] = useState('');

  const handleQuestionSubmit = () => {
    // Log values before making the POST request
    console.log('Cough Frequency:', coughFrequency);
    console.log('Breathlessness:', breathlessness);
    console.log('Chest Tightness:', chestTightness);
    console.log('Difficulty Sleeping:', difficultySleeping);
   
    const questionData = {
      coughFrequency: coughFrequency,
      breathlessness: breathlessness,
      chestTightness: chestTightness,
      difficultySleeping: difficultySleeping
    };

    axios.post(`${API}Symptoms`, questionData)
      .then(response => {
        console.log('Question submission successful:', response.data);
        // Reset state after successful submission
        setCoughFrequency('');
        setBreathlessness('');
        setChestTightness('');
        setDifficultySleeping('');
        Alert.alert(response.data.message);
        navigation.navigate('Home');
      })
      .catch(error => {
        console.error('Question submission error:', error);
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.questionText}>How often do you cough?</Text>
        <TouchableOpacity
          style={[styles.optionButton, coughFrequency === 'Never' && styles.selectedOption]}
          onPress={() => setCoughFrequency('Never')}>
          <Text>Never</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.optionButton, coughFrequency === 'Occasionally' && styles.selectedOption]}
          onPress={() => setCoughFrequency('Occasionally')}>
          <Text>Occasionally</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.optionButton, coughFrequency === 'Frequently' && styles.selectedOption]}
          onPress={() => setCoughFrequency('Frequently')}>
          <Text>Frequently</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.optionButton, coughFrequency === 'Constantly' && styles.selectedOption]}
          onPress={() => setCoughFrequency('Constantly')}>
          <Text>Constantly</Text>
        </TouchableOpacity>
     
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.questionText}>How is your breathlessness today?</Text>
        <TouchableOpacity
          style={[styles.optionButton, breathlessness === 'Not at all' && styles.selectedOption]}
          onPress={() => setBreathlessness('Not at all')}>
          <Text>Not at all</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.optionButton, breathlessness === 'Mild' && styles.selectedOption]}
          onPress={() => setBreathlessness('Mild')}>
          <Text>Mild</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.optionButton, breathlessness === 'Moderate' && styles.selectedOption]}
          onPress={() => setBreathlessness('Moderate')}>
          <Text>Moderate</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.optionButton, breathlessness === 'Severe' && styles.selectedOption]}
          onPress={() => setBreathlessness('Severe')}>
          <Text>Severe</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.questionText}>Do you have chest tightness?</Text>
        <View style={styles.optionButtonsContainer}>
          <TouchableOpacity
            style={[styles.optionButton, chestTightness === 'Yep' && styles.selectedOption]}
            onPress={() => setChestTightness('Yep')}>
            <Text>Yep</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, chestTightness === 'Nope' && styles.selectedOption]}
            onPress={() => setChestTightness('Nope')}>
            <Text>Nope</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, chestTightness === 'Sometimes' && styles.selectedOption]}
            onPress={() => setChestTightness('Sometimes')}>
            <Text>Sometimes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, chestTightness === 'Rare' && styles.selectedOption]}
            onPress={() => setChestTightness('Rare')}>
            <Text>Rare</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.questionText}>Do you have difficulty sleeping?</Text>
        <View style={styles.optionButtonsContainer}>
          <TouchableOpacity
            style={[styles.optionButton, difficultySleeping === 'Yes' && styles.selectedOption]}
            onPress={() => setDifficultySleeping('Yes')}>
            <Text>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, difficultySleeping === 'No' && styles.selectedOption]}
            onPress={() => setDifficultySleeping('No')}>
            <Text>No</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, difficultySleeping === 'Shortly' && styles.selectedOption]}
            onPress={() => setDifficultySleeping('Shortly')}>
            <Text>Shortly</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, difficultySleeping === 'Rarely' && styles.selectedOption]}
            onPress={() => setDifficultySleeping('Rarely')}>
            <Text>Rarely</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleQuestionSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
 container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    paddingHorizontal: 20,
    marginTop:20,
  
  },
  formContainer: {
    marginBottom: 20,
  },
  optionButton: {
    borderWidth: 1,
    borderColor: '#64c4c4',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 10,
  },
  selectedOption: {
    backgroundColor: '#ccc',
  },
  questionText: {
    marginBottom:20,

    
  },
  submitButton: {
    width: '100%',
    backgroundColor: '#64c4c4', 
    textAlign:"center",
    alignItems: 'center',
    marginBottom:20,
    marginTop:20,
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
