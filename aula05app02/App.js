import React, { useCallback, useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const App = () => {
  const [first, setFirst] = useState(null);
  const [second, setSecond] = useState(null);
  const [result, setResult] = useState("     ");

  const onCalculateButtonPress = useCallback(() => {
    const multiplicationResult = second * first;
    setResult(multiplicationResult)
  }, [first, second])

  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={"#fff"}
      />
      <View style={{ flex: 1 }}>

        <View style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}>
          <View style={{
            justifyContent: "center",
            flex: 1,
            marginHorizontal: 30

          }}>
            <Text style={{
              color: "#000",
              textAlign: "center",
              paddingBottom: 30,
              fontSize: 25
            }}>Multiplicador de numeros</Text>
            <TextInput
              onChangeText={setFirst}
              style={{ maxHeight: 50, flex: 1, paddingHorizontal: 10, paddingVertical: 5, marginHorizontal: 0, borderWidth: 1, borderColor: "#000", margin: 10, borderRadius: 5 }}
              keyboardType='numeric'
              placeholder='Digite o primeiro numero' />
            <TextInput
              onChangeText={setSecond}
              style={{ maxHeight: 50, flex: 1, paddingHorizontal: 10, paddingVertical: 5, marginHorizontal: 0, borderWidth: 1, borderColor: "#000", margin: 10, borderRadius: 5 }}
              keyboardType='numeric'
              placeholder='Digite o segundo numero' />
            <TouchableOpacity
              style={{
                backgroundColor: "#4480E3",
                margin: 20,
                padding: 10,
                alignItems: "center",
              }}
              onPress={onCalculateButtonPress}
            >
              <Text style={{
                color: "#fff",
                fontSize: 18
              }}>
                Calcular
              </Text>
            </TouchableOpacity>
            <View style={{
              flexDirection: "row",
              justifyContent: "center"
            }}>
              <Text style={{
                color: "#68A932",
                textAlign: "center",
                paddingBottom: 30,
                fontSize: 25
              }}>Resultado: </Text>
              <Text style={{
                color: "#68A932",
                textAlign: "center",
                paddingBottom: 30,
                fontSize: 25,
                textDecorationLine: "underline"
              }}>{result}</Text>
            </View>
          </View>
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
