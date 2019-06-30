import { app } from "./src/app";
import mongoose from "mongoose";

const url = process.env.MONGO_URL || "mongodb://localhost:27017/local";

mongoose.connect(url, {useNewUrlParser: true});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  //tslint:disable
  console.log(`Running on port ${port}`);
  console.log('--------------------------');
});
