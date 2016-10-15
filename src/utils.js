export function compose (...functions) {
  return (input) => {
    functions.forEach(func => input = func(input))
    return input
  }
}
