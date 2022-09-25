import React, { useState } from 'react';
import {
  Button,
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const App = () => {
  const [count, setCount] = useState(0)

  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={"#fff"}
      />
      <View style={{ flex: 1 }}>
        <View style={{
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
          flex: 1,
        }}>
          <Text style={{
            color: "#000"
          }}>Contador de pessoas</Text>
          <View style={{
            flexDirection: "column", width: 100, height: 100, borderWidth: 1, borderColor: "#000", marginVertical: 40,
            justifyContent: "center", alignItems: "center"
          }}>
            <Text style={{
              color: "#f00",
              fontSize: 40
            }}>
              {count}
            </Text>
          </View>
        </View>
        <View style={{
          flexDirection: "column",
          justifyContent: "flex-start",
          flex: 1,
        }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#5CE344",
              margin: 20,
              alignItems: "center",
            }}
            onPress={() => { setCount(countValue => countValue + 1) }}
          >
            <Text style={{
              color: "#fff",
              fontSize: 40
            }}>
              +
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#E34444",
              margin: 20,
              alignItems: "center",
            }}
            onPress={() => { setCount(countValue => countValue - 1) }}
          >
            <Text style={{
              color: "#fff",
              fontSize: 40
            }}>
              -
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
