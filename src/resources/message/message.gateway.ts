import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageService } from './message.service';
import { Message } from '@psycare/entities';

@WebSocketGateway({ cors: '*' })
export class MessageGateway {
    constructor(private readonly messageService: MessageService) {}

    @WebSocketServer() wss: Server;

    @SubscribeMessage('chatToServer')
    async handleMessage(client: Socket, message: Message) {
        this.wss.to(message.attendanceId.toString()).emit('chatToClient', message);
    }

    @SubscribeMessage('joinRoom')
    handleRoomJoin(client: Socket, attendanceId: string) {
        client.join(attendanceId);
        client.emit('joinedRoom', attendanceId);
    }

    @SubscribeMessage('leaveRoom')
    handleRoomLeave(client: Socket, attendanceId: string) {
        client.leave(attendanceId);
        client.emit('leftRoom', attendanceId);
    }
}
