import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import AsyncStorageLib from "@react-native-async-storage/async-storage";

interface HomeProps
  extends NativeStackScreenProps<{ Login: { itemName: string } }> {}
const Home = ({ navigation, route }: HomeProps) => {
  const [name, setName] = useState("");
  const getName = async () => {
    try {
      setName((await AsyncStorageLib.getItem("user-name")) || "");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getName();
  }, []);

  return (
    <View style={styles.body}>
      <Text>Home</Text>
      <Text>Welcome! {name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Home;
