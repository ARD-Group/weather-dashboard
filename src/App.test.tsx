import React from "react";
import { render, screen } from "@testing-library/react";

test("renders mocked App component", () => {
  const MockedApp = () => <div>Mocked App</div>;

  render(<MockedApp />);
  expect(screen.getByText("Mocked App")).toBeInTheDocument();
});
