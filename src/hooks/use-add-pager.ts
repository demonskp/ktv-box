import { createApiPage } from "@/modals/api";
import { createEnvPager } from "@/modals/env";
import { MenuType } from "@/modals/menu";
import { useEnvManager } from "@/store/use-env-manager";
import { usePageManager } from "@/store/use-page-manager";
import { useShallow } from "zustand/react/shallow";

export default function useAddPager() {
  const { addPager: realAddPager } = usePageManager(
    useShallow((state) => ({ addPager: state.addPager }))
  );
  const { addEnv } = useEnvManager(
    useShallow((state) => ({ addEnv: state.addEnv }))
  );

  function addPager(type: MenuType) {
    switch (type) {
      case MenuType.apis:
        realAddPager(createApiPage());
        break;
      case MenuType.envs:
        const envPager = createEnvPager();
        addEnv(envPager.meta);
        realAddPager(envPager);
        break;
    }
  }

  return { addPager };
}
