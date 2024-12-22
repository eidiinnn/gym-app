import { SafeAreaView } from "react-native-safe-area-context";
import Router from "./router";
import { PaperProvider } from "react-native-paper";
import theme from "./theme";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import store from "./store";

export default function App() {
  return (
    <>
      <StatusBar backgroundColor="#000" style="light" />
      <PaperProvider theme={theme}>
        <Provider store={store}>
          <SafeAreaView style={{ flex: 1 }}>
            <Router />
          </SafeAreaView>
        </Provider>
      </PaperProvider>
    </>
  );
}
