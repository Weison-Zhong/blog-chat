import { Schema, model } from "mongoose";

const MessageSchema = new Schema({
  createTime: { type: Date, default: Date.now, index: true },
  from: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  to: {
    type: String,
    index: true,
  },
  type: {
    type: String,
    enum: ["text", "image", "file"],
    default: "text",
  },
  content: {
    type: String,
    default: "",
  },
  //撤回
  recalled: {
    type: Boolean,
    default: false,
  },
});


const Message = model('Message', MessageSchema);

export default Message;