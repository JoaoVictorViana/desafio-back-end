import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { API_URL } from '@/configs/api'
import {
  HttpClientInstance,
  HttpClientParams,
  HttpClientWithBodyParams,
  HttpDeleteClient,
  HttpGetClient,
  HttpPostClient,
  HttpPutClient,
} from './interfaces/httpClient'

export class ApiGateway
  implements
    HttpClientInstance<AxiosInstance>,
    HttpGetClient,
    HttpPostClient,
    HttpPutClient,
    HttpDeleteClient
{
  constructor(
    private readonly _axios: AxiosInstance = axios.create({
      baseURL: API_URL,
      headers: {
        Accept: 'json',
      },
    })
  ) {
    //
  }

  getInstance(): AxiosInstance {
    return this._axios
  }

  async get<T = any>(
    params: HttpClientParams,
    config?: AxiosRequestConfig & { isMocking: boolean; mockData?: any }
  ): Promise<T> {
    return this._axios
      .get<T>(params.url, {
        params: params.query,
        ...config,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => res.data)
  }

  async delete<T = AxiosResponse>(
    params: HttpClientParams,
    config?: AxiosRequestConfig & { isMocking: boolean; mockData?: any }
  ): Promise<T> {
    return this._axios.delete(params.url, { params: params.query, ...config })
  }

  async post<T = any, B = any>(
    params: HttpClientWithBodyParams<B>,
    config?: AxiosRequestConfig & { isMocking: boolean; mockData?: any }
  ): Promise<T> {
    return this._axios
      .post(params.url, params.body, {
        params: params.query,
        ...config,
      })
      .then((res) => res.data)
  }

  async put<T = AxiosResponse, B = any>(
    params: HttpClientWithBodyParams<B>,
    config?: AxiosRequestConfig & { isMocking: boolean; mockData?: any }
  ): Promise<T> {
    return this._axios.put(params.url, params.body, { params: params.query })
  }

  async patch<T = AxiosResponse, B = any>(
    params: HttpClientWithBodyParams<B>
  ): Promise<T> {
    return this._axios.patch(params.url, params.body, { params: params.query })
  }
}
