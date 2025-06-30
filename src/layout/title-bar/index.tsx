import { Dropdown, MenuProps, Space } from "antd";
import styles from "./index.module.scss";
import {
  BorderOutlined,
  CloseOutlined,
  MenuOutlined,
  MinusCircleFilled,
  MinusOutlined,
} from "@ant-design/icons";
import { useMemo, useState } from "react";
import classNames from "classnames";
import { WindowInterface } from "@/interface";

export default function TitleBar() {
  const [max, setMax] = useState(false);

  const menus = useMemo<MenuProps["items"]>(() => {
    return [
      {
        label: "调试",
        key: "调试",
        onClick: () => {
          WindowInterface.devTool();
        },
      },
      {
        label: "test",
        key: "test",
        onClick: () => {
          window.ipcRenderer.invoke("createProject");
        },
      },
    ];
  }, []);

  function closeHandle() {
    WindowInterface.closeWindow();
  }

  function minHandle() {
    WindowInterface.minWindow();
  }

  function maxHandle() {
    WindowInterface.maxWindow().then((isMax) => {
      setMax(isMax);
    });
  }

  return (
    <div className={styles.title_bar} onDoubleClick={maxHandle}>
      <div>
        <Dropdown
          trigger={["click"]}
          menu={{ items: menus }}
          placement="bottomRight"
        >
          <MenuOutlined className={styles.menu_item} />
        </Dropdown>
      </div>
      <div className={styles.title}></div>
      <div>
        <Space>
          <MinusOutlined className={styles.menu_item} onClick={minHandle} />
          {max ? (
            <span
              className={classNames(
                "iconfont icon-xiangxiahuanyuan",
                styles.menu_item
              )}
              onClick={maxHandle}
            />
          ) : (
            <BorderOutlined className={styles.menu_item} onClick={maxHandle} />
          )}
          <CloseOutlined className={styles.close_item} onClick={closeHandle} />
        </Space>
      </div>
    </div>
  );
}
