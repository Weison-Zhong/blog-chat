import IO from 'socket.io-client';
import config from '@/config';
import { IState } from './context';
import { Action, ActionTypes } from "./context/action";
let io: any = null;
let context: IState | null = null,
    dipatch: React.Dispatch<Action> | null = null;
const socket = {
    //初始化socket对象及拿到context，dispatch
    init: (globalContext: IState) => {
        context = globalContext;
        dipatch = globalContext.dispatch
        initSocket();
    },
    emit: function <T = any>(
        eventName: string,
        data = {},
    ): Promise<[string | null, T | null]> {
        return new Promise((resolve) => {
            io.emit(eventName, data, (res: any) => resolve(res))
        });
    }
}
//初始化socket.io并监听事件
function initSocket(): void {
    console.log('客户端初始化socket');
    io = IO(config.server);
    io.on("connect", async () => {
        console.log('web connect');
        io.on("newVisitor", (data: any) => {
            console.log("newVisitor", data);
            dipatch!({
                type: ActionTypes.SetNewVisitor,
                payload: data
            })
        });
    });
}


export default socket