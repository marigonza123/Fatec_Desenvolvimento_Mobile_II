import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Alert,
  Button,
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

const resultEnum = {
  0: "Alcool",
  1: "Gasolina"
}

const App = () => {
  const [result, setResult] = useState();
  const [alcool, setAlcool] = useState();
  const [gasolina, setGasolina] = useState();
  const calculateResult = useCallback(() => {
    const hasValidValue = text => Number.isFinite(+text);
    const hasValidInput = [hasValidValue(alcool), hasValidValue(gasolina)].every(Boolean);
    if (!hasValidInput) return Alert.alert("erro nos valores, insira numeros por favor")
    const gasolinaIsBestComparedToAlcool = !!((alcool / gasolina) > 0.7);
    return setResult(resultEnum[+gasolinaIsBestComparedToAlcool])
  }, [alcool, gasolina])

  useEffect(() => {
    if (!!result) setResult("")
  }, [alcool, gasolina])


  return (
    <SafeAreaView style={{ backgroundColor: Colors.white }}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={Colors.white}
      />
      <ScrollView style={{ paddingVertical: 30 }}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontWeight: "bold", fontSize: 25, marginBottom: 10 }}>Alcool ou Gasolina</Text>
          <Image source={require("./image.png")}
            style={{ width: 200, height: 200 }}
          />
        </View>
        <View style={{ flex: 1, flexDirection: "column", marginHorizontal: 20 }}>
          <TextInput
            onChangeText={text => setAlcool(text)}
            style={{ flex: 1, paddingHorizontal: 10, paddingVertical: 5, marginHorizontal: 0, borderWidth: 1, borderColor: "#000", margin: 10, borderRadius: 5 }}
            keyboardType='numeric'
            placeholder='Preço do alcool' />
          <TextInput
            onChangeText={text => setGasolina(text)}
            style={{ flex: 1, paddingHorizontal: 10, paddingVertical: 5, marginHorizontal: 0, margin: 10, marginBottom: 20, borderWidth: 1, borderColor: "#000", borderRadius: 5 }}
            keyboardType='numeric'
            placeholder='Preço da Gasolina' />
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
