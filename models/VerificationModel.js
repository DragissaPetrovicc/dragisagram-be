const mongoose = require("mongoose");

const VerifySchema = new mongoose.Schema({
  email: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  code: {
    type: String,
  },
});
const VerifyModel = mongoose.model("verification", VerifySchema);

module.exports = VerifyModel;
