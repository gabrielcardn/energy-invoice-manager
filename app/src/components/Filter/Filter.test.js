import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Filter from "./index";

describe("Filter Component", () => {
  const title = "Filter Options";
  const options = ["Option 1", "Option 2", "Option 3"];
  const placeholder = "Select an option";
  const initialValue = "Option 1";
  const onSubmit = jest.fn();

  it("renders the component with the given title and placeholder", () => {
    render(
      <Filter
        title={title}
        options={options}
        onSubmit={onSubmit}
        placeholder={placeholder}
        initialValue={initialValue}
      />
    );

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByDisplayValue(initialValue)).toBeInTheDocument();
  });

  it("renders the options correctly", () => {
    render(
      <Filter
        title={title}
        options={options}
        onSubmit={onSubmit}
        placeholder={placeholder}
        initialValue={initialValue}
      />
    );

    // Simulate opening the select dropdown
    fireEvent.click(screen.getByDisplayValue(initialValue));

    options.forEach((option) => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });

  it("calls onSubmit with the selected option", () => {
    render(
      <Filter
        title={title}
        options={options}
        onSubmit={onSubmit}
        placeholder={placeholder}
        initialValue={initialValue}
      />
    );

    const select = screen.getByDisplayValue(initialValue);

    // Simulate changing the select value
    fireEvent.change(select, { target: { value: "Option 2" } });

    expect(onSubmit).toHaveBeenCalledWith("Option 2");
    expect(select.value).toBe("Option 2");
  });

  it("displays the placeholder when no initial value is provided", () => {
    render(
      <Filter title={title} options={options} onSubmit={onSubmit} placeholder={placeholder} />
    );

    expect(screen.getByText(placeholder)).toBeInTheDocument();
  });
});
