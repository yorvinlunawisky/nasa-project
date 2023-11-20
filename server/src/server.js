const http = require("http");
const app = require("./app");
const { loadPlanetsData } = require("./models/planets.model");

const PORT = process.env.PORT || 8000;
const mongoose = require("mongoose");
const MONGO_URL = "mongodb+srv://yorvinlunawisky:Mn13D0gewtoky3zw@nasa-project.yllafsr.mongodb.net/?retryWrites=true&w=majority";
const server = http.createServer(app);
mongoose.connection.once('open', () => {
  console.log('MongoDB connected');
});
mongoose.connection.on('error', (err) => {
  console.error(err);
})
async function startServer() {
  await mongoose.connect(MONGO_URL);
  await loadPlanetsData();
  server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
}

startServer();
