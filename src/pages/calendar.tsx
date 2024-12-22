import { StyleProp, View, ViewStyle } from "react-native";
import { Card, IconButton, Text, useTheme } from "react-native-paper";
import { Training, Weekdays } from "../types";
import { dispatch, useSelector } from "../store";
import { removeTraining, selectUser } from "../store/calendar";
import Icon from "react-native-vector-icons/FontAwesome6";
import { useState } from "react";
import { ScrollView } from "react-native";
import CreateTrainingModal from "../components/createTrainingModal";

export default function Calendar() {
  const weekDays = useSelector(selectUser);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const theme = useTheme();

  const TrainingCard = ({ training }: { training: Training }) => {
    const cardStyle: StyleProp<ViewStyle> = {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    };

    return (
      <Card>
        <Card.Content style={cardStyle}>
          <Text>{training.name}</Text>
          <Icon
            name="trash"
            size={10}
            color={theme.colors.error}
            onPress={() => dispatch(removeTraining(training.id))}
          />
        </Card.Content>
      </Card>
    );
  };

  return (
    <View style={{ position: "relative", flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ display: "flex", gap: 5 }}
      >
        {Object.keys(weekDays).map((key) => {
          const dayTrainings = weekDays[key as Weekdays];
          const hasTrainingOnDay = dayTrainings.length > 0 ? true : false;
          const nameVariant = hasTrainingOnDay ? "titleMedium" : "labelSmall";
          const cardOpacity = hasTrainingOnDay ? 1 : 0.6;

          return (
            <Card key={key} style={{ opacity: cardOpacity }}>
              <Card.Content style={{ gap: 2 }}>
                <Text variant={nameVariant}>{key}</Text>
                <View style={{ display: "flex" }}>
                  {dayTrainings.map((training, key) => (
                    <TrainingCard key={key} training={training} />
                  ))}
                </View>
              </Card.Content>
            </Card>
          );
        })}
      </ScrollView>

      <IconButton
        icon="plus"
        iconColor={theme.colors.onPrimary}
        size={30}
        style={{
          position: "absolute",
          bottom: 10,
          right: 10,
          backgroundColor: theme.colors.primary,
        }}
        onPress={() => setCreateModalVisible(true)}
      />

      <CreateTrainingModal
        visible={createModalVisible}
        onVisibleChange={(v) => setCreateModalVisible(v)}
      />
    </View>
  );
}
