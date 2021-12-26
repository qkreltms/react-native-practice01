import React from "react";
import useCachedResources from "./hooks/useCachedResources";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./Login";
import Home from "./Home";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

const App = () => {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Login" component={Login} />
            <Tab.Screen name="Home" component={Home} />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }
};

export default App;
