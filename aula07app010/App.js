import React, { useCallback, useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';


const ResultLine = ({
  title,
  children
}) => {
  return (
    <View style={{
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
    }}>
      <Text style={{
        fontSize: 16,
        fontWeight: "bold",
        paddingRight: 5
      }}>
        {title}
      </Text>
      {children}
    </View>
  )
}

const InputLine = ({
  title,
  children
}) => {
  return (
    <View style={{
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
    }}>
      <Text style={{
        fontSize: 20,
        fontWeight: "bold"
      }}>
        {title}
      </Text>
      {children}
    </View>
  )
}
const currency = {
  dollar: "Dollar",
  euro: "Euro",
  reais: "Reais",
}
const convertionTable = {
  [currency.dollar]: {
    [currency.reais]: (dollarValue) => 5.26 * dollarValue,
    [currency.euro]: (dollarValue) => 1.03 * dollarValue,
  },
  [currency.reais]: {
    [currency.dollar]: (dollarValue) => dollarValue / 5.26,
    [currency.euro]: (dollarValue) => dollarValue / 5.10,
  },
  [currency.euro]: {
    [currency.dollar]: (dollarValue) => 0.97 * dollarValue,
    [currency.reais]: (dollarValue) => 5.10 * dollarValue,
  },
}
const currecyAvailable = Object.values(currency)

const App = () => {
  const [value, setValue] = useState(null);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [convertedValue, setConvertedValue] = useState();

  const onCalculateButtonPress = useCallback(() => {

    const convertionFunction = convertionTable?.[fromCurrency]?.[toCurrency]
    setConvertedValue(
      convertionFunction?.(value)?.toFixed?.(2)
    )
  }, [value, fromCurrency, toCurrency,])

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
              paddingVertical: 15,
              fontSize: 25,

            }}>Conversor de Moedas</Text>
            <View style={{
              flexDirection: "column",
              flex: 1,
              paddingBottom: 20,
            }}>
              <InputLine title={"Valor:"} >
                <TextInput
                  onChangeText={setValue}
                  style={styles.inputStyle}
                  keyboardType="numeric"
                />
              </InputLine>

              <InputLine title={"De:"}  >
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
              </InputLine>
              <InputLine title={"Para:"}  >
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
              </InputLine>
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
                flexDirection: "column",
              }}>
                <Text style={{
                  color: "#000",
                  fontSize: 25
                }}>Resultado:</Text>
                <Text style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  paddingRight: 5
                }}>
                  {convertedValue}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    maxHeight: 50,
    flex: 1, paddingHorizontal: 10,
    paddingVertical: 5, marginHorizontal: 0,
    borderWidth: 1,
    marginLeft: 5,
    borderColor: "#000", margin: 10, borderRadius: 5
  }
});

export default App;
