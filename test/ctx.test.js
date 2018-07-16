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
          return this.mult(n).float();
        }
      })
      .unwrap({
        float(n) {
          return n;
        },
        double() {
          return this.mult(2).int();
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

    expect(val.int()).to.equal(410);
    expect(val.str()).to.equal('410');
    expect(val.double()).to.equal(820);
  });
});
