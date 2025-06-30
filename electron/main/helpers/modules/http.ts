import { Api, Response } from "@/modals/api";
import axios, { AxiosHeaders, AxiosRequestConfig, AxiosResponse } from "axios";

const instance = axios.create({
  timeout: 2 * 60 * 1000,
  transitional: {
    clarifyTimeoutError: true,
  },
});

function api2AxiosConfig(api: Api): AxiosRequestConfig {
  const headers = new AxiosHeaders();
  api.headers?.forEach((item) => {
    headers.set(item.name, item.value);
  });

  let url = api.url?.raw;
  if (!(url?.startsWith("http://") || url?.startsWith("https://"))) {
    url = "http://" + url;
  }

  return {
    url,
    method: api.method,
    headers: headers,
  };
}

function axiosResponse2Response(axiosResponse: AxiosResponse): Response {
  const body =
    typeof axiosResponse.data === "string"
      ? axiosResponse.data
      : JSON.stringify(axiosResponse.data);
  return {
    body,
    code: axiosResponse.status,
  };
}

export async function request(api: Api) {
  const config = api2AxiosConfig(api);
  try {
    const axiosResponse = await instance(config);
    const response = axiosResponse2Response(axiosResponse);
    return {
      code: 0,
      data: response,
      message: "",
    };
  } catch (error) {
    const err: Error = error as any;
    return {
      code: 1000,
      message: err.message || "",
    };
  }
}
