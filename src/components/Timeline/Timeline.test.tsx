import { render, screen } from "@testing-library/react";
import Timeline from "./Timeline";
import { SettingsContext } from "../../context/settingsContext";
import { SIZE_RATIO } from "../../constants";
import { vi } from "vitest";

const initContext = {
  enableTimeline: true,
  enableSidebar: true,
  enable24Format: true,
  setEnable24Format: vi.fn(),
  setEnableSidebar: vi.fn(),
  setEnableTimeline: vi.fn(),
};

describe("Timeline_function", () => {
  // Tests that the Timeline component renders without crashing.
  it("test_timeline_renders_without_crashing", () => {
    render(
      <SettingsContext.Provider value={initContext}>
        <Timeline />
      </SettingsContext.Provider>
    );
    expect(screen.getByTestId("timeline")).toBeInTheDocument();
  });

  // Tests that the Timeline component displays 24 hours with the correct time format based on the enable24Format setting.
  it("test_timeline_displays_24_hours_with_correct_time_format", () => {
    render(
      <SettingsContext.Provider value={initContext}>
        <Timeline />
      </SettingsContext.Provider>
    );
    expect(screen.getByText("0:00")).toBeInTheDocument();
    expect(screen.getByText("6:00")).toBeInTheDocument();
    expect(screen.getByText("12:00")).toBeInTheDocument();
    expect(screen.getByText("18:00")).toBeInTheDocument();
  });

  // Tests that the Timeline component displays correctly when enable24Format is false.
  it("test_timeline_with_enable_24_format_false", () => {
    render(
      <SettingsContext.Provider
        value={{ ...initContext, enable24Format: false }}
      >
        <Timeline />
      </SettingsContext.Provider>
    );
    expect(screen.getByText("12 PM")).toBeInTheDocument();
    expect(screen.getByText("12 AM")).toBeInTheDocument();
    expect(screen.getByText("1 PM")).toBeInTheDocument();
    expect(screen.getByText("1 AM")).toBeInTheDocument();
  });

  // Tests that the Timeline component adjusts dividers based on the SIZE_RATIO constant.
  it("test_timeline_adjusts_dividers_based_on_size_ratio", () => {
    render(
      <SettingsContext.Provider
        value={{ ...initContext, enable24Format: false }}
      >
        <Timeline />
      </SettingsContext.Provider>
    );
    const dividerContainer = screen.getAllByTestId("divider-container");
    expect(dividerContainer[0]).toHaveStyle({ width: `${SIZE_RATIO * 60}rem` });
  });

  // Tests that the Timeline component displays dividers for each hour.
  it("test_timeline_displays_dividers_for_each_hour", () => {
    render(
      <SettingsContext.Provider
        value={{ ...initContext, enable24Format: false }}
      >
        <Timeline />
      </SettingsContext.Provider>
    );
    const dividers = screen.getAllByTestId("divider");
    expect(dividers.length).toBe(24 * 4);
  });
});
