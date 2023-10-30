const fizzBuzz = require("../fizzBuzz.js");

describe("suit test of fizzBuzz function", () => {
  let consoleLogSpy;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  test("Should display 'Fizz' if 3 can be divided by 3", () => {
    const sut = fizzBuzz;

    sut(3);

    expect(consoleLogSpy).toHaveBeenCalledWith("Fizz");
  });

  test("Should display 'Fizz' if 9 can be divided by 3", () => {
    const sut = fizzBuzz;

    sut(9);

    expect(consoleLogSpy).toHaveBeenCalledWith("Fizz");
  });

  test("Should display 'Buzz' if 5 can be divided by 5", () => {
    const sut = fizzBuzz;

    sut(5);

    expect(consoleLogSpy).toHaveBeenCalledWith("Buzz");
  });

  test("Should display 'Buzz' if 10 can be divided by 5", () => {
    const sut = fizzBuzz;

    sut(10);

    expect(consoleLogSpy).toHaveBeenCalledWith("Buzz");
  });

  test("Should display 'FizzBuzz' if 15 can be divided by 3 and 5", () => {
    const sut = fizzBuzz;

    sut(15);

    expect(consoleLogSpy).toHaveBeenCalledWith("FizzBuzz");
  });

  test("Should display 'FizzBuzz' if 30 can be divided by 3 and 5", () => {
    const sut = fizzBuzz;

    sut(30);

    expect(consoleLogSpy).toHaveBeenCalledWith("FizzBuzz");
  });

  test("Should display 7 if 7 can't be divided by 3 or 5", () => {
    const sut = fizzBuzz;

    sut(7);

    expect(consoleLogSpy).toHaveBeenCalledWith(7);
  });

  test("Should display 17 if 17 that can't be divided by 3 or 5", () => {
    const sut = fizzBuzz;

    sut(17);

    expect(consoleLogSpy).toHaveBeenCalledWith(17);
  });

  test("Should display nothing if 'jeSuisUneString' is not an number", () => {
    const sut = fizzBuzz;

    sut("jeSuisUneString");

    expect(consoleLogSpy).not.toHaveBeenCalled();
  });

  test("Should display nothing if true is not an number", () => {
    const sut = fizzBuzz;

    sut(true);

    expect(consoleLogSpy).not.toHaveBeenCalled();
  });
});
