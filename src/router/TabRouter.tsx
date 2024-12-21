import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../pages/home";
import Icon from "react-native-vector-icons/FontAwesome";

const TabRouter = createBottomTabNavigator({
  screens: {
    Home: Home,
  },
});

export default function Router() {
  return (
    <TabRouter.Navigator screenOptions={{ headerShown: false }}>
      <TabRouter.Screen
        key="Home"
        name="Home"
        component={Home}
        options={{ tabBarIcon: () => <Icon name="home" size={30} /> }}
      />
    </TabRouter.Navigator>
  );
}
