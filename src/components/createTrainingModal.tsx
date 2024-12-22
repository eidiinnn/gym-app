import { useState } from "react";
import {
  Button,
  Modal,
  SegmentedButtons,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { Weekdays } from "../types";
import { StyleProp, View, ViewStyle } from "react-native";
import { dispatch } from "../store";
import { createTraining } from "../store/calendar";

type props = {
  visible: boolean;
  onVisibleChange: (visible: boolean) => unknown;
};
export default function CreateTrainingModal({
  visible,
  onVisibleChange,
}: props) {
  const theme = useTheme();
  const hideModal = () => onVisibleChange(false);
  const containerStyle: StyleProp<ViewStyle> = {
    display: "flex",
    backgroundColor: theme.colors.surface,
    padding: 20,
    gap: 10,
  };

  const [inputName, setInputName] = useState("");
  const [inputWeekDay, setInputWeekDay] = useState<Weekdays>(Weekdays.Monday);

  const create = () => {
    dispatch(
      createTraining({
        name: inputName,
        weekday: inputWeekDay,
      })
    );

    setInputWeekDay(Weekdays.Monday);
    setInputName("");
    hideModal();
  };

  return (
    <Modal
      visible={visible}
      onDismiss={hideModal}
      style={{ bottom: 0, flex: 1 }}
      contentContainerStyle={containerStyle}
    >
      <Text variant="titleMedium">Create Training</Text>
      <TextInput
        label="name"
        value={inputName}
        onChangeText={(text) => setInputName(text)}
      />
      <View style={{ height: 40 }}>
        <SegmentedButtons
          value={inputWeekDay}
          onValueChange={(v) => setInputWeekDay(v as Weekdays)}
          style={{ flex: 1 }}
          density="regular"
          buttons={[
            { value: Weekdays.Monday, label: "Mon" },
            { value: Weekdays.Tuesday, label: "Tue" },
            { value: Weekdays.Wednesday, label: "Wed" },
            { value: Weekdays.Thursday, label: "Thu" },
          ]}
        />
      </View>
      <View style={{ height: 40 }}>
        <SegmentedButtons
          value={inputWeekDay}
          onValueChange={(v) => setInputWeekDay(v as Weekdays)}
          style={{ flex: 1 }}
          density="regular"
          buttons={[
            { value: Weekdays.Friday, label: "Fri" },
            { value: Weekdays.Saturday, label: "Sat" },
            { value: Weekdays.Sunday, label: "Sun" },
          ]}
        />
      </View>
      <Button onPress={create}>Create</Button>
    </Modal>
  );
}
