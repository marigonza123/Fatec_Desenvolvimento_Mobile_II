import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';


export default function App() {
  const [isDay, setIsDay] = useState(false)
  const [isLittle, setIsLittle] = useState(false);

  const {
    setItem: setIsDayItem,
    getItem: getIsDayItem
  } = useAsyncStorage("is_day");

  const {
    setItem: setIsLittleItem,
    getItem: getIsLittleItem
  } = useAsyncStorage("is_little");

  useEffect(() => {

    (async () => {
      const value = await getIsLittleItem();
      if (!value) return
      setIsLittle(JSON.parse(value))
    })();

    (async () => {
      const value = await getIsDayItem();
      if (!value) return
      setIsDay(JSON.parse(value))
    })();

  }, [getIsDayItem, getIsLittleItem])


  const toggleIsDay = useCallback(() => {
    const newValue = !isDay
    setIsDayItem(JSON.stringify(!!newValue))
    setIsDay(!!newValue)
  }, [setIsDayItem, setIsDay, isDay]);
  const toggleIsLittle = useCallback(() => {
    const newValue = !isLittle
    setIsLittleItem(JSON.stringify(!!newValue))
    setIsLittle(!!newValue)
  }, [setIsLittleItem, setIsLittle, isLittle]);

  return (
    <View style={[styles.container, { padding: 10, paddingTop: 30 }]}>
      <View ><Text style={{ fontSize: 25 }}>Frases</Text></View>
      <View style={[{ flexDirection: "row", padding: 10, alignItems: "flex-end" }]}>
        <View style={[{ flexDirection: "row", alignItems: "center", paddingHorizontal: 10, }]}>
          <View ><Text>Dia</Text></View>
          <View ><Switch
            style={[styles.inputStyle]}
            onValueChange={toggleIsDay}
            value={isDay}
          /></View>
        </View>
        <View style={[{ flexDirection: "row", alignItems: "center", paddingHorizontal: 10 }]}>
          <View ><Text>Pequeno</Text></View>
          <View ><Switch
            style={[styles.inputStyle]}
            onValueChange={toggleIsLittle}
            value={isLittle}
          /></View>
        </View>
      </View>
      <View style={[{ padding: 10, flex: 1, width: "100%", alignItems: "flex-start", borderWidth: 1, borderColor: "#000", backgroundColor: !isDay ? "#000" : "#fff" }]}>
        <Text style={{
          color: isDay ? "#000" : "#fff",
          fontSize: isLittle ? 10 : 25
        }}>"A vingança nunca é plena, mata a alma e envenena" (Seu madruga)</Text>
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
