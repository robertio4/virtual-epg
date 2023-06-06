import { s } from "vitest/dist/types-dea83b3d.js";
import { MILLISECONDS_BY_MINUTE, SIZE_RATIO } from "../../constants";
import {
  SettingsContextType,
  useSettingsContext,
} from "../../context/settingsContext";
import { Schedule } from "../../types";
import styles from "./Slot.module.css";
import classNames from "classnames";

type SlotProps = {
  data: Schedule;
};

const Slot = ({ data: { title, start, end } }: SlotProps) => {
  const { enable24Format } = useSettingsContext() as SettingsContextType;

  if (!start || !end) return null;

  // Format the date to display only the hours and minutes
  const formatOptions: Intl.DateTimeFormatOptions = {
    hour: enable24Format ? "2-digit" : "numeric",
    minute: "2-digit",
    hour12: !enable24Format,
  };

  const startDate = new Date(start.toLocaleString());
  const startDateString = startDate.toLocaleTimeString([], formatOptions);

  const dateEnd = new Date(end.toLocaleString());
  const dateEndString = dateEnd.toLocaleTimeString([], formatOptions);

  const duration = new Date(end).getTime() - new Date(start).getTime();
  const durationInMinutes = Math.round(duration / MILLISECONDS_BY_MINUTE);

  // Add live class if the schedule is live
  const infoClasses = classNames(styles.info, {
    [styles.live]:
      startDate.getTime() <= Date.now() && dateEnd.getTime() >= Date.now(),
  });

  return (
    <div
      className={styles.container}
      style={{ width: `${durationInMinutes * SIZE_RATIO}rem` }}
    >
      <div data-testid={"slot-info"} className={infoClasses}>
        <div className={styles.title}>{title}</div>
        <div className={styles.hours}>
          {startDateString} - {dateEndString}
        </div>
      </div>
    </div>
  );
};

export default Slot;
