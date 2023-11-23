const mongoose = require("mongoose");

const planetsSchema = new mongoose.Schema({
  keplerName: {
    type: String,
    required: true,
  },
});

// Connects planetsSchema to the "planets" collection in the database.
module.exports = mongoose.model("Planet", planetsSchema);
