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
          {/* 스크롤 뷰에 데이터가 많아지면 성능 이슈 발생 => flat list를 사용해 list 재사용하도록 구현 */}
          <FlatList
            data={list}
            // 아래의 속성이 붙으면 새로고침도 아래에서 해야됨
            inverted
            // horizontal에서는 num columns 지원하지 않음
            horizontal={false}
            // numColumns와 key값이 동일해야됨
            numColumns={2}
            key={2}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text>{item.name}</Text>
              </View>
            )}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={["#ff00ff"]}
              />
            }
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
});
