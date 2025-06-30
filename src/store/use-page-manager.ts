import { Manager, Meta, Pager, PageType } from "@/modals/page";
import { createStore, useShallow } from "./utils";
import { useEnvManager } from "./use-env-manager";

interface PageManager {
  currentPager?: Pager;
  pagerIds: string[];
  pagerMap: Record<string, Pager>;
  changPageIds: (newIds: string[]) => void;
  getPager: (id: string) => Pager | undefined;
  getPagerByMetaId: <T extends Meta>(metaId: string) => Pager<T> | undefined;
  setOrAddPager: <T extends Meta>(pager: Pager<T>) => void;
  setPager: <T extends Meta>(pager: Pager<T>, changed?: boolean) => void;
  setCurrentPager: (id: string) => void;
  closePager: (id: string) => void;
  addPager: <T extends Meta>(pager: Pager<T>) => void;
  setPagerName: <T extends Meta>(id: string, title: string, meta?: T) => void;
  savePager: <T extends Meta>(pager: Pager<T>) => void;
}

function getManagerByPageType(type: PageType): Manager {
  switch (type) {
    case PageType.ENV:
      return useEnvManager.getState();

    default:
      return useEnvManager.getState();
  }
}

export const usePageManager = createStore<PageManager>(
  (set, get) => {
    return {
      pagerIds: [],
      pagerMap: {},
      changPageIds(newIds) {
        set({ pagerIds: newIds });
      },
      getPager: (id: string) => {
        const map = get().pagerMap;
        if (map[id]) {
          return map[id];
        }
      },
      getPagerByMetaId: <T extends Meta>(metaId: string) => {
        const { pagerIds, pagerMap } = get();
        const pagerId = pagerIds.find((id) => {
          const item = pagerMap[id];
          return item.meta.id === metaId;
        });

        if (!pagerId) return undefined;

        return pagerMap[pagerId] as Pager<T>;
      },
      setPager: (pager: Pager, changed: boolean = true) => {
        const newPager = { ...pager, changed: changed };
        const map = get().pagerMap;
        if (!map[newPager.id]) {
          return;
        }
        map[newPager.id] = newPager;

        set({ pagerMap: map, currentPager: newPager });
      },
      addPager: (pager: Pager) => {
        const map = get().pagerMap;
        const list = get().pagerIds;

        if (map[pager.id]) {
          return;
        }
        list.push(pager.id);
        map[pager.id] = pager;

        set({ pagerIds: list, pagerMap: map });
        get().setCurrentPager(pager.id);
      },
      setOrAddPager: (pager: Pager) => {
        const map = get().pagerMap;

        if (!map[pager.id]) {
          get().addPager(pager);
        } else {
          get().setPager(pager, pager.changed);
        }
      },
      setCurrentPager: (id: string) => {
        const pager = get().getPager(id);
        if (!pager) {
          console.warn("找不到对应的id");
          return;
        }
        set({ currentPager: pager });
      },
      closePager: (id: string) => {
        const { pagerMap: map, pagerIds: list, currentPager } = get();
        const newList = list.filter((oid) => oid !== id);
        delete map[id];
        if (currentPager?.id === id) {
          const oldIndex = list.findIndex((oid) => oid === id);
          const newCurrentId =
            newList[oldIndex] || newList[oldIndex - 1] || newList[0];
          const newCurrent = map[newCurrentId];
          set({ currentPager: { ...newCurrent } });
        }
        set({ pagerIds: [...newList], pagerMap: { ...map } });
      },
      setPagerName: <T extends Meta>(id: string, title: string, meta?: T) => {
        const { pagerMap } = get();
        const oldPager = pagerMap[id];
        if (!oldPager) return;
        const newPager = { ...oldPager, title };
        if (meta) {
          newPager.meta = { ...meta };
          const manager = getManagerByPageType(oldPager.type);
          manager.setName(meta.id, meta.name);
        }
        pagerMap[newPager.id] = newPager;
        set({
          pagerMap,
          currentPager: newPager,
        });
      },
      savePager: <T extends Meta>(pager: Pager<T>) => {
        const { setPager } = get();
        const manager = getManagerByPageType(pager.type);
        manager.setInstance(pager.meta);
        setPager(pager, false);
      },
    };
  },
  { name: "page-manager" }
);

export function usePager<T extends Meta = any>(id: string) {
  return usePageManager(
    useShallow((state) => ({
      pager: state.getPager(id) as Pager<T>,
      setPager: state.setPager<T>,
      setPagerName: state.setPagerName,
      savePager: state.savePager<T>,
    }))
  );
}
