import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import NavBar from "./index";
import { usePathname } from "next/navigation";

// Mock the usePathname hook from next/navigation
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

describe("NavBar Component", () => {
  it('renders the Dashboard link with selected style when pathname includes "dashboard"', () => {
    usePathname.mockReturnValue("/dashboard");
    render(<NavBar />);

    const dashboardLink = screen.getByText("Dashboard");
    expect(dashboardLink).toHaveClass("selected");
    expect(dashboardLink).not.toHaveClass("nonSelected");
  });

  it('renders the Faturas link with selected style when pathname includes "invoices"', () => {
    usePathname.mockReturnValue("/invoices");
    render(<NavBar />);

    const invoicesLink = screen.getByText("Faturas");
    expect(invoicesLink).toHaveClass("selected");
    expect(invoicesLink).not.toHaveClass("nonSelected");
  });

  it('renders both links with nonSelected style when pathname does not include "dashboard" or "invoices"', () => {
    usePathname.mockReturnValue("/other");
    render(<NavBar />);

    const dashboardLink = screen.getByText("Dashboard");
    const invoicesLink = screen.getByText("Faturas");

    expect(dashboardLink).toHaveClass("nonSelected");
    expect(dashboardLink).not.toHaveClass("selected");
    expect(invoicesLink).toHaveClass("nonSelected");
    expect(invoicesLink).not.toHaveClass("selected");
  });
});
