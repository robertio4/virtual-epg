import { render, screen } from "@testing-library/react";
import Slot from "./Slot";
import { Schedule } from "../../types";
import { SettingsContext } from "../../context/settingsContext";
import { MILLISECONDS_BY_MINUTE } from "../../constants";
import { vi } from "vitest";

const initContext = {
  enableTimeline: true,
  enableSidebar: true,
  enable24Format: true,
  setEnable24Format: vi.fn(),
  setEnableSidebar: vi.fn(),
  setEnableTimeline: vi.fn(),
};

describe("Slot_function", () => {
  const data: Schedule = {
    id: "1",
    title: "Test Schedule",
    start: new Date("2022-01-01T10:00:00").toLocaleString(),
    end: new Date("2022-01-01T11:00:00").toLocaleString(),
  };

  // Tests that the Slot component renders correctly with valid data.
  it("test_slot_renders_with_valid_data", () => {
    render(
      <SettingsContext.Provider value={initContext}>
        <Slot data={data} />
      </SettingsContext.Provider>
    );
    const titleElement = screen.getByText("Test Schedule");
    const hoursElement = screen.getByText("10:00 - 11:00");
    expect(titleElement).toBeInTheDocument();
    expect(hoursElement).toBeInTheDocument();
  });

  // Tests that the Slot component displays the correct start and end times.
  it("test_slot_displays_correct_start_and_end_times", () => {
    render(
      <SettingsContext.Provider
        value={{
          ...initContext,
          enable24Format: false,
        }}
      >
        <Slot data={data} />
      </SettingsContext.Provider>
    );
    const hoursElement = screen.getByText("10:00 AM - 11:00 AM");
    expect(hoursElement).toBeInTheDocument();
  });

  // Tests adding the "live" class to the slot if it is currently live.
  it("test_slot_live_class", () => {
    const data = {
      id: "1",
      title: "Test Slot",
      start: new Date(
        Date.now() - 30 * MILLISECONDS_BY_MINUTE
      ).toLocaleString(),
      end: new Date(Date.now() + 30 * MILLISECONDS_BY_MINUTE).toLocaleString(),
    };
    render(
      <SettingsContext.Provider
        value={{
          ...initContext,
          enable24Format: false,
        }}
      >
        <Slot data={data} />
      </SettingsContext.Provider>
    );
    const infoElement = screen.getByTestId("slot-info");
    expect(infoElement).toHaveClass("_info_93b7a2 _live_93b7a2");
  });
});
