import axios from 'axios';
import { IChat } from '../@types/chat';

const baseURL = 'http://localhost:7071/api';

const api = axios.create({ baseURL });

export const chatApi = async ({ chat }: { chat: IChat[] }) =>
    api
        .post(`/chat`, {
            chat,
        })
        .then(res => res.data);
