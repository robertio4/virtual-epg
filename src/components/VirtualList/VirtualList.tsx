import { RefObject } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

type VirtualListProps<T> = {
  data: T[];
  parentRef: RefObject<HTMLDivElement>;
  children: (data: T) => JSX.Element;
};

const VirtualList = <T,>({
  data,
  parentRef,
  children,
}: VirtualListProps<T>) => {
  const virtualizer = useVirtualizer({
    horizontal: true,
    count: data.length,
    getScrollElement: () => parentRef?.current,
    estimateSize: () => 45,
    overscan: 3,
  });

  return (
    <div
      style={{
        width: virtualizer.getTotalSize(),
        height: "100%",
        position: "relative",
      }}
    >
      {virtualizer.getVirtualItems().map((virtualColumn) => (
        <div
          key={virtualColumn.index}
          data-index={virtualColumn.index}
          ref={virtualizer.measureElement}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            transform: `translateX(${virtualColumn.start}px)`,
          }}
        >
          {children(data[virtualColumn.index])}
        </div>
      ))}
    </div>
  );
};

export default VirtualList;
