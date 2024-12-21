import { SafeAreaView } from "react-native-safe-area-context";
import Router from "./router";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Router />
    </SafeAreaView>
  );
}
