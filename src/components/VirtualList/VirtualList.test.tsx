import { render, screen } from "@testing-library/react";
import VirtualList from "./VirtualList";
import React from "react";
import { Schedule } from "../../types";

describe("VirtualList_function", () => {
  const data: Schedule[] = [
    {
      id: "1",
      title: "Test",
      start: new Date().toLocaleDateString(),
      end: new Date().toLocaleDateString(),
    },
    {
      id: "2",
      title: "Test 2",
      start: new Date().toLocaleDateString(),
      end: new Date().toLocaleDateString(),
    },
  ];

  // Tests that the VirtualList component renders without errors.
  it("test_renders_component_without_errors", () => {
    render(
      <VirtualList<Schedule> data={data} parentRef={React.createRef()}>
        {(data) => <div>{data.title}</div>}
      </VirtualList>
    );

    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  // Tests that the component handles the case when parentRef is null.
  it("test_parent_ref_is_null", () => {
    render(
      <VirtualList<Schedule> data={data} parentRef={null}>
        {(data) => <div>{data.title}</div>}
      </VirtualList>
    );

    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  // Tests that the component renders the correct number of items.
  it("test_renders_correct_number_of_items", () => {
    render(
      <VirtualList<Schedule> data={data} parentRef={React.createRef()}>
        {(data) => <div>{data.title}</div>}
      </VirtualList>
    );

    expect(screen.getAllByText("Test")).toHaveLength(1);
  });
});
