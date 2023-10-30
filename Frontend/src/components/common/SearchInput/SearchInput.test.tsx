import { fireEvent, render, screen } from "@testing-library/react";
import SearchInput from "./SearchInput";

const searchChange = jest.fn((value: string) => value);

describe("Tests suites for SearchInput component", () => {
  test("Should display the correct search input on SearchInput", () => {
    render(<SearchInput onSearchChange={searchChange} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Test" } });

    expect(input).toHaveValue("Test");
  });

  test("Should emit event input of SearchInput change", () => {
    render(<SearchInput onSearchChange={searchChange} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Test" } });

    expect(searchChange).toHaveBeenCalledTimes(1);
  });
});
