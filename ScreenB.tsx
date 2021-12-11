import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface ScreeBprops extends NativeStackScreenProps<{ Screen_A: undefined }> {}
const ScreenB = ({ navigation }: ScreeBprops) => {
  const onPress = () => {
    // navigation.navigate("Screen_A");
    navigation.goBack();
  };

  return (
    <View style={styles.body}>
      <Text>Sceen B</Text>
      <Pressable onPress={onPress}>
        <Text>TO SCREEN_A</Text>
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
