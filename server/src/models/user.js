import { Schema, model } from "mongoose";
const NAME_REGEXP =
  /^([0-9a-zA-Z]{1,2}|[\u4e00-\u9eff]|[\u3040-\u309Fー]|[\u30A0-\u30FF]){1,8}$/;
const UserSchema = new Schema({
  createTime: { type: Date, default: Date.now },
  lastLoginTime: { type: Date, default: Date.now },
  username: {
    type: String,
    trim: true,
    unique: true,
    match: NAME_REGEXP,
    index: true,
  },
  password: String,
  avatar: String,
  salt: String,
  ip: String,
});

const User = model("User", UserSchema);

export default User;
