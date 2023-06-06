import classNames from "classnames";
import {
  SettingsContextType,
  useSettingsContext,
} from "../../context/settingsContext";
import styles from "./Timeline.module.css";
import { SIZE_RATIO } from "../../constants";

const Timeline = () => {
  const { enableSidebar, enable24Format } =
    useSettingsContext() as SettingsContextType;

  const timelineClasses = classNames(styles.timeline, {
    [styles.timelineWithSidebar]: !enableSidebar,
  });

  const getHourString = (hour: number) => {
    if (enable24Format) {
      return `${hour}:00`;
    } else {
      if (hour === 0) {
        return "12 AM";
      }
      if (hour < 12) {
        return `${hour} AM`;
      }
      if (hour === 12) {
        return "12 PM";
      }
      return `${hour - 12} PM`;
    }
  };

  return (
    <div data-testid="timeline" className={timelineClasses}>
      {new Array(24).fill(0).map((_, index) => {
        return (
          <div key={index} className={styles.time}>
            <div
              className={styles.hour}
              style={{ marginLeft: `-${SIZE_RATIO * 60}rem` }}
            >
              {getHourString(index)}
            </div>
            <div
              data-testid="divider-container"
              className={styles.dividerContainer}
              style={{ width: `${SIZE_RATIO * 60}rem` }}
            >
              {new Array(4).fill(0).map((_, index) => {
                return (
                  <div
                    key={index}
                    data-testid="divider"
                    className={styles.divider}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Timeline;
