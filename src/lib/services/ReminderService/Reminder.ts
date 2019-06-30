import {Schema, model} from "mongoose";
import { ISlackCommand } from "../../slack/SlackCommand";
import { parseUsers, parseInterval } from "./utils";
import moment from "moment";

export interface IReminder {
  _id?: string;
  team: string;
  name: string;
  message: string;
  users: string[];
  createdAt: Date;
  createdBy: string;
  start: Date;
  interval: string;
  pointer: number;
  nextReminder: Date;
  rawText: string;
}

export function Reminder(body: ISlackCommand): IReminder {
  const [team, name, start, interval, users, ...rest] = body.text.split(";").map((s) => s.trim());
  const startDate = moment(start).toDate();
  const validInterval = parseInterval(interval);

  return {
    team,
    name,
    message: rest.join(" "),
    users: parseUsers(users),
    createdAt: moment().add(2, "h").toDate(),
    createdBy: body.user_name,
    start: startDate,
    interval: validInterval,
    nextReminder: startDate,
    pointer: 0,
    rawText: body.text,
  };
}

const ReminderSchema = new Schema({
  team: String,
  name: String,
  message: String,
  users: Array,
  createdAt: Date,
  createdBy: String,
  start: Date,
  interval: String,
  pointer: Number,
  nextReminder: Date,
  rawText: String,
});

export const ReminderModel = model("reminder", ReminderSchema);
