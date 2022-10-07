import IO from 'socket.io-client';
import config from '@/config';
import { IState } from './context';
import { Action, ActionTypes } from "./context/action";
export let io: any = null;
let context: IState | null = null,
    dispatch: React.Dispatch<Action> | null = null;
const socket = {
    //初始化socket对象及拿到context，dispatch
    init: (globalContext: IState) => {
        context = globalContext;
        dispatch = globalContext.dispatch
        initSocket();
    },
    emit: function (
        eventName: string,
        data = {},
    ): Promise<ISocketResult> {
        return new Promise((resolve) => {
            io.emit(eventName, data, (res: any) => resolve(res))
        });
    },
}
//初始化socket.io并监听事件
function initSocket(): void {
    console.log('客户端初始化socket');
    io = IO(config.server);
    io.on("connect", async () => {
        dispatch!({
            type: ActionTypes.SetSocketStatus,
            payload: true
        })
        console.log('web connect');
        //新访客进入
        io.on("visitorEnterFromServer", (data: any) => {
            console.log("visitorEnterFromServer", data);
            dispatch!({
                type: ActionTypes.SetNewVisitor,
                payload: data
            })
        });
        //新消息
        // io.on("newMessage", (data: any) => {
        //     console.log("newMessage", data);
        //     dispatch!({
        //         type: ActionTypes.SetNewMessage,
        //         payload: data
        //     })
        // });
    });
}

export interface ISocketResult {
    code: number,
    msg: string,
    data?: any
}


export default socket