import React, { useEffect } from "react";
import Chat, { Bubble, useMessages } from "@chatui/core";
import "@chatui/core/dist/index.css";
import socket, { ISocketResult, io } from "@/socket";
import { useGlobalContext, IMessage } from "@/context";
import { ActionTypes } from "@/context/action";
const robotIconUrl = "http://www.weison-zhong.cn/upload/icon-robot.png";
let isShowTyping = true; //当管理员在线时关闭
let totalMsg = 0;
const initialMessages = [
  {
    type: "text",
    content: { text: "你好，欢迎访问我的博客网站，聊天功能还在探索中~" },
    user: {
      avatar: robotIconUrl,
    },
  },
];

// 默认快捷短语，可选
const defaultQuickReplies = [
  {
    icon: "message",
    name: "联系人工服务",
    isNew: true,
    isHighlight: true,
  },
  {
    name: "短语1",
    isNew: true,
  },
  {
    name: "短语2",
    isHighlight: true,
  },
  {
    name: "短语3",
  },
];

export default function () {
  // 消息列表
  const { messages, appendMsg, setTyping, prependMsgs } =
    useMessages(initialMessages);
  const [context, dispatch] = useGlobalContext();
  const { selectedVisitor, isSocketReady } = context;
  // 发送回调
  async function handleSend(type: any, val: any) {
    if (type === "text" && val.trim()) {
      appendMsg({
        type: "text",
        content: { text: val },
        position: "right",
        user: {
          avatar: "http://www.weison-zhong.cn/upload/avatar_144151.png",
        },
      });
      const newMsg: IMessage = {
        id: Date.now().toString(),
        content: val,
        to: selectedVisitor!._id,
      };
      const res: ISocketResult = await socket.emit("sendMessage", newMsg);
      const { code } = res || {};
      if (code !== 1) {
        appendMsg({
          type: "text",
          content: { text: "消息发送失败，请重试" },
          user: {
            avatar: robotIconUrl,
          },
        });
        return;
      }
      if (!isShowTyping) return;
      setTyping(true);
      appendMsg({
        type: "text",
        content: { text: "亲，消息已收到，管理员目前不在线~" },
        user: {
          avatar: robotIconUrl,
        },
      });
    }
  }

  // 快捷短语回调，可根据 item 数据做出不同的操作，这里以发送文本消息为例
  function handleQuickReplyClick(item: any) {
    handleSend("text", item.name);
  }

  function renderMessageContent(msg: any) {
    const { type, content } = msg;

    // 根据消息类型来渲染
    switch (type) {
      case "text":
        return <Bubble content={content.text} />;
      case "image":
        return (
          <Bubble type="image">
            <img src={content.picUrl} alt="" />
          </Bubble>
        );
      default:
        return null;
    }
  }
  const fetchHistoryMsg = async (startNum: number = -1) => {
    const res = await socket.emit("getVisitorHistoryMessages", {
      visitorId: selectedVisitor?._id,
      startNum,
      pageSize: 10,
    });
    console.log("historyMsg", res);
    const { data, code } = res;
    if (code === 1) {
      const { messages, total } = data || {};
      totalMsg = total - 10;
      const format = messages.map((item: any) => ({
        _id: item._id,
        type: "text",
        content: {
          text: item.content,
        },
        position: selectedVisitor?._id === item.to ? "right" : "left",
        user: {
          avatar: robotIconUrl,
        },
      }));
      prependMsgs(format);
      // messages.forEach((item: any) => {
      //   appendMsg({
      //     type: "text",
      //     position: selectedVisitor?._id === item.to ? "right" : "left",
      //     content: { text: item.content },
      //     user: {
      //       avatar: robotIconUrl,
      //     },
      //   });
      // });
    }
  };
  useEffect(() => {
    fetchHistoryMsg();
    console.log("ready", isSocketReady);
    io?.on("newMessage", (data: any) => {
      console.log("newMessage", data);
      appendMsg({
        type: "text",
        content: { text: data.content },
        user: {
          avatar:
            "http://www.weison-zhong.cn:8080/static/media/logo.91b21a28f2ecb6259831.png",
        },
      });
    });
  }, []);
  async function handleFresh() {
    console.log("handleFresh");
    const startNum = totalMsg - 10 - 1;
    totalMsg -= 10;
    const res = await socket.emit("getVisitorHistoryMessages", {
      visitorId: selectedVisitor?._id,
      startNum,
      pageSize: 10,
    });
    console.log('fetch',res.data);
    return new Promise((resolve) => {
      const format = res.data.messages.map((item: any) => ({
        _id: item._id,
        type: "text",
        content: {
          text: item.content,
        },
        position: selectedVisitor?._id === item.to ? "right" : "left",
        user: {
          avatar: robotIconUrl,
        },
      }));
      prependMsgs(format);
      resolve({});
    });
  }
  return (
    <Chat
      navbar={{
        title: `${context.selectedVisitor?.username}`,
        leftContent: {
          icon: "chevron-left",
          title: "Back",
          onClick: () => {
            dispatch({
              type: ActionTypes.SetSelectedVisitor,
              payload: null,
            });
          },
        },
      }}
      messages={messages}
      loadMoreText="加载更多真的吗"
      onRefresh={handleFresh}
      renderMessageContent={renderMessageContent}
      quickReplies={defaultQuickReplies}
      onQuickReplyClick={handleQuickReplyClick}
      onSend={handleSend}
    />
  );
}
