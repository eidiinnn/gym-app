import { useState } from "react";
import { View } from "react-native";
import { Card, Text } from "react-native-paper";

export default function Calendar() {
  const [weekDays, setWeekDays] = useState<Record<string, Array<unknown>>>({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  });

  return (
    <View>
      <View style={{ display: "flex", gap: 5 }}>
        {Object.keys(weekDays).map((name: string) => {
          const dayTraining = weekDays[name];
          return (
            <Card>
              <Card.Content>
                <Text variant="titleMedium">{name}</Text>
              </Card.Content>
            </Card>
          );
        })}
      </View>
    </View>
  );
}
