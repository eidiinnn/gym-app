import { View } from "react-native";
import { Card, Text } from "react-native-paper";
import { Training, Weekdays } from "../types";
import { useSelector } from "../store";
import { selectUser } from "../store/calendar";

export default function Calendar() {
  const weekDays = useSelector(selectUser);

  const TrainingCard = ({ training }: { training: Training }) => {
    return (
      <Card>
        <Card.Content>
          <Text>{training.name}</Text>
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
