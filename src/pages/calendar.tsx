import { View } from "react-native";
import { Card, Text, useTheme } from "react-native-paper";
import { Training, Weekdays } from "../types";
import { dispatch, useSelector } from "../store";
import { removeTraining, selectUser } from "../store/calendar";
import Icon from "react-native-vector-icons/FontAwesome6";

export default function Calendar() {
  const weekDays = useSelector(selectUser);
  const theme = useTheme();

  const TrainingCard = ({ training }: { training: Training }) => {
    return (
      <Card>
        <Card.Content
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
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
    <View>
      <View style={{ display: "flex", gap: 5 }}>
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
      </View>
    </View>
  );
}
