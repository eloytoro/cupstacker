const incwrap = require('../');
const { expect } = require('chai');

describe('memoize', () => {
  it('computes only once', () => {
    let count = 0;
    const SharedCounter = incwrap
      .wrap({
        inc() {
          count += 1;
        }
      })
      .unwrap({
        count() {
          return count;
        }
      })
      .initialValue({ c: 0 });

    const counter = SharedCounter
      .inc()
      .inc()
      .inc()
      .inc();

    expect(counter.count()).to.equal(4);
    expect(counter.inc().count()).to.equal(5);
    expect(counter.count()).to.equal(5);
  })
})
