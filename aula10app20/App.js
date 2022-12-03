import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, Image, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';

const api = axios.create({
  baseURL: "https://sujeitoprogramador.com/r-api/?api=filmes"
})

export default function App() {
  const inputNameRef = useRef(false);
  const [userIdInput, setUserIdInput] = useState(null);
  const [movies, setMovies] = useState(null)

  useEffect(() => {
    (async () => {
      const { data } = await api.get("");
      setMovies(data);
    })()
  }, [])

  return (
    <View style={[styles.container, { padding: 10, paddingTop: 30 }]}>
      <View ><Text style={{ fontSize: 25 }}>App de Filmes</Text></View>

      <View style={[{
        padding: 10, flex: 1,
        width: "100%"
      }]}>
        <FlatList
          data={movies}
          renderItem={({ item }) => (
            <>
              <View style={[{
                padding: 10,
                marginTop: 20,
                flexDirection: "row",
                justifyContent: "space-between"
              }]}>
                <Text>{item.nome}</Text>
                <Text>Leia mais</Text>
              </View>
              <View style={[{
                padding: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                borderColor: "#000",
                borderWidth: 1
              }]}>
                <Image
                  source={{ uri: item.foto }}
                  style={{
                    width: 200,
                    height: 200,
                    flex: 1
                  }}
                  resizeMode="cover"

                />
              </View>
            </>
          )}
        />

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
