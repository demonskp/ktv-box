import { MenuType } from "@/modals/menu";
import { createStore } from "./utils";

interface MenuManager {
  currentType: MenuType;
  filterKeyMap: Record<MenuType, string>;
  currentFilterKey?: string;

  setCurrentType: (type: MenuType) => void;
  onFilterKeyChange: (type: MenuType, key: string) => void;
}

export const useMenuManager = createStore<MenuManager>(
  (set, get) => ({
    currentType: MenuType.apis,
    filterKeyMap: {} as any,

    setCurrentType: (type: MenuType) => {
      const map = get().filterKeyMap;
      set({ currentType: type, currentFilterKey: map[type] });
    },
    onFilterKeyChange: (type: MenuType, key: string) => {
      const map = get().filterKeyMap;
      set({ filterKeyMap: { ...map, [type]: key } });
      if (type === get().currentType) {
        set({ currentFilterKey: key });
      }
    },
  }),
  { name: "menu-manager" }
);
