export type HttpUrlClientParams = {
  url: string
}

export type HttpQueryClientParams = {
  query?: {
    [key: string]: any
  }
}

export type HttpBodyParams<T> = {
  body: T
}

export type HttpClientParams = HttpUrlClientParams & HttpQueryClientParams

export type HttpClientWithBodyParams<T> = HttpUrlClientParams &
  HttpBodyParams<T> &
  HttpQueryClientParams

export interface HttpClientInstance<T> {
  getInstance(): T
}

export interface HttpGetClient {
  get<T>(params: HttpClientParams): Promise<T>
}

export interface HttpDeleteClient {
  delete<T>(params: HttpClientParams): Promise<T>
}

export interface HttpPostClient {
  post<T, B>(params: HttpClientWithBodyParams<B>, config: any): Promise<T>
}

export interface HttpPutClient {
  put<T, B>(params: HttpClientWithBodyParams<B>): Promise<T>
}
