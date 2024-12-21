import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import TabRouter from "./TabRouter";
import { useTheme } from "react-native-paper";

export default function Router() {
  const theme = useTheme();
  return (
    <NavigationContainer
      theme={{
        colors: {
          background: theme.colors.background,
          border: theme.colors.outline,
          card: theme.colors.surface,
          primary: theme.colors.primary,
          notification: theme.colors.background,
          text: theme.colors.onBackground,
        },
        dark: true,
        fonts: {
          regular: {
            fontFamily: "Roboto",
            fontWeight: "normal",
          },
          medium: {
            fontFamily: "Roboto",
            fontWeight: "500",
          },
          bold: {
            fontFamily: "Roboto",
            fontWeight: "bold",
          },
          heavy: {
            fontFamily: "Roboto",
            fontWeight: "bold",
          },
        },
      }}
    >
      <TabRouter></TabRouter>
    </NavigationContainer>
  );
}
