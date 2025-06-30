import { BlockOutlined, FolderOutlined } from "@ant-design/icons";

export enum MenuType {
  apis = "apis",
  envs = "envs",
}

export const MenuList = [
  {
    icon: <FolderOutlined />,
    label: "接口",
    id: MenuType.apis,
  },
  {
    icon: <BlockOutlined />,
    label: "环境变量",
    id: MenuType.envs,
  },
];
