import { useEffect, useRef, useState } from "react";
import useDataEpg from "../../hooks/useDataEpg";
import Guide from "../../components/Guide/Guide";
import NowBtn from "../../components/NowBtn/NowBtn";
import Channel from "../../components/Channel/Channel";
import Slot from "../../components/Slot/Slot";
import VirtualList from "../../components/VirtualList/VirtualList";
import Liveline from "../../components/Liveline/Liveline";
import Timeline from "../../components/Timeline/Timeline";
import { Schedule } from "../../types";
import { MILLISECONDS_BY_MINUTE } from "../../constants";
import {
  SettingsContextType,
  useSettingsContext,
} from "../../context/settingsContext";

const Epg = () => {
  const [_, setCounter] = useState(0);
  const { channels, isLoading, isError } = useDataEpg();
  const parentRef = useRef<HTMLDivElement>(null);
  const { enableTimeline } = useSettingsContext() as SettingsContextType;

  // Refresh every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((counter) => counter + 1);
    }, MILLISECONDS_BY_MINUTE);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Failed to load</p>;

  if (!channels) return <p>No data</p>;

  return (
    <Guide ref={parentRef}>
      <NowBtn parentRef={parentRef} />
      <Liveline />
      {enableTimeline && <Timeline />}
      {channels.map(({ id, title, schedules, images }) => (
        <Channel key={id} title={title} schedules={schedules} images={images}>
          <VirtualList<Schedule> data={schedules} parentRef={parentRef}>
            {(schedule) => <Slot data={schedule} />}
          </VirtualList>
        </Channel>
      ))}
    </Guide>
  );
};

export default Epg;
