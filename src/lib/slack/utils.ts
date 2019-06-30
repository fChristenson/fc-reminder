import { ISlackCommand } from "./SlackCommand";

export const isInfoCommand = (command: ISlackCommand) => {
  return /^info/i.test(command.text);
};

export const isListCommand = (command: ISlackCommand) => {
  return /^list/i.test(command.text);
};

export const isDeleteCommand = (command: ISlackCommand) => {
  return /^delete/i.test(command.text);
};

export const isHelpCommand = (command: ISlackCommand) => {
  return /^help/i.test(command.text);
};
