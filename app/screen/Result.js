import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import axios from 'axios';
import Api from './Api';

const Result = () => {
  const [userData, setUserData] = useState(null);
  const [fetchData, setFetchData] = useState(null);
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchDataFromApi = async () => {
    try {
      setLoading(true); // Set loading to true before fetching data
      const response = await fetch('https://api.thingspeak.com/channels/2543307/feeds.json?api_key=TPP8EN0V8Z8QV3MX&results');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonData = await response.json();
      console.log("getdata", jsonData.feeds);
      console.log("fetch:",jsonData.feeds)
      setFetchData(jsonData.feeds);
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false); // Set loading to false in case of error
    }
  };

  const fetchUserData = async () => {
    try {
      setLoading(true); // Set loading to true before fetching data
      const response = await axios.get(`${Api}GetUserdata`);
      setUserData(response.data);
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error('Error fetching data:', error);
      setUserData([]); // Set empty array in case of error
      setLoading(false); // Set loading to false in case of error
    }
  };

  // Parse float values from fetched data
  const field1Data = fetchData ? fetchData.map(item => parseFloat(item.field1)) : [];
  const field2Data = fetchData ? fetchData.map(item => parseFloat(item.field2)) : [];
  const field3Data = fetchData ? fetchData.map(item => parseFloat(item.field3)) : [];
//  console.log("field1Data",field1Data);
//  console.log("field2Data",field2Data);
//  console.log("field3Data",field3Data);
  const FEV1 = field1Data[field1Data.length - 1];
  const FEV6 = field2Data[field2Data.length - 1];
  const FEV6_1 = field3Data[field3Data.length - 1];

  let value = FEV1 + FEV6;

  let severityLabel = '';
  let severityColor = '';

  if (value >= 70) {
    severityLabel = 'Mild';
    severityColor = 'green';
  } else if (value >= 60 && value <= 69) {
    severityLabel = 'Moderate';
    severityColor = 'yellow';
  } else if (value >= 50 && value <= 59) {
    severityLabel = 'Moderately Severe';
    severityColor = 'orange';
  } else if (value >= 35 && value <= 49) {
    severityLabel = 'Severe';
    severityColor = 'red';
  } else {
    severityLabel = 'Null';
    severityColor = 'darkred';
  }

  // console.log(field1Data);
  const data = {
    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'], // Adjust as per your data
    datasets: [
      {
        data: field1Data.length === 0 ? Array(10).fill(0) : field1Data,
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        strokeWidth: 2
      },
      {
        data: field2Data.length === 0 ? Array(10).fill(0) : field2Data,
        color: (opacity = 1) => `rgba(255, 99, 71, ${opacity})`,
        strokeWidth: 2
      },
      {
        data: field3Data.length === 0 ? Array(10).fill(0) : field3Data,
        color: (opacity = 1) => `rgba(0, 128, 0, ${opacity})`,
        strokeWidth: 2
      },
    ],
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <View style={styles.infoContainer}>
            {userData && (
              <>
                <Text style={styles.subHeading}>Basic Information</Text>
                <Text style={styles.text}>Name: {userData.BasicInfo.Name || 'NULL'}</Text>
                <Text style={styles.text}>Age: {userData.BasicInfo.Age ? `${userData.BasicInfo.Age} years` : 'NULL'}</Text>
                <Text style={styles.text}>Height: {userData.BasicInfo.Height ? `${userData.BasicInfo.Height} cm` : 'NULL'}</Text>
                <Text style={styles.text}>Weight: {userData.BasicInfo.Weight ? `${userData.BasicInfo.Weight} kg` : 'NULL'}</Text>
                <Text style={styles.text}>Gender: {userData.BasicInfo.Gender || 'NULL'}</Text>
                <Text style={styles.text}>Smoker Status: {userData.BasicInfo.smokingStatus || 'NULL'}</Text>
                <Text style={styles.subHeading}>Selected Symptoms:</Text>
                <Text style={styles.text}>Breathlessness: {userData.Symptoms.breathlessness || 'NULL'}</Text>
                <Text style={styles.text}>Chest Tightness: {userData.Symptoms.chestTightness || 'NULL'}</Text>
                <Text style={styles.text}>Cough Frequency: {userData.Symptoms.coughFrequency || 'NULL'}</Text>
                <Text style={styles.text}>Difficulty Sleeping: {userData.Symptoms.difficultySleeping || 'NULL'}</Text>
              </>
            )}
            <Button title='MEASURE' style={styles.btn} onPress={fetchDataFromApi} />
          </View>
        )}

        <View style={styles.chartContainer}>
          <LineChart
            data={data}
            width={350}
            height={220}
            yAxisLabel={''}
            chartConfig={{
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: 6,
                strokeWidth: 2,
                stroke: '#ffa726',
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>

        <Text>Result</Text>

        <View style={styles.last}>
          <View style={styles.table}>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={styles.cellText}></Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.cellText}>Value</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.cellText}>Normal</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={styles.cellText}>FEV1:</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.cellText}>{(field1Data[field1Data.length - 1] ? field1Data[field1Data.length - 1] : "null")}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.cellText}>2.5-6.0 L</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={styles.cellText}>FEV6:</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.cellText}>{(field2Data[field2Data.length - 1]) ? (field2Data[field2Data.length - 1]) : "null"}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.cellText}>3.0-7.0 L</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={styles.cellText}>FEV6/FEV1:</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.cellText}>{`${(field3Data[field3Data.length - 1]*50) ? (field3Data[field3Data.length - 1]*50) : "null"}%`}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.cellText}> {`>70%`} </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 18, color: severityColor }}>{severityLabel}</Text>
        </View>
        <Text style={styles.container}>{`${value}%`}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  infoContainer: {
    marginBottom: 20,
  },
  subHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 3,
  },
  btn: {
    marginBottom: 20,
  },
  table: {
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
  },
  cellText: {
    textAlign: 'center',
  },
});

export default Result;
