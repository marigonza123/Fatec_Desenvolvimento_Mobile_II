import React, { useCallback, useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';


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
const sexAvailable = ["masculino", "feminino"]
const schoolingAvailable = [
  "ensino médio incompleto",
  "ensino médio completo",
  "ensino superior incompleto",
  "ensino superior completo",
]
const App = () => {
  const [name, setName] = useState(null);
  const [age, setAge] = useState(null);
  const [sex, setSex] = useState(null);
  const [schooling, setSchooling] = useState(null);
  const [creditLimit, setCreditLimit] = useState(null);
  const [isBrazilian, setIsBrazilian] = useState(null);
  const [{
    name: nameResult,
    age: ageResult,
    sex: sexResult,
    schooling: schoolingResult,
    creditLimit: creditLimitResult,
    isBrazilian: isBrazilianResult,
  } = {}, setResult] = useState();

  const onCalculateButtonPress = useCallback(() => {
    setResult({ name, age, sex, schooling, creditLimit, isBrazilian: isBrazilian ? "sim" : "nao" })
  }, [name, age, sex, schooling, creditLimit, isBrazilian])

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

            }}>Abertura de conta</Text>
            <View style={{
              flexDirection: "column",
              flex: 1,
              paddingBottom: 20,
            }}>
              <InputLine title={"Nome:"} >
                <TextInput
                  onChangeText={setName}
                  style={styles.inputStyle}
                />
              </InputLine>
              <InputLine title={"Idade:"}  >
                <TextInput
                  onChangeText={setAge}
                  style={[styles.inputStyle, { maxWidth: 50, }]}

                  keyboardType="numeric"
                  maxLength={3}
                />
              </InputLine>
              <InputLine title={"Sexo:"}  >
                <Picker
                  style={[styles.inputStyle]}
                  selectedValue={sex}
                  onValueChange={setSex}
                >
                  {
                    sexAvailable.map(sexName => (
                      <Picker.Item key={sexName} value={sexName} label={sexName} />
                    ))
                  }
                </Picker>
              </InputLine>
              <InputLine title={"Escolaridade:"}  >
                <Picker
                  style={[styles.inputStyle]}
                  selectedValue={schooling}
                  onValueChange={setSchooling}
                >
                  {
                    schoolingAvailable.map(sexName => (
                      <Picker.Item key={sexName} value={sexName} label={sexName} />
                    ))
                  }
                </Picker>
              </InputLine>
              <InputLine title={"Limite:"}  >
                <Slider
                  style={[styles.inputStyle]}
                  minimumValue={0}
                  maximumValue={10000}
                  step={100}
                  minimumTrackTintColor='green'
                  maximumTrackTintColor='green'
                  thumbTintColor='green'
                  onValueChange={setCreditLimit}
                  value={creditLimit}
                />
              </InputLine>
              <InputLine title={"Brasileiro:"}  >
                <Switch
                  style={[styles.inputStyle]}
                  onValueChange={setIsBrazilian}
                  value={isBrazilian}
                />
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
                }}>Dados informados:</Text>
                <ResultLine title={"Nome:"}  >
                  <Text style={{ color: "#000", fontSize: 15 }}>{nameResult}</Text>
                </ResultLine>
                <ResultLine title={"Idade:"}  >
                  <Text style={{ color: "#000", fontSize: 15 }}>{ageResult}</Text>
                </ResultLine>
                <ResultLine title={"Sexo:"}  >
                  <Text style={{ color: "#000", fontSize: 15 }}>{sexResult}</Text>
                </ResultLine>
                <ResultLine title={"Escolaridade:"}  >
                  <Text style={{ color: "#000", fontSize: 15 }}>{schoolingResult}</Text>
                </ResultLine>
                <ResultLine title={"Limit:"}  >
                  <Text style={{ color: "#000", fontSize: 15 }}>{creditLimitResult}</Text>
                </ResultLine>
                <ResultLine title={"Brasileiro:"}  >
                  <Text style={{ color: "#000", fontSize: 15 }}>{isBrazilianResult}</Text>
                </ResultLine>
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
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: "#000", margin: 10, borderRadius: 5
  }
});

export default App;
