import { ReminderService } from "./ReminderService/ReminderService";
import { SlackService } from "../slack/SlackService";

export const reminderService = new ReminderService();
export const slackService = new SlackService(reminderService);
