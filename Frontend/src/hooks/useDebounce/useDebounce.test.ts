import { act, renderHook } from "@testing-library/react";
import useDebounce from "./useDebounce.hook";

jest.useFakeTimers();

test("Should set new value after the default 500ms delay", () => {
  const { result } = renderHook(() => useDebounce("initial"));

  expect(result.current.debouncedValue).toBe("initial");

  act(() => {
    result.current.setValue("new");
  });

  expect(result.current.debouncedValue).toBe("initial");

  act(() => {
    jest.advanceTimersByTime(500);
  });

  expect(result.current.debouncedValue).toBe("new");
});

test("Should set new value after the 1000ms delay passed in parameter", () => {
  const { result } = renderHook(() => useDebounce("initial", 1000));

  expect(result.current.debouncedValue).toBe("initial");

  act(() => {
    result.current.setValue("new");
  });

  expect(result.current.debouncedValue).toBe("initial");

  act(() => {
    jest.advanceTimersByTime(1000);
  });

  expect(result.current.debouncedValue).toBe("new");
});
