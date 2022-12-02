import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';

const api = axios.create({
  baseURL: "https://viacep.com.br/ws/"
})
const ResultLine = ({
  title,
  children
}) => {
  return (
    <View style={{
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      paddingBottom: 10,
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

export default function App() {
  const inputNameRef = useRef(false);
  const [cepInput, setCepInput] = useState(null);
  const [addressData, setaddressData] = useState(null)
  const searchAddress = useCallback(async () => {
    try {
      const {
        data: {
          cep,
          logradouro,
          uf: estado,
          bairro,
          localidade: cidade,
        }
      } = await api.get(cepInput + "/json");
      setaddressData({
        cep,
        logradouro,
        estado,
        bairro,
        cidade,
      })
    } catch (error) {
      console.log(error);
    }
  }, [cepInput])
  return (
    <View style={[styles.container, { padding: 10, paddingTop: 30 }]}>
      <View ><Text style={{ fontSize: 25 }}>CEP x Endereço</Text></View>
      <View style={[{ flexDirection: "row", padding: 10, alignItems: "flex-end" }]}>
        <View style={[{ flexDirection: "row", alignItems: "center", paddingHorizontal: 10, }]}>

          <View style={{ paddingHorizontal: 10 }}><TextInput
            onChangeText={setCepInput}
            ref={inputNameRef}
            placeholder="digite o cep"
            style={[{ borderColor: "#000", borderWidth: 1, width: 200, height: 50, padding: 10 }]}
          /></View>
          <View ><TouchableOpacity
            style={[{ height: 50, width: 50, alignItems: "center", justifyContent: "center", borderColor: "#000", borderWidth: 1, borderRadius: 50 }]}
            onPress={searchAddress}
          ><Text>+</Text></TouchableOpacity></View>
        </View>
      </View>
      <View style={[{ padding: 10, flex: 1, width: "100%", alignItems: "flex-start", borderWidth: 1, borderColor: "#000", }]}>
        <View style={{
          flexDirection: "column",
          paddingLeft: 40
        }}>
          <ResultLine title={"Cep:"}  >
            <Text style={{ color: "#000", fontSize: 15 }}>{addressData?.cep ?? "-"}</Text>
          </ResultLine>
          <ResultLine title={"Logradouro:"}  >
            <Text style={{ color: "#000", fontSize: 15 }}>{addressData?.logradouro ?? "-"}</Text>
          </ResultLine>
          <ResultLine title={"Bairro:"}  >
            <Text style={{ color: "#000", fontSize: 15 }}>{addressData?.bairro ?? "-"}</Text>
          </ResultLine>
          <ResultLine title={"Cidade:"}  >
            <Text style={{ color: "#000", fontSize: 15 }}>{addressData?.cidade ?? "-"}</Text>
          </ResultLine>
          <ResultLine title={"Estado:"}  >
            <Text style={{ color: "#000", fontSize: 15 }}>{addressData?.estado ?? "-"}</Text>
          </ResultLine>
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
