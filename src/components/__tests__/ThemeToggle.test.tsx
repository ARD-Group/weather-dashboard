import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeToggle } from "../ThemeToggle";
import { ThemeProvider } from "../ThemeProvider";

// Mock the Switch component
jest.mock("../../web-building-blocks/Atoms", () => ({
  Switch: ({
    onCheckedChange,
    label,
  }: {
    onCheckedChange: () => void;
    label: string;
  }) => (
    <button data-testid="Switch-1-input" onClick={onCheckedChange}>
      {label}
    </button>
  ),
}));

// Mock the theme state
jest.mock("jotai", () => ({
  atom: jest.fn(),
  useAtom: jest.fn(() => ["light", jest.fn()]),
}));

// Mock the ThemeProvider
jest.mock("../ThemeProvider", () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="theme-provider">{children}</div>
  ),
  useTheme: () => ({
    theme: "light",
    setTheme: jest.fn(),
  }),
}));

describe("ThemeToggle", () => {
  let setTheme: jest.Mock;

  beforeEach(() => {
    setTheme = jest.fn();
    jest
      .spyOn(require("jotai"), "useAtom")
      .mockImplementation(() => ["light", setTheme]);
    jest
      .spyOn(require("../ThemeProvider"), "useTheme")
      .mockImplementation(() => ({
        theme: "light",
        setTheme,
      }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render with initial theme", () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    expect(screen.getByText("Light Mode")).toBeInTheDocument();
  });

  it("should toggle theme when switch is clicked", () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    const switchElement = screen.getByTestId("Switch-1-input");
    fireEvent.click(switchElement);

    expect(setTheme).toHaveBeenCalledWith("dark");
  });

  it("should toggle back to light mode when clicked again", () => {
    jest
      .spyOn(require("../ThemeProvider"), "useTheme")
      .mockImplementation(() => ({
        theme: "dark",
        setTheme,
      }));

    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    const switchElement = screen.getByTestId("Switch-1-input");
    fireEvent.click(switchElement);

    expect(setTheme).toHaveBeenCalledWith("light");
  });
});
