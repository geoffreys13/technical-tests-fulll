function fizzBuzz(arg) {
  if (typeof arg != "number") {
    return;
  }

  const result = [];
  const restByThree = arg % 3;
  const restByFive = arg % 5;

  !restByThree && result.push("Fizz");
  !restByFive && result.push("Buzz");

  console.log(result.join("") || arg);
}

module.exports = fizzBuzz;
