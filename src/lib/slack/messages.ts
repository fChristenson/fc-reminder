import { IReminder } from "../services/ReminderService/Reminder";
import { teamChannels } from "../../constants";

export const getReminderMessage = (reminder: any) => {
  return `\`\`\`${JSON.stringify(reminder, null, 2)}\`\`\``;
};

export const getUsageMessage = () => {
  const teams = Object.keys(teamChannels).join(" ");

  return [
    "```",
    getSaveCommand(teams),
    "",
    "Other commands",
    `list   <team name>   -> ${teams}`,
    "delete <reminder id> -> Id of the reminder",
    "info   <reminder id> -> Id of the reminder",
    "```",
  ].join("\n");
};

export const getSaveCommand = (teams: string) => {
  return [
    "To save a reminder use the following format <team>;<name>;<start>;<interval>;<users>;<message>",
    `team     -> ${teams}`,
    "name     -> Name of reminder e.g Take out garbage",
    `start    -> Date and time for the first reminder e.g ${new Date().toISOString()}`,
    "interval -> Text to indicate interval e.g 1w, 2w, 3w, 4w",
    "users    -> Space delimited text with the users to include in rotation e.g @bob @mary @john",
    "message  -> Message to post to team channel",
  ].join("\n");
};

export const getListMessage = (reminders: IReminder[]) => {
  if (reminders.length <= 0) {
    return "```No reminders saved```";
  }

  const names = reminders.map((r) => `Name: ${r.name} ID: ${r._id}`).join("\n");

  return `\`\`\`${names}\`\`\``;
};

export const getDeleteMessage = () => {
  return "```Deletion was successful```";
};
