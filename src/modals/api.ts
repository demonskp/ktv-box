import { CommonHelper } from "@/helper";
import { Pager, PageType } from "./page";

export interface Api {
  id: string;
  name: string;
  method: ApiMethod;
  url?: {
    raw: string;
    host?: string;
    protocol?: string;
    path?: string;
    hash?: string;
    query?: Property[];
  };
  headers?: Property[];
  body?: {
    mode?: BodyMode;
    raw?: string;
    formDatas?: Property[];
    xFormUrlencoded?: Property[];
    options?: {
      raw?: {
        language?: string;
      };
    };
  };
  response?: Response;
}

export interface Response {
  body?: string;
  code?: number;
}

export interface ApiInfo {
  id: string;
  name: string;
  type: ApiMethod;
}

export interface Property {
  id: string;
  name?: string;
  type: string;
  value?: string;
  desc?: string;
  disabled?: boolean;
}

export enum ApiMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export enum BodyMode {
  None = "none",
  FormData = "form-data",
  XFormUrlencoded = "x-www-form-urlencoded",
  Raw = "raw",
}

export function createApi(): Api {
  return {
    id: CommonHelper.uuid(),
    name: "API",
    method: ApiMethod.GET,
    headers: [],
  };
}

export function createApiPage(api?: Api): Pager<Api> {
  const realApi = api || createApi();

  const type = {
    [ApiMethod.GET]: PageType.API_GET,
    [ApiMethod.POST]: PageType.API_POST,
    [ApiMethod.PUT]: PageType.API_PUT,
    [ApiMethod.DELETE]: PageType.API_DELETE,
  }[realApi.method];

  return {
    id: realApi.id,
    type,
    title: realApi.name,
    changed: false,
    meta: realApi,
  };
}

// ---------fold--------------

export interface Folder {
  id: string;
  name: string;
  children: (Folder | ApiInfo)[];
}
