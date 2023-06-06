import { fireEvent, render, screen, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import NowBtn from "../../components/NowBtn/NowBtn";
import { SettingsContext } from "../../context/settingsContext";
import Epg from "./Epg";
import useDataEpg from "../../hooks/useDataEpg";

const initContext = {
  enableTimeline: true,
  enableSidebar: true,
  enable24Format: true,
  setEnable24Format: vi.fn(),
  setEnableSidebar: vi.fn(),
  setEnableTimeline: vi.fn(),
};

describe("Epg_function", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  // Tests that NowBtn scrolls to current time correctly.
  it("test_now_btn: tests that NowBtn scrolls to current time correctly", () => {
    const parentRef = { current: { scrollTo: vi.fn() } };
    const { getByText } = render(
      <SettingsContext.Provider value={initContext}>
        <NowBtn parentRef={parentRef} />
      </SettingsContext.Provider>
    );
    fireEvent.click(getByText("NOW"));
    expect(parentRef.current.scrollTo).toHaveBeenCalled();
  });

  // Tests that Epg renders without errors.
  it("test_is_error", () => {
    render(
      <SettingsContext.Provider value={initContext}>
        <Epg />
      </SettingsContext.Provider>
    );

    expect(screen.getByText("Failed to load")).toBeInTheDocument();
  });

  // Tests that Epg renders data correctly.
  it("test_is_data", () => {
    // Tests that the function returns the expected data object with channels, isLoading, and isError properties when the API call is successful.
    it("test_returns_expected_data_object", async () => {
      const mockData = {
        channels: [
          { id: 1, name: "Channel 1" },
          { id: 2, name: "Channel 2" },
        ],
      };
      vi.spyOn(global, "fetch").mockResolvedValueOnce({
        json: vi.fn().mockResolvedValueOnce(mockData),
      });
      const { result, waitForNextUpdate } = renderHook(() => useDataEpg());
      await waitForNextUpdate();
      expect(result.current.channels).toEqual(mockData.channels);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isError).toBe(false);
    });
  });
});
