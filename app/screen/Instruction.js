// Instructions.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Instructions = () => {
  return (
    <View style={styles.container}>
     
      <Text style={styles.subHeading}>Instructions</Text>
      <Text style={styles.text}>1. Avoid smoking for at least one hour.</Text>
      <Text style={styles.text}>2. Don't eat heavy meals right before.</Text>
      <Text style={styles.text}>3. Sit comfortably.</Text>
      <Text style={styles.text}>4. Learn and follow the breathing technique.</Text>
      <Text style={styles.text}>5. Relax and breathe naturally.</Text>
      <Text style={styles.subHeading}>Procedures and Steps</Text>
      <Text style={styles.text}>1. Connect the mouthpiece device to your smartphone or computer.</Text>
      <Text style={styles.text}>2. Open the COPD severity-checking app.</Text>
      <Text style={styles.text}>3. Start the test by clicking the Start Test button.</Text>
      <Text style={styles.text}>4. Exhale forcefully through the mouthpiece device to empty your lungs.</Text>
      <Text style={styles.text}>5. Inhale deeply to fill your lungs completely with air.</Text>
      <Text style={styles.text}>6. Hold your breath briefly.</Text>
      <Text style={styles.text}>7. Perform the test for at least 6 seconds for better results.</Text>
      <Text style={styles.text}>8. Stop the test by clicking the Stop button on the app.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft:10,
    marginTop:10,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 15,
    marginBottom: 5,
    lineHeight:25,
  },
  subHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 5,
    textAlign: 'center',
  },
});

export default Instructions;
