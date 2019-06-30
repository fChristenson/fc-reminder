import axios from "axios";
import { IReminder, ReminderModel } from "./Reminder";
import { teamChannels } from "../../../constants";
import moment = require("moment");

export class ReminderService {
  constructor() {
    this.saveReminder = this.saveReminder.bind(this);
    this.findReminder = this.findReminder.bind(this);
    this.deleteReminder = this.deleteReminder.bind(this);
    this.listReminders = this.listReminders.bind(this);
    this.sendReminders = this.sendReminders.bind(this);
  }

  public async saveReminder(reminder: IReminder) {
    const saved = await new ReminderModel(reminder).save();
    return saved;
  }

  public async findReminder(id: string) {
    const result = await ReminderModel.findById(id) as unknown;
    return result as IReminder | null;
  }

  public deleteReminder(id: string) {
    return ReminderModel.deleteOne({_id: id});
  }

  public async listReminders(team: string) {
    const result = await ReminderModel.find({team}) as unknown;
    return result as IReminder[];
  }

  public async sendReminders() {
    const date = moment().add(2, "h").toDate();
    const query = {nextReminder: {$lte: date}};
    const remindersToSend = await ReminderModel.find(query) as unknown;

    for (const reminder of remindersToSend as IReminder[]) {
      // @ts-ignore
      const url = teamChannels[reminder.team].url as string;
      const userToPing = reminder.users[reminder.pointer];
      const data = {text: `<${userToPing}> ${reminder.message}`};
      await axios.post(url, data);
      reminder.pointer = (reminder.pointer + 1) % reminder.users.length;
      const interval = reminder.interval.split("");
      reminder.nextReminder = moment(reminder.nextReminder).add(...interval).toDate();
      await this.saveReminder(reminder);
    }

    return remindersToSend as IReminder[];
  }
}
