import express, { Request, Response } from "express";
import { slackService, reminderService } from "./lib/services";
import { getUsageMessage } from "./lib/slack/messages";
import { ISlackCommand } from "./lib/slack/SlackCommand";

export const app = express();

app.use(express.urlencoded({extended: false}));

app.post("/", async (req: Request, res: Response) => {
  const command = req.body as ISlackCommand;

  try {
    const result = await slackService.runCommand(command);
    res.end(result);
  } catch (e) {
    //tslint:disable
    console.log(e.stack);
    res.end(getUsageMessage());
  }
});

setInterval(async ()=> {
  const reminders = await reminderService.sendReminders();
  console.log(reminders.length, "reminders sent");
  console.log('--------------------------');
}, 60_000);
