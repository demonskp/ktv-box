import { CommonHelper } from "@/helper";
import { Pager, PageType } from "./page";

export interface Variable {
  id: string;
  key?: string;
  initValue?: string;
  value?: string;
  disabled?: boolean;
}

export interface Env {
  id: string;
  name: string;
  desc?: string;
  variables: Variable[];
}

export function createNewEnv(name: string, desc?: string): Env {
  return {
    id: CommonHelper.uuid(),
    name,
    desc,
    variables: [],
  };
}

export function createEnvPager(env?: Env): Pager<Env> {
  const realEnv = env || createNewEnv("新环境配置", "");
  return {
    id: CommonHelper.uuid(),
    type: PageType.ENV,
    title: realEnv.name,
    meta: realEnv,
    changed: false,
  };
}
