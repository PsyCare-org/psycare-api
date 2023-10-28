import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosRequestConfig } from 'axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CallService {
    constructor(private readonly configService: ConfigService, private readonly http: HttpService) {}

    apiUrl: string = this.configService.get('call').apiUrl;
    token: string = this.configService.get('call').token;
    config: AxiosRequestConfig = {
        headers: {
            Authorization: this.token,
        },
    };

    private async createRoom(id: number) {
        const url = `${this.apiUrl}/rooms`;
        const payload = {
            customRoomId: id,
            weebhook: ['participant-joined', 'participant-left', 'session-started', 'session-ended'],
            autoCloseConfig: {
                type: 'session-ends',
                duration: 60,
            },
        };

        const { data } = await firstValueFrom(this.http.post(url, payload, this.config));

        return data;
    }

    async findOne(id: number) {
        try {
            const { data } = await firstValueFrom(this.http.get(`${this.apiUrl}/rooms/${id}`, this.config));
            return data;
        } catch {
            return this.createRoom(id);
        }
    }
}
