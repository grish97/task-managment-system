const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    username: String,
    email: String,
    password: String,
  },
  { timestamps: true }
);

const User = new mongoose.model("user", userSchema);

async function seedDb() {
  await User.deleteMany({});

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash("admin0000", salt);

  await User.insertMany([
    {
      username: "Admin",
      email: "admin@admin.com",
      password: hashedPassword,
    },
  ]);
}

seedDb();

module.exports = User;
