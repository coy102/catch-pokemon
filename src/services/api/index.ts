import axios, { AxiosResponse } from 'axios';
const BASE_URL = 'https://pokeapi.co/api/v2';

type ApiRequest = (
  url: string,
  payload?: object
) => Promise<AxiosResponse<any>>;

export class Api {
  axios: {
    get: ApiRequest;
    post: ApiRequest;
    put: ApiRequest;
    delete: ApiRequest;
  };

  constructor() {
    this.axios = axios.create({
      baseURL: BASE_URL,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      timeout: 60 * 1000,
    });
  }

  async get<T>(url: string, payload?: object) {
    const res = await this.handleResponse<T>(this.axios.get, { url, payload });
    return res;
  }

  async put<T>(url: string, payload?: object) {
    const res = await this.handleResponse<T>(this.axios.put, { url, payload });
    return res;
  }

  async post<T>(url: string, payload?: object) {
    const res = await this.handleResponse<T>(this.axios.post, {
      url,
      payload,
    });
    return res;
  }

  async delete<T>(url: string, payload?: object) {
    const res = await this.handleResponse<T>(this.axios.delete, {
      url,
      payload,
    });
    return res;
  }

  protected async handleResponse<T>(
    apiRequest: ApiRequest,
    params: any
  ): Promise<AxiosResponse<T>> {
    const res = await apiRequest(params.url, params.payload);
    return res;
  }
}
