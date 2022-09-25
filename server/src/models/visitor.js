import { Schema, model } from "mongoose";
const NAME_REGEXP =
  /^([0-9a-zA-Z]{1,2}|[\u4e00-\u9eff]|[\u3040-\u309Fー]|[\u30A0-\u30FF]){1,8}$/;
const VisitorSchema = new Schema({
  createTime: { type: Date, default: Date.now },
  lastLoginTime: { type: Date, default: Date.now },
  visitorName: {
    type: String,
    match: NAME_REGEXP,
  },
  avatar: String,
  ip: String,
});

const Visitor = model("Visitor", UserSchema);

export default Visitor;
