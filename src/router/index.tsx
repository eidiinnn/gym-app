import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import TabRouter from "./TabRouter";

export default function Router() {
  return (
    <NavigationContainer>
      <TabRouter></TabRouter>
    </NavigationContainer>
  );
}
