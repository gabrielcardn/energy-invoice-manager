// __tests__/Table.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Table from "./index";

// Mock CSS module
jest.mock("./Table.module.css", () => ({
  container: "container",
  clickable: "clickable",
}));

describe("Table Component", () => {
  const columns = [
    { id: 1, value: "Name" },
    { id: 2, value: "Age" },
  ];

  const rows = [
    {
      id: 1,
      cells: [
        { id: 1, value: "John", clickable: false },
        { id: 2, value: 30, clickable: true },
      ],
    },
    {
      id: 2,
      cells: [
        { id: 1, value: "Alice", clickable: true },
        { id: 2, value: 25, clickable: false },
      ],
    },
  ];

  const onCellClick = jest.fn();

  it("renders the table with the correct columns and rows", () => {
    render(<Table columns={columns} rows={rows} onCellClick={onCellClick} />);

    const table = screen.getByRole("table");
    const tableRows = screen.getAllByRole("row");
    const tableCells = screen.getAllByRole("cell");

    expect(table).toBeInTheDocument();
    expect(tableRows.length).toBe(rows.length + 1); // Header row + data rows
    expect(tableCells.length).toBe(columns.length * rows.length); // Header cells + data cells
  });

  it("renders the table with clickable cells having the correct class", () => {
    render(<Table columns={columns} rows={rows} onCellClick={onCellClick} />);

    const clickableCells = screen.getAllByText(/30|Alice/);

    clickableCells.forEach((cell) => {
      expect(cell).toHaveClass("clickable");
    });
  });

  it("calls onCellClick when a clickable cell is clicked", () => {
    render(<Table columns={columns} rows={rows} onCellClick={onCellClick} />);

    fireEvent.click(screen.getByText("John"));
    expect(onCellClick).not.toHaveBeenCalled();

    fireEvent.click(screen.getByText("30"));
    expect(onCellClick).toHaveBeenCalledTimes(1);
    expect(onCellClick).toHaveBeenCalledWith(rows[0], 2);

    fireEvent.click(screen.getByText("Alice"));
    expect(onCellClick).toHaveBeenCalledTimes(2);
    expect(onCellClick).toHaveBeenCalledWith(rows[1], 1);
  });
});
