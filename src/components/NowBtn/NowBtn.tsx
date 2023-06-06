import { useEffect, useCallback } from "react";
import styles from "./NowBtn.module.css";
import { TIMELINE_NOW_RATIO, SIZE_RATIO } from "../../constants";
import { getRemInPx } from "../../utils";
import {
  SettingsContextType,
  useSettingsContext,
} from "../../context/settingsContext";
import classNames from "classnames";

type NowBtnProps = {
  parentRef: React.RefObject<HTMLDivElement>;
};

const NowBtn = ({ parentRef }: NowBtnProps) => {
  const { enableTimeline } = useSettingsContext() as SettingsContextType;

  const scrollToNow = useCallback(() => {
    const now = new Date();
    const minsAllDay = now.getMinutes() + now.getHours() * 60;

    if (!parentRef?.current) return;

    const remSize = getRemInPx();

    const moveToLeft =
      minsAllDay * remSize * SIZE_RATIO -
      parentRef.current.clientWidth * TIMELINE_NOW_RATIO;

    parentRef.current.scrollTo({
      left: moveToLeft,
      behavior: "smooth",
    });
  }, [parentRef]);

  // Scroll to now on mount
  useEffect(() => {
    scrollToNow();
  }, [scrollToNow]);

  const nowClasses = classNames(styles.now, {
    [styles.nowWithoutTimeline]: !enableTimeline,
  });

  return (
    <div className={nowClasses} onClick={() => scrollToNow()}>
      NOW
    </div>
  );
};

export default NowBtn;
