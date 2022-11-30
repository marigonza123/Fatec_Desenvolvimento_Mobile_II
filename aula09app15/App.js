import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("tarefas.db");

const createTables = () => new Promise((resolve, reject) => {
  db.transaction(txn => {
    txn.executeSql(
      `CREATE TABLE IF NOT EXISTS tarefas (id INTEGER PRIMARY KEY AUTOINCREMENT, nome VARCHAR(20))`,
      [],
      resolve,
      reject,
    );
  });
}
);

const addTaskToDB = (task) => new Promise((resolve, reject) => {

  if (!task) reject("missing task")

  db.transaction(txn => {
    txn.executeSql(
      `INSERT INTO tarefas (nome) VALUES (?)`,
      [task],
      resolve,
      reject
    );
  });
}
);


const getTasksFromDB = () => new Promise((resolve, reject) => {
  db.transaction(txn => {
    txn.executeSql(
      `SELECT * FROM tarefas ORDER BY id DESC`,
      [],
      (sqlTxn, res) => {
        console.log("Tarefas lidas com sucesso!");
        let len = res.rows.length;

        if (len > 0) {
          let results = [];
          for (let i = 0; i < len; i++) {
            let item = res.rows.item(i);
            results.push(item.nome);
          }
          resolve(results)
        }
      },
      reject,
    );
  });
});


export default function App() {
  const [tasks, setTasks] = useState([])
  const inputRef = useRef(false);
  const [inputValue, setInputValue] = useState(null);

  useEffect(() => {
    ((async () => {
      try {
        await createTables();
        const savedTasks = await getTasksFromDB();
        setTasks(savedTasks)
      } catch (error) {
        console.log(error);
      }
    }))();
  }, [])


  useEffect(() => {
    inputRef?.current?.clear()
  }, [tasks]);

  const addNewTask = useCallback(() => {
    setTasks(oldTasks => oldTasks.concat(inputValue))
    addTaskToDB(inputValue)
  }, [setTasks, inputValue])

  return (
    <View style={[styles.container, { padding: 10, paddingTop: 30 }]}>
      <View ><Text style={{ fontSize: 25 }}>Tarefas</Text></View>
      <View style={[{ flexDirection: "row", padding: 10, alignItems: "flex-end" }]}>
        <View style={[{ flexDirection: "row", alignItems: "center", paddingHorizontal: 10, }]}>
          <View style={{ paddingHorizontal: 10 }}><TextInput
            onChangeText={setInputValue}
            ref={inputRef}
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
          tasks.map((task, index) => (
            <View key={task}>
              <Text style={{
                color: "#000",
                fontSize: 16
              }}>{index + 1} - {task}</Text>
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
