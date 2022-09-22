import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';


const App = () => {
  const [result, setResult] = useState();
  const calculateResult = useCallback(() => {
    const randomNumber = Math.floor(Math.random() * 10);
    setResult(String(randomNumber))
  }, [setResult])

  return (
    <SafeAreaView style={{ backgroundColor: Colors.white }}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={Colors.white}
      />
      <ScrollView style={{ paddingVertical: 30 }}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontWeight: "bold", fontSize: 25, marginBottom: 10 }}>Alcool ou Gasolina</Text>
          <Image source={require("./image.jpeg")}
            style={{ width: 200, height: 150 }}
          />
        </View>
        <View style={{ flex: 1, flexDirection: "column", marginHorizontal: 20 }}>
          <Text style={{
            textAlign: "center",
            color: "#f00",
            fontSize: 16,
            fontWeight: "bold"
          }}>Pense em um numero de 0 a 10:</Text>
          <TextInput
            style={{
              justifyContent: "center", borderBottomColor: "#f00", borderBottomWidth: 2,
              textAlign: "center", marginVertical: 10, padding: 10, paddingBottom: 3,
              color: "#000",
            }}
            editable={false}
            value={result}
            placeholder='Resultado'
          />
          <Button onPress={calculateResult} style={{ padding: 10, borderRadius: 5, }} title="Verificar" color={"#008000"} />
        </View>
      </ScrollView>
    </SafeAreaView>
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
