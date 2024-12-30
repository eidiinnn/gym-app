import { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../pages/home";
import Icon from "react-native-vector-icons/FontAwesome6";
import { useTheme } from "react-native-paper";
import Measurement from "../pages/measurement";
import Calendar from "../pages/calendar";
import { dispatch } from "../store";
import { getTrainingList } from "../store/calendar";

const TabRouter = createBottomTabNavigator({
  screens: {
    Home: Home,
    Measurement: Measurement,
    Calendar: Calendar,
  },
});

export default function Router() {
  const theme = useTheme();
  const iconSize = 25;

  useEffect(() => {
    dispatch(getTrainingList());
  }, []);

  return (
    <TabRouter.Navigator
      screenOptions={{
        headerShown: false,
        headerTintColor: theme.colors.background,
        tabBarActiveTintColor: theme.colors.primary,
        sceneStyle: { padding: 8 },
      }}
    >
      <TabRouter.Screen
        key="Home"
        name="Home"
        component={Home}
        options={{
          tabBarIcon: () => (
            <Icon
              name="house"
              color={theme.colors.onBackground}
              size={iconSize}
            />
          ),
        }}
      />

      <TabRouter.Screen
        key="Calendar"
        name="Calendar"
        component={Calendar}
        options={{
          tabBarIcon: () => (
            <Icon
              name="calendar"
              color={theme.colors.onBackground}
              size={iconSize}
            />
          ),
        }}
      />

      <TabRouter.Screen
        key="Measurement"
        name="Measurement"
        component={Measurement}
        options={{
          tabBarIcon: () => (
            <Icon
              name="ruler"
              color={theme.colors.onBackground}
              size={iconSize}
            />
          ),
        }}
      />
    </TabRouter.Navigator>
  );
}
