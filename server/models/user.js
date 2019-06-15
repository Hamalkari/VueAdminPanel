const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { saltRounds } = require("../config");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
});

UserSchema.pre("save", async function(next) {
  try {
    const genSalt = await bcrypt.genSalt(saltRounds);
    const hashPassword = await bcrypt.hash(this.password, genSalt);
    this.password = hashPassword;
  } catch (error) {
    next(error);
  }
});
UserSchema.pre("findOneAndUpdate", async function(next) {
  try {
    let pass = this.getUpdate().password;
    const genSalt = await bcrypt.genSalt(saltRounds);
    const hashPassword = await bcrypt.hash(pass, genSalt);
    this.findOneAndUpdate({}, { password: hashPassword });
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
