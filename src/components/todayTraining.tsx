import { useEffect, useState } from "react";
import { View } from "react-native";
import { useSelector } from "../store";
import { Training, Weekdays } from "../types";
import moment from "moment";
import { Card, Text } from "react-native-paper";

export default function TodayTraining() {
  const trainingList = useSelector((s) => s.calendar.trainingList);
  const [todayTraining, setTodayTraining] = useState<Array<Training>>([]);

  useEffect(() => {
    const today: Weekdays =
      Weekdays[moment().format("dddd") as keyof typeof Weekdays];
    const todayTrainingList = trainingList.filter((v) => v.weekday === today);
    setTodayTraining(todayTrainingList ? todayTrainingList : []);
  }, [trainingList]);

  return (
    <View style={{flexDirection: "column", gap: 5}}>
      <Text variant="titleMedium">Today Training</Text>
      {todayTraining.map((training, index) => (
        <Card key={index}>
          <Card.Content>
            <Text>{training.name}</Text>
          </Card.Content>
        </Card>
      ))}
    </View>
  );
}
