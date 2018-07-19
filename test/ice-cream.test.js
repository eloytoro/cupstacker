const Incwrap = require('../');
const { expect } = require('chai');

describe('ice cream', () => {
  it('builds an ice cream cone', () => {
    const cone = Incwrap
      .wrap({
        scoop: ({ scoops }, flavor) => ({ scoops: scoops.concat(flavor) }),
      })
      .unwrap({
        topping: (cone, topping) => ({ ...cone, topping })
      })
      .initialValue({ scoops: [], topping: '' })

    const basic = cone
      .scoop('chocolate')

    const holygrail = basic
      .scoop('coconut')
      .scoop('banana')

    const perfection = holygrail
      .topping('cherry');

    const ruined = holygrail
      .topping('sprinkles');

    const enthusiast = basic
      .scoop('chocolate')
      .scoop('chocolate')
      .topping('chocolate chip');

    const disgrace = basic
      .scoop('rum & raisins')
      .topping('peanuts');

    expect(perfection).to.eql({
      scoops: ['chocolate', 'coconut', 'banana'],
      topping: 'cherry'
    });
    expect(ruined).to.eql({
      scoops: ['chocolate', 'coconut', 'banana'],
      topping: 'sprinkles'
    });
    expect(enthusiast).to.eql({
      scoops: ['chocolate', 'chocolate', 'chocolate'],
      topping: 'chocolate chip'
    });
    expect(disgrace).to.eql({
      scoops: ['chocolate', 'rum & raisins'],
      topping: 'peanuts'
    });
  })
});
