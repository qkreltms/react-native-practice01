import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Text, View } from "./components/Themed";
import {
  Alert,
  Button,
  Modal,
  Pressable,
  StyleSheet,
  TextInput,
  ToastAndroid,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";

import useCachedResources from "./hooks/useCachedResources";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [isShowModal, setIsShowModal] = useState(false);
  const onPress = () => {
    Alert.alert(
      "Warning",
      "ERROR!!",
      [
        { text: "okay~~", onPress: () => console.warn("okay~~") },
        {
          text: "CANCEL!!!",
        },
        { text: "NOOOO!!!" },
      ],
      { cancelable: true, onDismiss: () => console.error("DISMISSED!!") }
    );

    setIsShowModal(true);
    ToastAndroid.show("토스트 먹자", ToastAndroid.LONG);
    // showWithGravity, showWithGravityAndOffset 함수를 사용하면 토스트 나타날 위치 지정 가능
    setSubmitted((b) => !b);
  };

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Modal
          visible={isShowModal}
          // 바탕화면 불투명
          transparent
          // back 버튼 누를 때 작업
          onRequestClose={() => setIsShowModal(false)}
          animationType="fade"
          hardwareAccelerated
          // modal이 status아래에 있을지 결정하는 속성 true이면 오히려 status bar를 가리는데??
          // statusBarTranslucent
        >
          <View style={styles.modal}>
            <Text>HI I"M MODAL!!</Text>
          </View>
        </Modal>
        <View style={styles.body}>
          <Text style={styles.text}>Please write your name</Text>
          <TextInput
            style={styles.input}
            placeholder="placeholder"
            onChangeText={(value) => setName(value)}
            multiline
            keyboardType="number-pad"
            maxLength={2}
            // disabled 설정
            editable={false}
            //  비밀번호 입력
            // secureTextEntry
          />
          {/* 일반적인 버튼 */}
          <Button
            title={submitted ? "Clear" : "Submit"}
            onPress={onPress}
            disabled={submitted}
            color="#00f"
          />
          {/* 하위 컴포넌트에 터치 기능을 추가해주는 컴포넌트, 이미지 등에 적용가능 */}
          <TouchableOpacity
            onPress={onPress}
            style={styles.button}
            activeOpacity={0.6}
          >
            <Text>{submitted ? "Clear" : "Submit"}</Text>
          </TouchableOpacity>
          {/* Opacity에 추가적으로 클릭시 사용할 색도 넣어주는 컴포넌트 인듯 */}
          <TouchableHighlight
            onPress={onPress}
            style={styles.button}
            activeOpacity={0.5}
            underlayColor="#ee3434"
          >
            <Text>{submitted ? "Clear" : "Submit"}</Text>
          </TouchableHighlight>
          {/* 터치 피드백을 주지 않음 */}
          <TouchableWithoutFeedback onPress={onPress} style={styles.button}>
            <Text>{submitted ? "Clear" : "Submit"}</Text>
          </TouchableWithoutFeedback>
          {/* Pressable is a Core Component wrapper  */}
          {/* 참고: https://reactnative.dev/docs/pressable */}
          <Pressable
            onPress={onPress}
            // 터치 가능한 영역 크기 결정
            hitSlop={{ top: 10, bottom: 10, right: 10, left: 10 }}
            android_ripple={{ color: "#00f" }}
            style={({ pressed }) => [
              { backgroundColor: pressed ? "#dddddd" : "#00ff00" },
            ]}
          >
            <Text>{submitted ? "Clear" : "Submit"}</Text>
          </Pressable>
          {submitted && <Text>{name}</Text>}
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
