import { Api, Folder } from "@/modals/api";
import { Manager } from "@/modals/page";
import { createStore } from "./utils";

interface ApiManager extends Manager {
  folderList: Folder[];
  expandedIds: string[];

  expandFolder: (id: string) => void;
  collapseFolder: (id: string) => void;
}

const useApiManager = createStore<ApiManager>((set, get) => ({
  folderList: [],
  expandedIds: [],

  expandFolder: (id: string) => {
    const { expandedIds } = get();
    set({ expandedIds: [...expandedIds, id] });
  },
  collapseFolder: (id: string) => {
    const { expandedIds } = get();
    set({ expandedIds: expandedIds.filter((oid) => oid !== id) });
  },
  setName: (id: string, name: string) => {
    //
  },
  setInstance: (api: Api) => {
    //
  },
}));
