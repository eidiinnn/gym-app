import { db } from ".";
import { Training } from "../types";
import { Table } from "./utils";

const trainingCalendar = new Table<Training>("trainingCalendar", db);

const tables = { trainingCalendar };
export default tables;
