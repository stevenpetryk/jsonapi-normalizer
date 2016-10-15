import { compose } from '../src/utils'

const add1 = a => a + 1
const add100 = a => a + 100

describe('compose', () => {
  it('composes a single function', () => {
    const composition = compose(add1)
    expect(composition(1)).toBe(2)
  })

  it('composes two function', () => {
    const composition = compose(add1, add100)
    expect(composition(1)).toBe(102)
  })
})
