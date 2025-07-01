import { Outlet } from "react-router-dom";
import TitleBar from "./title-bar";
import styles from "./index.module.scss";

export default function Layout() {
  return (
    <div className={styles.layout}>
      <div className={styles.layout_content}>
        <TitleBar />
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
