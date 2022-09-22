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

const resultEnum = {
  "Abaixo do peso": IMC => IMC <= 18.4,
  "Peso normal": IMC => IMC >= 18.5 && IMC <= 24.9,
  "Sobrepeso": IMC => IMC >= 25 && IMC <= 29.9,
  "Obesidade Grau I": IMC => IMC >= 30 && IMC <= 34.9,
  "Obesidade Grau II": IMC => IMC >= 35 && IMC <= 39.9,
  "Obesidade Grau III ou Mórbida": IMC => IMC >= 40,
}

const App = () => {
  const [result, setResult] = useState();
  const [peso, setPeso] = useState();
  const [altura, setAltura] = useState();
  const calculateResult = useCallback(() => {
    const hasValidValue = text => Number.isFinite(+text);
    const hasValidInput = [hasValidValue(peso), hasValidValue(altura)].every(Boolean);
    if (!hasValidInput) return Alert.alert("erro nos valores, insira numeros por favor")
    const imc = peso / (altura * altura);
    const [resultText] = Object.entries(resultEnum).find(([, calculateImcResult]) => calculateImcResult(imc))
    return setResult(resultText)
  }, [peso, altura])

  useEffect(() => {
    if (!!result) setResult("")
  }, [peso, altura])


  return (
    <SafeAreaView style={{ backgroundColor: Colors.white }}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={Colors.white}
      />
      <ScrollView style={{ paddingVertical: 30 }}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontWeight: "bold", fontSize: 25, marginBottom: 10 }}>Cálculo do IMC</Text>
          <Image source={require("./image.png")}
            style={{ width: 200, height: 200 }}
          />
        </View>
        <View style={{ flex: 1, flexDirection: "column", marginHorizontal: 20 }}>
          <TextInput
            onChangeText={text => setPeso(text)}
            style={{ flex: 1, paddingHorizontal: 10, paddingVertical: 5, marginHorizontal: 0, borderWidth: 1, borderColor: "#000", margin: 10, borderRadius: 5 }}
            keyboardType='numeric'
            placeholder='Peso' />
          <TextInput
            onChangeText={text => setAltura(text)}
            style={{ flex: 1, paddingHorizontal: 10, paddingVertical: 5, marginHorizontal: 0, margin: 10, marginBottom: 20, borderWidth: 1, borderColor: "#000", borderRadius: 5 }}
            keyboardType='numeric'
            placeholder='Altura' />
          <Button onPress={calculateResult} style={{ padding: 10, borderRadius: 5, }} title="Verificar" color={"#008000"} />
          <TextInput
            style={{
              justifyContent: "center", borderBottomColor: "#f00", borderBottomWidth: 2,
              textAlign: "center", marginTop: 10, padding: 10, paddingBottom: 3,
              color: "#000"
            }}
            editable={false}
            value={result}
            placeholder='Resultado'
          />
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
