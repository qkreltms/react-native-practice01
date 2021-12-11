import React from "react";
import useCachedResources from "./hooks/useCachedResources";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import ScreenA from "./ScreenA";
import ScreenB from "./ScreenB";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const App = () => {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, size, color }) => {
                let iconName = "";
                if (route.name === "Screen_A") {
                  iconName = "btc";
                  size = focused ? 25 : 20;
                } else if (route.name === "Screen_B") {
                  iconName = "youtube";
                  size = focused ? 25 : 20;
                }

                return <FontAwesome5 name={iconName} size={size} />;
              },
              // lable 표시 여부
              tabBarShowLabel: false,
              tabBarInactiveBackgroundColor: "#999",
              tabBarActiveBackgroundColor: "#883",
              // 아래 두 속성 안되는데...
              tabBarActiveTintColor: "#ff0000",
              tabBarInactiveTintColor: "#f0f",
            })}
          >
            <Tab.Screen
              name="Screen_A"
              component={ScreenA}
              options={{ tabBarBadge: 3 }}
            />
            <Tab.Screen name="Screen_B" component={ScreenB} />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }
};

export default App;
