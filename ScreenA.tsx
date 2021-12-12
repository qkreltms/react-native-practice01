import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, StyleSheet, Text, View } from "react-native";

interface ScreeAprops
  extends NativeStackScreenProps<{ Screen_B: { itemName: string } }> {}
const ScreenA = ({ navigation, route }: ScreeAprops) => {
  const { itemName } = route.params as any;
  const onPress = () => {
    // 데이터 넘기기
    navigation.navigate("Screen_B", { itemName: "Data from Screen A" });
  };

  return (
    <View style={styles.body}>
      <Text>Sceen A</Text>
      <Button title="TO SCREEN_B" onPress={onPress} />
      <Text>{itemName}</Text>
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

export default ScreenA;
