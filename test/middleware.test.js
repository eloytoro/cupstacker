const incwrap = require('../');
const { expect } = require('chai');

describe('middleware', () => {
  it('bubbles operations through middlewares', async () => {
    const app = incwrap
      .wrap({
        plus: (next, n) => async (m) => await next(n) + m,
        surr: (next) => async (m) => `(${await next(m)})`
      })
      .unwrap({
        bubble: (fn, n) => fn(n)
      })
      .initialValue(n => n)

    const result = await app
      .surr()
      .plus('one')
      .surr()
      .plus('two')
      .surr()
      .bubble('three')

    expect(result).to.equal('(((one)two)three)')
  });
});
