import { BASE_API_URL } from '@freizz/client/constants/api.const';
import { Result, fail, succeed } from '@friezz/common';
import axios from 'axios';
import { HttpResponseError } from '../errors/http-response.errors';

export class HttpService {
    async get<T>(resource: string): Promise<Result<T | null, HttpResponseError>> {
        try {
            const { data } = await axios.get<T>(`${BASE_API_URL}/${resource}`);
            return succeed<T | null>(data ?? null);
        } catch (error) {
            return fail(HttpResponseError.couldNotFetch);
        }
    }

    async post<T>(resource: string, body: unknown): Promise<Result<T, HttpResponseError>> {
        try {
            const { data } = await axios.post<T>(`${BASE_API_URL}/${resource}`, body);
            return succeed(data);
        } catch (error) {
            return fail(HttpResponseError.couldNotUpdate);
        }
    }

    async put<T>(resource: string, body: unknown): Promise<Result<T, HttpResponseError>> {
        try {
            const { data } = await axios.put<T>(`${BASE_API_URL}/${resource}`, body);
            return succeed(data);
        } catch (error) {
            return fail(HttpResponseError.couldNotUpdate);
        }
    }

    async delete(resource: string): Promise<Result<void, HttpResponseError>> {
        try {
            await axios.delete(`${BASE_API_URL}/${resource}`);

            return succeed<void>(void 0);
        } catch (error) {
            return fail(HttpResponseError.couldNotDelete);
        }
    }
}

const httpService = new HttpService();
export default httpService;
