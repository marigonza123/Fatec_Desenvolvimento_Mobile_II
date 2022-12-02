import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { Picker } from '@react-native-picker/picker';

const currency = {
  dollar: "Dollar",
  euro: "Euro",
  reais: "Reais",
  bitcoin: "Bitcoin"
}
const convertionTable = {
  [currency.dollar]: {
    [currency.reais]: "https://economia.awesomeapi.com.br/json/last/BRL-USD",
    [currency.euro]: " https://economia.awesomeapi.com.br/json/last/EUR-USD",
    [currency.bitcoin]: " https://economia.awesomeapi.com.br/json/last/BTC-USD",
  },
  [currency.reais]: {
    [currency.dollar]: "https://economia.awesomeapi.com.br/json/last/USD-BRL",
    [currency.euro]: " https://economia.awesomeapi.com.br/json/last/EUR-BRL",
    [currency.bitcoin]: " https://economia.awesomeapi.com.br/json/last/BTC-BRL",
  },
  [currency.euro]: {
    [currency.dollar]: "https://economia.awesomeapi.com.br/json/last/USD-EUR",
    [currency.reais]: " https://economia.awesomeapi.com.br/json/last/BRL-EUR",
    [currency.bitcoin]: " https://economia.awesomeapi.com.br/json/last/BTC-EUR",
  },
}
const currecyAvailable = Object.values(currency)

export default function App() {
  const [value, setValue] = useState(null);
  const [fromCurrency, setFromCurrency] = useState(currency.dollar);
  const [toCurrency, setToCurrency] = useState(currency.dollar);
  const [convertedValue, setConvertedValue] = useState("");
  useEffect(() => {
    (async () => {
      try {
        if (!fromCurrency) return;
        if (!toCurrency) return;
        const isSameCurrency = fromCurrency === toCurrency;
        if (isSameCurrency) return;
        if (!value) return;
        const baseURL = convertionTable?.[fromCurrency]?.[toCurrency];
        const api = axios.create({ baseURL })
        const {
          data
        } = await api.get("");
        const [{
          ask: conversionValue
        }] = Object.values(data)
        setConvertedValue(conversionValue * value);

      } catch (error) {
        console.log(error);
      }
    })()
  }, [value, fromCurrency, toCurrency,])

  return (
    <View style={[styles.container, { padding: 10, paddingTop: 30 }]}>
      <View ><Text style={{ fontSize: 25 }}>App Conversor de Moedas</Text></View>
      <View style={[{ flexDirection: "column", padding: 10, alignItems: "center", flex: 1, }]}>
        <View style={[{
          flexDirection: "row", alignItems: "center", paddingHorizontal: 10,
          marginVertical: 10,
        }]}>
          <Text style={{ width: 50 }}>Valor: </Text>
          <View style={{ paddingHorizontal: 10, flex: 1 }}><TextInput
            onChangeText={setValue}
            keyboardType="number-pad"
            style={[{ borderColor: "#000", borderWidth: 1, width: 200, height: 50, padding: 10 }]}
          /></View>
        </View>
        <View style={[{
          flexDirection: "row", alignItems: "center", paddingHorizontal: 10,
          marginVertical: 10,
        }]}>
          <Text style={{ width: 50 }}>De: </Text>
          <View style={{ paddingHorizontal: 10, flex: 1 }}>
            <Picker
              style={[styles.inputStyle]}
              selectedValue={toCurrency}
              onValueChange={setToCurrency}
            >
              {
                currecyAvailable.map(sexName => (
                  <Picker.Item key={sexName} value={sexName} label={sexName} />
                ))
              }
            </Picker>
          </View>
        </View>
        <View style={[{
          flexDirection: "row", alignItems: "center", paddingHorizontal: 10,
          marginVertical: 10,
        }]}>
          <Text style={{ width: 50 }}>Para: </Text>
          <View style={{ paddingHorizontal: 10, flex: 1 }}>
            <Picker
              style={[styles.inputStyle]}
              selectedValue={fromCurrency}
              onValueChange={setFromCurrency}
            >
              {
                currecyAvailable.map(sexName => (
                  <Picker.Item key={sexName} value={sexName} label={sexName} />
                ))
              }
            </Picker>
          </View>
        </View>

        <View style={[{
          flexDirection: "column", alignItems: "center", paddingHorizontal: 10,
          marginVertical: 10,
        }]}>
          <Text style={{ paddingVertical: 10 }}>Valor convertido: </Text>
          <View style={{ paddingHorizontal: 10, flex: 1 }}>
            <Text>
              {String(convertedValue)}
            </Text>
          </View>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputStyle: {
    maxHeight: 50,
    flex: 1, paddingHorizontal: 10,
    paddingVertical: 5, marginHorizontal: 0,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: "#000", margin: 10, borderRadius: 5
  }
});
