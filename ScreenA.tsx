import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, StyleSheet, Text, View } from "react-native";

interface ScreeAprops extends NativeStackScreenProps<{ Screen_B: undefined }> {}
const ScreenA = ({ navigation }: ScreeAprops) => {
  const onPress = () => {
    navigation.navigate("Screen_B");
  };

  return (
    <View style={styles.body}>
      <Text>Sceen A</Text>
      <Button title="TO SCREEN_B" onPress={onPress} />
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
