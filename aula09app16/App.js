import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("shopping.db");

const createTables = () => new Promise((resolve, reject) => {
  db.transaction(txn => {
    txn.executeSql(
      `CREATE TABLE IF NOT EXISTS shopping (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20), quantity INT)`,
      [],
      resolve,
      reject,
    );
  });
}
);

const addShoppingItemToDB = (shoppingItem) => new Promise((resolve, reject) => {

  db.transaction(txn => {
    txn.executeSql(
      `INSERT INTO shopping (name, quantity) VALUES (?, ?)`,
      [shoppingItem.name, shoppingItem.quantity],
      resolve,
      reject
    );
  });
}
);


const getTasksFromDB = () => new Promise((resolve, reject) => {
  db.transaction(txn => {
    txn.executeSql(
      `SELECT * FROM shopping ORDER BY id DESC`,
      [],
      (sqlTxn, res) => {
        let len = res.rows.length;

        if (len > 0) {
          let results = [];
          for (let i = 0; i < len; i++) {
            let item = res.rows.item(i);
            results.push(item);
          }
          resolve(results)
        }
      },
      reject,
    );
  });
});


export default function App() {
  const [shoppingList, setShoppingList] = useState([])
  const inputNameRef = useRef(false);
  const inputQtdRef = useRef(false);
  const [inputProductName, setInputProductName] = useState(null);
  const [inputQuantity, setInputQuantity] = useState(null);

  useEffect(() => {
    ((async () => {
      try {
        await createTables();
        const savedItems = await getTasksFromDB();
        setShoppingList(savedItems)
      } catch (error) {
        console.log(error);
      }
    }))();
  }, [])


  useEffect(() => {
    inputNameRef?.current?.clear()
    inputQtdRef?.current?.clear()
  }, [shoppingList]);

  const addNewTask = useCallback(() => {
    const shoppingItem = {
      name: inputProductName,
      quantity: inputQuantity
    }
    setShoppingList(oldTasks => oldTasks.concat(shoppingItem))
    addShoppingItemToDB(shoppingItem)
  }, [setShoppingList, inputProductName, inputQuantity])

  return (
    <View style={[styles.container, { padding: 10, paddingTop: 30 }]}>
      <View ><Text style={{ fontSize: 25 }}>Listas de compras</Text></View>
      <View style={[{ flexDirection: "row", padding: 10, alignItems: "flex-end" }]}>
        <View style={[{ flexDirection: "row", alignItems: "center", paddingHorizontal: 10, }]}>
          <View style={{ paddingHorizontal: 10 }}><TextInput
            onChangeText={setInputQuantity}
            ref={inputQtdRef}
            placeholder="Qtd"
            keyboardType='number-pad'
            style={[{ borderColor: "#000", borderWidth: 1, width: 50, height: 50, padding: 10 }]}
          /></View>
          <View style={{ paddingHorizontal: 10 }}><TextInput
            onChangeText={setInputProductName}
            ref={inputNameRef}
            placeholder="Produto"
            style={[{ borderColor: "#000", borderWidth: 1, width: 200, height: 50, padding: 10 }]}
          /></View>
          <View ><TouchableOpacity
            style={[{ height: 50, width: 50, alignItems: "center", justifyContent: "center", borderColor: "#000", borderWidth: 1, borderRadius: 50 }]}
            onPress={addNewTask}
          ><Text>+</Text></TouchableOpacity></View>
        </View>
      </View>
      <View style={[{ padding: 10, flex: 1, width: "100%", alignItems: "flex-start", borderWidth: 1, borderColor: "#000", }]}>
        {
          shoppingList.map((item) => (
            <View key={item.name}>
              <Text style={{
                color: "#000",
                fontSize: 16
              }}>{item.name} ({item.quantity})</Text>
            </View>
          ))
        }
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
