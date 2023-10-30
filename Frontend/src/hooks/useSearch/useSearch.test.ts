import { act, renderHook } from "@testing-library/react";
import useSearch from "./useSearch.hook";

test("useFetch fetches data correctly", async () => {
  global.fetch = jest.fn().mockImplementation(async () => ({
    ok: true,
    json: jest.fn().mockReturnValue("mocked data"),
  }));

  let customValue: any;
  const { result } = renderHook(() =>
    useSearch<{ data: string }>("prefix", "searchQuery")
  );
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));

    customValue = result;
  });

  const data = customValue.current.data;
  const loading = customValue.current.loading;
  const error = customValue.current.error;

  expect(data).toBe("mocked data");
  expect(loading).toBeFalsy();
  expect(error).toBeNull();
});

test("useFetch emit error correctly", async () => {
  global.fetch = jest.fn().mockRejectedValue(new Error("Search error"));

  let customValue: any;
  const { result } = renderHook(() =>
    useSearch<{ data: string }>("prefix", "searchQuery")
  );
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));

    customValue = result;
  });

  const data = customValue.current.data;
  const loading = customValue.current.loading;
  const error = customValue.current.error;

  expect(error.message).toBe("Search error");
  expect(data).toBeNull();
  expect(loading).toBeFalsy();
});

test("useFetch sets loading to true during the fetch", async () => {
  let customValue: any;

  global.fetch = jest.fn().mockImplementation(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          ok: true,
          json: jest.fn().mockReturnValue("mocked data"),
        });
      }, 1000);
    });
  });

  const { result } = renderHook(() =>
    useSearch<{ data: string }>("prefix", "searchQuery")
  );

  customValue = result;

  const data = customValue.current.data;
  const loading = customValue.current.loading;
  const error = customValue.current.error;

  expect(loading).toBeTruthy();
  expect(data).toBeNull();
  expect(error).toBeNull();
});
