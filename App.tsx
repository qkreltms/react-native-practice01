import React from "react";
import useCachedResources from "./hooks/useCachedResources";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Text, View } from "./components/Themed";
import { Button, Pressable, StyleSheet } from "react-native";

const Stack = createNativeStackNavigator();

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

const App = () => {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
          // screenOptions={{ header: () => null }}
          >
            <Stack.Screen name="Screen_A" component={ScreenA} />
            <Stack.Screen
              options={{ header: () => null }}
              name="Screen_B"
              component={ScreenB}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }
};

export default App;
