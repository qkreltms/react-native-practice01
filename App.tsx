import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Text, View } from "./components/Themed";
import {
  Image,
  ImageBackground,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import done from "./assets/images/done.png";
import error from "./assets/images/error.png";
import useCachedResources from "./hooks/useCachedResources";

const App = () => {
  const isLoadingComplete = useCachedResources();
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const onPress = () => {
    setSubmitted((b) => !b);
  };

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ImageBackground
          source={{
            uri: "https://image.freepik.com/free-vector/flat-geometric-background_23-2148957201.jpg",
          }}
          style={styles.body}
        >
          {/* View는 Web에서 div와 같다. */}
          <Text style={styles.text}>Please write your name</Text>
          <TextInput
            style={styles.input}
            placeholder="placeholder"
            onChangeText={(value) => setName(value)}
            multiline
            keyboardType="number-pad"
            // disabled 설정
            //  비밀번호 입력
            // secureTextEntry
          />
          {/* 하위 컴포넌트에 터치 기능을 추가해주는 컴포넌트, 이미지 등에 적용가능 */}
          <TouchableOpacity
            onPress={onPress}
            style={styles.button}
            activeOpacity={0.6}
          >
            <Text>{submitted ? "Clear" : "Submit"}</Text>
          </TouchableOpacity>
          {submitted ? (
            <>
              <Text>{name}</Text>
              <Image style={styles.image} source={done} />
            </>
          ) : (
            <Image style={styles.image} source={error} />
          )}
        </ImageBackground>
      </SafeAreaProvider>
    );
  }
};

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
  image: { width: 100, height: 100 },
  input: {
    borderWidth: 1,
    // 화면 해상도에 상관없는 단위로 설정됨
    width: 200,
    borderColor: "#4ae1fa",
  },
  button: {
    width: 150,
    height: 50,
    backgroundColor: "#00ff00",
    alignItems: "center",
  },
  modal: {
    width: 300,
    height: 300,
    backgroundColor: "#4ae1fa",
  },
});

export default App;
