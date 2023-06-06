import Checkbox from "../../components/Checkbox/Checkbox";
import {
  SettingsContextType,
  useSettingsContext,
} from "../../context/settingsContext";

import styles from "./SettingsPanel.module.css";

export const SettingsPanel = () => {
  const settingsContext = useSettingsContext() as SettingsContextType;
  const {
    enableTimeline,
    setEnableTimeline,
    enableSidebar,
    setEnableSidebar,
    enable24Format,
    setEnable24Format,
  } = settingsContext;

  return (
    <>
      <h3>Settings</h3>
      <div className={styles.container}>
        <Checkbox
          id="sidebar"
          checked={enableSidebar}
          onChange={(e) => setEnableSidebar(e.target.checked)}
          label="Sidebar"
        />
        <Checkbox
          id="timeline"
          checked={enableTimeline}
          onChange={(e) => setEnableTimeline(e.target.checked)}
          label="Timeline"
        />
        <Checkbox
          id="format"
          checked={enable24Format}
          onChange={(e) => setEnable24Format(e.target.checked)}
          label="24h/12h"
        />
      </div>
    </>
  );
};
