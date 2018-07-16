const incwrap = require('../');
const { expect } = require('chai');

describe('middleware', () => {
  it('bubbles operations through middlewares', async () => {
    const app = incwrap
      .wrap({
        plus(next, value) {
          return async (prevValue) => await next(value) + prevValue;
        },
        surr(next) {
          return async (prevValue) => `(${await next(prevValue)})`;
        }
      })
      .unwrap({
        bubble(fn, n) {
          return fn(n)
        }
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
