import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface ScreeBprops
  extends NativeStackScreenProps<{ Screen_A: { itemName: string } }> {}
const ScreenB = ({ navigation, route }: ScreeBprops) => {
  // 추후 타입 알아보기
  const { itemName } = route.params as any;
  const onPress = () => {
    // navigation.navigate("Screen_A");
    navigation.navigate("Screen_A", {
      itemName: "GET Item name from Screen B",
    });
  };

  return (
    <View style={styles.body}>
      <Text>Sceen B</Text>
      <Pressable onPress={onPress}>
        <Text>TO SCREEN_A</Text>
        <Text>{itemName}</Text>
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
});

export default ScreenB;
