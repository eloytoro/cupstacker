const Incwrap = require('../');
const { expect } = require('chai');

describe('church numerals', () => {
  it('arithmetic', async () => {
    const church = Incwrap
      .wrap({
        add(m, n) {
          return f => x => n(f)(m(f)(x));
        },
        mult(m, n) {
          return f => x => n(m(f))(x);
        }
      })
      .unwrap({
        unchurch(fn, f, m) {
          return fn(f)(m)
        }
      })
      .initialValue(f => x => x)

    const one = f => x => f(x);
    const two = f => x => f(f(x));

    const result = church
      .add(one)
      .add(two)
      .mult(two)
      .mult(two)
      .add(two)
      .mult(two)
      .unchurch(n => n + 1, 0)

    expect(result).to.equal(28)
  });
});
