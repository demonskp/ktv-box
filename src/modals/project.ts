import { Api } from "./api";
import { Env } from "./env";

export interface ProjectInfo {
  id: string;
  name: string;
  desc: string;
}

export interface ProjectDetail extends ProjectInfo {
  environments?: Env[];
  Apis?: Api[];
}
