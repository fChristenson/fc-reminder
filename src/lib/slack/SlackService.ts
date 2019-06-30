import { ReminderService } from "../services/ReminderService/ReminderService";
import { ISlackCommand } from "./SlackCommand";
import { isInfoCommand, isDeleteCommand, isListCommand, isHelpCommand } from "./utils";
import { Reminder } from "../services/ReminderService/Reminder";
import { getListMessage, getDeleteMessage, getReminderMessage, getUsageMessage } from "./messages";

export class SlackService {
  private reminderService: ReminderService;

  constructor(reminderService: ReminderService) {
    this.reminderService = reminderService;
    this.runCommand = this.runCommand.bind(this);
  }

  public async runCommand(command: ISlackCommand) {
    if (isInfoCommand(command)) {
      const id = command.text.split(" ")[1].trim();
      const result = await this.reminderService.findReminder(id);
      return getReminderMessage(result);
    } else if (isDeleteCommand(command)) {
      const id = command.text.split(" ")[1].trim();
      await this.reminderService.deleteReminder(id);
      return getDeleteMessage();
    } else if (isListCommand(command)) {
      const team = command.text.split(" ")[1].trim();
      const reminders = await this.reminderService.listReminders(team);
      return getListMessage(reminders);
    } else if (isHelpCommand(command)) {
      return getUsageMessage();
    } else {
      const reminder = Reminder(command);
      const saved = await this.reminderService.saveReminder(reminder);
      return getReminderMessage(saved);
    }
  }
}
