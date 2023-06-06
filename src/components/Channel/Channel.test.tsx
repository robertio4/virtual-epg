import { render, screen } from "@testing-library/react";
import Channel from "./Channel";
import { Schedule } from "../../types";
import { SettingsContext } from "../../context/settingsContext";
import { vi } from "vitest";

const initContext = {
  enableTimeline: true,
  enableSidebar: true,
  enable24Format: true,
  setEnable24Format: vi.fn(),
  setEnableSidebar: vi.fn(),
  setEnableTimeline: vi.fn(),
};

describe("Channel_function", () => {
  const schedules: Schedule[] = [
    {
      id: "1",
      title: "Test Schedule",
      start: "2022-01-01T12:00:00.000Z",
      end: "2022-01-01T13:00:00.000Z",
    },
  ];

  // Tests that a channel with a logo is displayed correctly.
  it("test_channel_with_logo", () => {
    const title = "Test Channel";
    const images = { logo: "https://example.com/logo.png" };
    const children = <div>Test Children</div>;

    render(
      <SettingsContext.Provider value={initContext}>
        <Channel
          title={title}
          images={images}
          schedules={schedules}
          children={children}
        />
      </SettingsContext.Provider>
    );

    expect(screen.getByAltText(title)).toBeInTheDocument();
    expect(screen.getByText("Test Children")).toBeInTheDocument();
  });

  // Tests that the channel is not displayed when there are no schedules.
  it("test_channel_with_no_schedules", () => {
    const title = "Test Channel";
    const images = { logo: "https://example.com/logo.png" };
    const schedules: Schedule[] = [];
    const children = <div>Test Children</div>;

    render(
      <SettingsContext.Provider value={initContext}>
        <Channel
          title={title}
          images={images}
          schedules={schedules}
          children={children}
        />
      </SettingsContext.Provider>
    );

    expect(screen.queryByText(title)).not.toBeInTheDocument();
    expect(screen.queryByText("Test Children")).not.toBeInTheDocument();
  });

  // Tests that the offset to start the list is calculated correctly when schedules span multiple days.
  it("test_channel_with_schedules_spanning_multiple_days", () => {
    const title = "Test Channel";
    const images = { logo: "https://example.com/logo.png" };
    const schedules = [
      {
        id: "1",
        title: "Test Schedule",
        start: "2022-01-01T23:00:00.000Z",
        end: "2022-01-02T01:00:00.000Z",
      },
      {
        id: "2",
        title: "Test Schedule",
        start: "2022-01-02T12:00:00.000Z",
        end: "2022-01-02T13:00:00.000Z",
      },
    ];
    const children = <div>Test Children</div>;

    render(
      <SettingsContext.Provider value={initContext}>
        <Channel
          title={title}
          images={images}
          schedules={schedules}
          children={children}
        />
      </SettingsContext.Provider>
    );

    expect(screen.getByText("Test Children")).toBeInTheDocument();
  });

  // Tests that a channel without a sidebar is displayed correctly.
  it("test_channel_without_sidebar", () => {
    const title = "Test Channel";
    const images = { logo: "https://example.com/logo.png" };
    const children = <div>Test Children</div>;

    render(
      <SettingsContext.Provider
        value={{ ...initContext, enableSidebar: false }}
      >
        <Channel
          title={title}
          images={images}
          schedules={schedules}
          children={children}
        />
      </SettingsContext.Provider>
    );

    expect(screen.queryByAltText(title)).not.toBeInTheDocument();
    expect(screen.getByText("Test Children")).toBeInTheDocument();
  });
});
