import { fireEvent, render, screen } from "@testing-library/react";
import SelectableCard from "./SelectableCard";

const emitCheckChange = jest.fn();

describe("Tests suites for SelectableCard component", () => {
  test("Should not display checkbox when SelectableCard is not editable", () => {
    render(
      <SelectableCard
        id={0}
        selected={false}
        allowEdit={false}
        children={null}
        emitCheckChange={emitCheckChange}
      ></SelectableCard>
    );

    const checkbox = screen.queryByRole("checkbox");
    expect(checkbox).not.toBeInTheDocument();
  });

  test("Should display checkbox when SelectableCard is editable", () => {
    render(
      <SelectableCard
        id={0}
        selected={false}
        allowEdit={true}
        children={null}
        emitCheckChange={emitCheckChange}
      ></SelectableCard>
    );

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
  });

  test("Should display unchecked checkbox when SelectableCard is not selected", () => {
    render(
      <SelectableCard
        id={0}
        selected={false}
        allowEdit={true}
        children={null}
        emitCheckChange={emitCheckChange}
      ></SelectableCard>
    );

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();
  });

  test("Should display checked checkbox when SelectableCard is selected", () => {
    render(
      <SelectableCard
        id={0}
        selected={true}
        allowEdit={true}
        children={null}
        emitCheckChange={emitCheckChange}
      ></SelectableCard>
    );

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeChecked();
  });

  test("Should emit event when SelectableCard chekbox change", () => {
    render(
      <SelectableCard
        id={0}
        selected={false}
        allowEdit={true}
        children={null}
        emitCheckChange={emitCheckChange}
      ></SelectableCard>
    );

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(emitCheckChange).toHaveBeenCalledTimes(1);
  });
});
