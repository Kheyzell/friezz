import { BASE_API_URL } from '@freizz/client/constants/api.const';
import { HttpResponse } from '@freizz/client/models/http-response';
import axios from 'axios';

export class HttpService {
    async get<T>(resource: string): Promise<HttpResponse<T>> {
        try {
            const { data } = await axios.get<T>(`${BASE_API_URL}/${resource}`);
            return { data };
        } catch (error) {
            return { error: `Error fetching data` };
        }
    }

    async post<T>(resource: string, body: unknown): Promise<HttpResponse<T>> {
        try {
            const { data } = await axios.post<T>(`${BASE_API_URL}/${resource}`, body);
            return { data };
        } catch (error) {
            return { error: `Error updating data` };
        }
    }

    async put<T>(resource: string, body: unknown): Promise<HttpResponse<T>> {
        try {
            const { data } = await axios.put<T>(`${BASE_API_URL}/${resource}`, body);
            return { data };
        } catch (error) {
            return { error: `Error updating data` };
        }
    }

    async delete(resource: string): Promise<HttpResponse<void>> {
        try {
            await axios.delete(`${BASE_API_URL}/${resource}`);

            return { data: void 0 };
        } catch (error) {
            return { error: `Error deleting data` };
        }
    }
}

const httpService = new HttpService();
export default httpService;
