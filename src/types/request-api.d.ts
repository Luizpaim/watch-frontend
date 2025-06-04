/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FetchOptions } from "ofetch";
import type { UseFetchOptions } from "#app";
import type { Ref } from "vue";
import type { MethodsHttpEnum } from "../utils/enums/request-api.enum";

declare global {
  type BodyType = Blob | FormData | Record<string, any> | null | undefined;

  type ContentType = "application/json" | "multipart/form-data";

  interface IParamsRequest {
    method: MethodsHttpEnum;
    url: string;
    body?: BodyType;
    contentType?: ContentType | null;
    options?: FetchOptions;
    responseType?: string;
  }

  interface IOptionsUseFetch<T> extends UseFetchOptions<T> {
    contentType?: ContentType;
    pathPublic?: boolean;
  }

  interface IParamsUseFetch<T> {
    url: string | Request | Ref<string | Request> | (() => string | Request);
    options?: IOptionsUseFetch<T>;
  }

  export interface IQuery {
    order?: Ref<Record<string, string> | undefined>;
    page: Ref<number>;
    limit: Ref<number>;
    filter?: Ref<string>;
  }

  export type SuccessRes<T> = {
    data: T;
    status: number;
    message: string;
    messageList: Array<string>;
  };

  export type Pagination<T> = {
    data: Array<T>;
    meta: {
      currentPage: number;
      perPage: number;
      lastPage: number;
      total: number;
    };
  };
}

export {};
