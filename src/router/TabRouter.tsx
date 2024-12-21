import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../pages/home";
import Icon from "react-native-vector-icons/FontAwesome";
import { useTheme } from "react-native-paper";

const TabRouter = createBottomTabNavigator({
  screens: {
    Home: Home,
  },
});

export default function Router() {
  const theme = useTheme();

  return (
    <TabRouter.Navigator
      screenOptions={{
        headerShown: false,
        headerTintColor: theme.colors.background,
      }}
    >
      <TabRouter.Screen
        key="Home"
        name="Home"
        component={Home}
        options={{
          tabBarIcon: () => (
            <Icon name="home" color={theme.colors.onBackground} size={30} />
          ),
        }}
      />
    </TabRouter.Navigator>
  );
}
