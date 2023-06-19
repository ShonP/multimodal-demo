import axios from 'axios';
import { IChat } from '../@types/chat';

const url = 'http://localhost:7071/api';

export const api = axios.create({ baseURL: `${url}/api/v1` });

export const chat = async ({ chat }: { chat: [IChat] }) =>
    api.post(`/chat`, {
        chat,
    });
