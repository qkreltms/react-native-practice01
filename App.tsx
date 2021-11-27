import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Text, View } from "./components/Themed";
import {
  Button,
  FlatList,
  Linking,
  RefreshControl,
  ScrollView,
  SectionList,
  StyleSheet,
} from "react-native";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { tSExpressionWithTypeArguments } from "@babel/types";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const [name, setName] = useState("JeonghHoon");
  const [list, setList] = useState(
    Array.from({ length: 100 }, (_, i) => ({
      key: i + 1,
      name: `${i + 1}`,
    }))
  );
  const DATA = [
    { title: "title 1", data: ["ITEM 1-1"] },
    { title: "title 2", data: ["ITEM 1-1"] },
    { title: "title 3", data: ["ITEM 1-1"] },
  ];
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    console.log(list.slice(1));
    const newList = [{ key: 1, name: "onRefresh" }, ...list.slice(0)];
    setList(newList);
    setRefreshing(false);
  };

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        {/* <Navigation colorScheme={colorScheme} />
        <StatusBar /> */}
        <View style={styles.body}>
          <SectionList
            keyExtractor={(item, index) => index.toString()}
            sections={DATA}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text style={styles.text}>{item}</Text>
              </View>
            )}
            renderSectionHeader={({ section }) => (
              <View style={styles.item}>
                <Text style={styles.text}>{section.title}</Text>
              </View>
            )}
          />

          <Text>test with {name}</Text>
          <Button
            title="naver"
            onPress={() => {
              Linking.openURL("https://naver.com");
            }}
          />
          <Button
            title="name"
            onPress={() => {
              setName(`test${new Date()}`);
            }}
          />
        </View>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#fff123",
  },
  item: {
    backgroundColor: "#4ae1fa",
    margin: 10,
    justifyContent: "center",
    alignContent: "center",
  },
  text: {},
});
