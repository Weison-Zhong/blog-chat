import Message from "../models/message.js";
import User from "../models/user.js";
import Socket from "../models/socket.js";
//发送消息给指定人
export const sendMessage = async (ctx) => {
  const { socket, data } = ctx;
  const { to, content } = data;
  const { id: tarSocketId } = await Socket.findOne({ user: to });
  //创建新消息记录
  const newMessage = await Message.create({
    from: socket.user,
    to,
    type: "text",
    content,
  });
  //发送给对应客户端
  socket.emit(tarSocketId, "newMessage", newMessage);
  return {
    code: 1,
    msg: "发送消息成功",
  };
};
//获取指定访客消息记录
export async function getVisitorHistoryMessages(ctx) {
  // const { linkmanId, existCount } = ctx.data;

  // const messages = await Message.find(
  //   { to: linkmanId },
  //   {
  //     type: 1,
  //     content: 1,
  //     from: 1,
  //     createTime: 1,
  //     deleted: 1,
  //   },
  //   {
  //     sort: { createTime: -1 },
  //     limit: 30 + existCount,
  //   }
  // ).populate("from", { username: 1, avatar: 1, tag: 1 });
  // await handleInviteV2Messages(messages);
  // const result = messages.slice(existCount).reverse();
  // return result;

  const { socket, data } = ctx;
  const { startNum, pageSize, visitorId } = data;
  console.log("startNum", startNum);
  const total = await Message.count({
    $or: [{ from: visitorId }, { to: visitorId }],
  });
  let messages = await Message.find({
    $or: [{ from: visitorId }, { to: visitorId }],
  });
  if (startNum === -1) {
    messages = messages.slice(-10);
  } else {
    messages = messages.splice(startNum - 1, pageSize);
  }
  return {
    code: 1,
    msg: "操作成功",
    data: {
      messages,
      total,
    },
  };
}

// let page = req.query.pageNum || 1;
// let limit = req.query.pageSize || 10;
// const query = req.query.query;
// const reg = new RegExp(query, 'i');
// const queryOptions = { $or: [{ visitorName: { $regex: reg } }, { visitorId: { $regex: reg } }] };
// const visitors = await Visitor.find(queryOptions).sort({ createdAt: -1 }).skip((page - 1) * parseInt(limit)).limit(parseInt(limit));
