const mongoose = require("mongoose");

const MONGO_URL =
  "mongodb+srv://yorvinlunawisky:Mn13D0gewtoky3zw@nasa-project.yllafsr.mongodb.net/?retryWrites=true&w=majority";

mongoose.connection.once("open", () => {
  console.log("MongoDB connected");
});
mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function mongoConnect() {
  await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = { mongoConnect, mongoDisconnect };
