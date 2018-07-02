const incwrap = require('../');
const { expect } = require('chai');

describe('context', () => {
  it('can access wrappers', () => {
    const Arithmetic = incwrap
      .wrap({
        mult(n, m) {
          return n * m;
        },
        sqr(n) {
          return this.mult(n, n).float();
        }
      })
      .unwrap({
        float(n) {
          return n;
        },
        int(n) {
          return n|0;
        },
        str() {
          return this.int().toString();
        }
      })
      .initialValue(1)
    const val = Arithmetic
      .mult(4.5)
      .sqr()
      .sqr()

    const int = val.int();
    const str = val.str();
    expect(int).to.equal(410);
    expect(str).to.equal('410')
  });
});
