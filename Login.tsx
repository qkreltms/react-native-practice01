import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import SQLite from "react-native-sqlite-storage";

const db = SQLite.openDatabase(
  {
    name: "MainDB",
    location: "default",
  },
  () => {},
  (error) => {
    console.log(error);
  }
);

interface LoginProps
  extends NativeStackScreenProps<{ Home: { itemName: string } }> {}
const Login = ({ navigation, route }: LoginProps) => {
  const [id, setId] = useState("");

  const createTable = () => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS Users (ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TexT, Age INTEGER)`
      );
    });
  };

  useEffect(() => {
    createTable();
  }, []);
  const onPressLogin = async () => {
    if (id?.length < 1) {
      Alert.alert("아이디 입력 안한듯...");
      return;
    }

    try {
      const userName = JSON.stringify({ userName: id });

      // await AsyncStorageLib.setItem("user-name", userName);
      await db.transaction((tx) => {
        tx.executeSql(`INSERT INTO Users (Name, Age) VALUES (?, ?)`, [
          userName,
          1,
        ]);
      });
      navigation.navigate("Home");
    } catch (error) {
      console.error(error);
    }
  };
  const onChangeIdInput: (text: string) => void = (text) => {
    setId(text);
  };

  return (
    <View style={styles.body}>
      <Image source={require("./assets/images/google.gif")} />
      <TextInput
        onChangeText={onChangeIdInput}
        style={styles.idInput}
        value={id}
        placeholder="아이디를 입력하세요."
      />
      <Pressable style={styles.loginButton} onPress={onPressLogin}>
        <Text>로그인</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  idInput: {
    backgroundColor: "wheat",
    width: "100%",
    height: 100,
  },
  loginButton: {
    width: "100%",
    height: 100,
    backgroundColor: "green",
  },
});

export default Login;
