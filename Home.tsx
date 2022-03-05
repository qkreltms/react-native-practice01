import React, { memo, useLayoutEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, StyleSheet, Text, View } from "react-native";
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import { TextInput } from "react-native-gesture-handler";
import { useIsFocused, useNavigation } from "@react-navigation/native";

/**
 * Async Storage
 * unencrypted, Asynchronouse, Persistent, Key-value Storage System, Global Local Storage
 */
interface HomeProps {}
const Home = (props: HomeProps) => {
  const navigation =
    useNavigation<NativeStackScreenProps<{ Login: { itemName: string } }>>();
  const isFocused = useIsFocused();
  const [name, setName] = useState("");
  const [newName, setNewName] = useState("");
  const getName = async () => {
    try {
      console.log((await AsyncStorageLib.getItem("user-name")) || "{}");
      const { userName } = JSON.parse(
        (await AsyncStorageLib.getItem("user-name")) || "{}"
      );
      setName(userName);
    } catch (error) {
      console.error(error);
    }
  };

  const updateUserName = async () => {
    try {
      const { userName } = JSON.parse(
        (await AsyncStorageLib.getItem("user-name")) || "{}"
      );

      if (userName) {
        const userName = JSON.stringify({ userName: newName });
        await AsyncStorageLib.setItem("user-name", userName);
        setName(newName);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setNewName("");
    }
  };

  const deleteUserName = async () => {
    try {
      await AsyncStorageLib.removeItem("user-name");
      navigation.navigate("Login");
    } catch (error) {
      console.error(error);
    }
  };

  const onPressChangeUserNameButton = () => {
    updateUserName();
  };

  const onPressDeleteUserNameButton = () => {
    deleteUserName();
  };

  const onChangeTextUserName = (newUserName: string) => {
    setNewName(newUserName);
  };

  useLayoutEffect(() => {
    if (isFocused) {
      console.log("test");
      getName();
    }
  }, [isFocused]);

  return (
    <View style={styles.body}>
      <Text>Home</Text>
      <Text>Welcome! {name}</Text>
      <TextInput
        style={styles.input}
        value={newName}
        onChangeText={onChangeTextUserName}
        placeholder="Enter your new name"
      />
      <Button
        title="유저 이름 변경하기"
        disabled={!newName}
        onPress={onPressChangeUserNameButton}
      />
      <Button
        title="유저 이름 삭제하기"
        onPress={onPressDeleteUserNameButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default memo(Home);
