const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    isTeacher: { type: Boolean, default: false },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

// This is to encrypt the password before saving it into satabase
userSchema.pre("save", async function (next) {
  // This checks if the password is modified or not. If it is not modified, then it will progress to next step, otherwise not.
  if (!this.isModified) {
    next();
  }

  const salt = await bcrypt.genSalt(10); // Generating the salt for hashing
  this.password = await bcrypt.hash(this.password, salt); // Hashing the password with the salt
});

const User = mongoose.model("User", userSchema);

module.exports = User;
