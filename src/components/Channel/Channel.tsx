import classNames from "classnames";
import { SIZE_RATIO } from "../../constants";
import {
  SettingsContextType,
  useSettingsContext,
} from "../../context/settingsContext";
import { Schedule } from "../../types";
import { getRemInPx } from "../../utils";
import styles from "./Channel.module.css";
import { useState } from "react";

type ChannelProps = {
  title: string;
  schedules: Schedule[];
  images: {
    logo: string;
  };
  children: JSX.Element;
};

const Channel = ({ title, images, children, schedules }: ChannelProps) => {
  const { enableSidebar } = useSettingsContext() as SettingsContextType;
  const [logoError, setLogoError] = useState(false);

  let offsetStart = 0;

  // If there is no schedule, we don't display the channel
  if (!schedules.length) return null;

  const firstStart = new Date(schedules[0].start);
  const mins = firstStart.getMinutes();
  const hours = firstStart.getHours();
  const remInPx = getRemInPx();

  // Calculate the offset to start the list at the right time
  offsetStart = SIZE_RATIO * remInPx * mins + SIZE_RATIO * remInPx * 60 * hours;

  const itemsClasses = classNames(styles.items, {
    [styles.itemsWithoutSidebar]: !enableSidebar,
  });

  const handleImageError = () => {
    setLogoError(true);
  };

  const renderImage = () => {
    if (!logoError) {
      return (
        <img
          src={images.logo}
          className={styles.image}
          alt={title}
          onError={handleImageError}
        />
      );
    } else {
      return <>{title}</>; // This is the fallback if there is no image or if the image is broken
    }
  };

  return (
    <div className={styles.container}>
      {enableSidebar && <div className={styles.sidebar}>{renderImage()}</div>}
      <div className={itemsClasses} style={{ paddingLeft: offsetStart || 0 }}>
        {children}
      </div>
    </div>
  );
};

export default Channel;
