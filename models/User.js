// third party dependacies
const { model, Schema } = require("mongoose");

const UserSchema = new Schema({
  fullName: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  theme: {
    type: String,
  },
  token: {
    type: String,
  },
});

const User = model("user", UserSchema);

module.exports = User;
