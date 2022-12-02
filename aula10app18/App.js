import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';

const api = axios.create({
  baseURL: "https://api.github.com/users/"
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
  const [userIdInput, setUserIdInput] = useState(null);
  const [githubUserData, setGithubUserData] = useState(null)
  const searchGithubProfile = useCallback(async () => {
    try {
      const {
        data: {
          followers: seguidores,
          following: seguindo,
          created_at: criado_em,
          avatar_url: url_perfil,
          public_repos: repositorios,
          id,
          login: nome,
        }
      } = await api.get(userIdInput);

      setGithubUserData({
        seguidores,
        seguindo,
        criado_em,
        url_perfil,
        repositorios,
        id,
        nome,
      })
    } catch (error) {
      console.log(error);
    }
  }, [userIdInput])

  return (
    <View style={[styles.container, { padding: 10, paddingTop: 30 }]}>
      <View ><Text style={{ fontSize: 25 }}>App Perfil de Devs</Text></View>
      {githubUserData?.url_perfil && <Image
        source={{ uri: githubUserData.url_perfil }}
        style={{
          width: 200,
          height: 200,
        }}
        resizeMode="contain"
      />}
      <View style={[{ flexDirection: "row", padding: 10, alignItems: "flex-end" }]}>
        <View style={[{ flexDirection: "row", alignItems: "center", paddingHorizontal: 10, }]}>

          <View style={{ paddingHorizontal: 10 }}><TextInput
            onChangeText={setUserIdInput}
            ref={inputNameRef}
            placeholder="Digite o login git..."
            style={[{ borderColor: "#000", borderWidth: 1, width: 200, height: 50, padding: 10 }]}
          /></View>
          <View ><TouchableOpacity
            style={[{ height: 50, width: 50, alignItems: "center", justifyContent: "center", borderColor: "#000", borderWidth: 1, borderRadius: 50 }]}
            onPress={searchGithubProfile}
          ><Text>+</Text></TouchableOpacity></View>
        </View>
      </View>
      <View style={[{ padding: 10, flex: 1, width: "100%", alignItems: "flex-start", borderWidth: 1, borderColor: "#000", }]}>
        <View style={{
          flexDirection: "column",
          paddingLeft: 40
        }}>
          <ResultLine title={"id:"}  >
            <Text style={{ color: "#000", fontSize: 15 }}>{githubUserData?.id ?? "-"}</Text>
          </ResultLine>
          <ResultLine title={"nome:"}  >
            <Text style={{ color: "#000", fontSize: 15 }}>{githubUserData?.nome ?? "-"}</Text>
          </ResultLine>
          <ResultLine title={"repositorios:"}  >
            <Text style={{ color: "#000", fontSize: 15 }}>{githubUserData?.repositorios ?? "-"}</Text>
          </ResultLine>
          <ResultLine title={"criado em:"}  >
            <Text style={{ color: "#000", fontSize: 15 }}>{githubUserData?.criado_em ?? "-"}</Text>
          </ResultLine>
          <ResultLine title={"seguidores:"}  >
            <Text style={{ color: "#000", fontSize: 15 }}>{githubUserData?.seguidores ?? "-"}</Text>
          </ResultLine>
          <ResultLine title={"seguindo:"}  >
            <Text style={{ color: "#000", fontSize: 15 }}>{githubUserData?.seguindo ?? "-"}</Text>
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
