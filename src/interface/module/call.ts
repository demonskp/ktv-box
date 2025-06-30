import { Api, Response } from "@/modals/api";
import { Result } from "@/modals/common";

export async function call(api: Api) {
  const result: Result<Response> = await window.ipcRenderer.invoke("call", api);
  if (result.code !== 0) {
    throw new Error(result.message);
  }
  return result.data;
}
