import { Env } from "@/modals/env";
import { createStore } from "./utils";
import { usePageManager } from "./use-page-manager";
import { Manager } from "@/modals/page";

interface EnvManager extends Manager {
  currentEnvId?: string;
  envList: Env[];

  getCurrentEnv: () => Env | undefined;
  setCurrentEnvId: (id?: string) => void;
  addEnv: (env: Env) => void;
  deleteEnv: (id: string) => void;
}

export const useEnvManager = createStore<EnvManager>(
  (set, get) => {
    return {
      envList: [],

      getCurrentEnv: () => {
        const list = get().envList;
        return list.find((env) => env.id === get().currentEnvId);
      },
      setCurrentEnvId: (id?: string) => {
        set({ currentEnvId: id });
      },

      addEnv: (env: Env) => {
        const list = get().envList;

        set({ envList: [...list, env] });
      },
      setInstance: (env: Env) => {
        const list = get().envList;
        const newList = list.map((item) => {
          if (item.id === env.id) {
            return env;
          }
          return item;
        });

        set({ envList: newList });
      },
      deleteEnv: (id: string) => {
        const { envList: list, currentEnvId } = get();
        const newList = list.filter((env) => env.id !== id);
        set({ envList: newList });

        if (currentEnvId === id) {
          set({ currentEnvId: undefined });
        }

        const { getPagerByMetaId, closePager } = usePageManager.getState();
        const pager = getPagerByMetaId(id);
        if (pager) {
          closePager(pager.id);
        }
      },
      setName: (id: string, name: string) => {
        const { envList } = get();
        const newList = envList.map((env) => {
          const newEnv = { ...env };
          if (env.id === id) {
            newEnv.name = name;
          }
          return newEnv;
        });

        set({ envList: newList });
      },
    };
  },
  { name: "env-manager" }
);
