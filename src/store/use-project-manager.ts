import { ProjectDetail, ProjectInfo } from "@/modals/project";
import { createStore } from "./utils";
import { Manager } from "@/modals/page";

export interface ProjectManager extends Manager {
  projectInfos: ProjectInfo[];
  currentProject?: ProjectInfo;
  setCurrentProject: (id: string) => void;
}

export const useProjectManager = createStore<ProjectManager>(
  (set, get) => ({
    projectInfos: [{ id: "asdasd", name: "测试假项目", desc: "" }],
    setCurrentProject: (id: string) => {
      const info = get().projectInfos.find((item) => item.id === id);
      if (!info) {
        throw new Error(`项目:${id}, 不存在`);
      }
      set({ currentProject: info });
    },
    setInstance(meta: ProjectInfo) {
      // TODO
    },
    setName(id, name) {
      // TODO
    },
  }),
  { name: "project-manager" }
);
