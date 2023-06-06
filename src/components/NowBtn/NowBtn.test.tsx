import { fireEvent, render, screen } from "@testing-library/react";
import NowBtn from "./NowBtn";
import React from "react";
import { SettingsContext } from "../../context/settingsContext";
import { vi } from "vitest";

const initContext = {
  enableTimeline: true,
  enableSidebar: false,
  enable24Format: false,
  setEnable24Format: vi.fn(),
  setEnableSidebar: vi.fn(),
  setEnableTimeline: vi.fn(),
};

describe("NowBtn_function", () => {
  // Tests that the NowBtn component renders without errors.
  it("test_renders_component_without_errors", () => {
    render(
      <SettingsContext.Provider value={initContext}>
        <NowBtn parentRef={React.createRef()} />
      </SettingsContext.Provider>
    );
    expect(screen.getByText("NOW")).toBeInTheDocument();
  });

  // Tests that the component handles the case when parentRef is null.
  it("test_parent_ref_is_null", () => {
    const scrollToNow = vi.fn();
    const parentRef = React.createRef() as React.RefObject<HTMLDivElement>;
    render(
      <SettingsContext.Provider value={initContext}>
        <NowBtn parentRef={parentRef} />
      </SettingsContext.Provider>
    );
    expect(scrollToNow).not.toHaveBeenCalled();
  });

  // Tests that the component scrolls to the current time on click.
  it("test_scroll_to_current_time_on_click", () => {
    const parentRef = { current: { scrollTo: vi.fn() } };
    const { getByText } = render(
      <SettingsContext.Provider value={initContext}>
        <NowBtn parentRef={parentRef} />
      </SettingsContext.Provider>
    );
    fireEvent.click(getByText("NOW"));
    expect(parentRef.current.scrollTo).toHaveBeenCalled();
  });
});
