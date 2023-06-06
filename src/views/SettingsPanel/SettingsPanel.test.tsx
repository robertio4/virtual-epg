import { fireEvent, render } from "@testing-library/react";
import { SettingsContext } from "../../context/settingsContext";
import { SettingsPanel } from "./SettingsPanel";
import { vi } from "vitest";

describe("SettingsPanel_function", () => {
  // Tests that the SettingsPanel component calls the correct setter function when a checkbox is clicked.
  it("test_settings_panel_updates_settings", () => {
    const setEnableTimeline = vi.fn();
    const setEnableSidebar = vi.fn();
    const setEnable24Format = vi.fn();
    const { getByLabelText } = render(
      <SettingsContext.Provider
        value={{
          enableTimeline: false,
          setEnableTimeline,
          enableSidebar: true,
          setEnableSidebar,
          enable24Format: false,
          setEnable24Format,
        }}
      >
        <SettingsPanel />
      </SettingsContext.Provider>
    );
    fireEvent.click(getByLabelText("Timeline"));
    fireEvent.click(getByLabelText("24h/12h"));
    expect(setEnableTimeline).toHaveBeenCalledWith(true);
    expect(setEnableSidebar).not.toHaveBeenCalled();
    expect(setEnable24Format).toHaveBeenCalledWith(true);
  });
});
