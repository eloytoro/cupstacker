# incwrap

A tool that helps you define incrementally executable logic with a final output.

## API

Its important to note that incwrap has an homoiconic API, which means that the way it declares
incremental logic is incremental itself, making the API more versatile and intuitive.

* `Echelon`: echelons are first class citizens of the incremental wrapping, they're the result of
a series (or none) of steps will be executed sequentially (in the same fashion as a `reduce` call)
passing the latest computed value to the next echelon and so forth. Each echelon has the same API
as the previous one, they all hold "wrapper" and "unwrapper" methods present in the chain.

* `Wrapper`: wrappers will act as steps in the sequential build order of the chain, when called they
return an `Echelon` in order to extend the chain.

* `Unwrapper`: unwrappers are the final step of the chain, when called they execute all of the
`Wrapper` methods that have been included in the chain so far and compute a final value.

* `incwrap.wrap(wrappers): incwrap`: implements all the methods passed in the `wrappers` object as
wrappers to the chain.

* `incwrap.unwrap(unwrappers): incwrap`: implements all the methods passed in the `unwrappers`
object as unwrappers to the chain.

* `incwrap.initialValue(value): Echelon`: Creates an Echelon that implements all of the wrappers and
inwrappers that have been declared in the chain.

## Example

Ice cream cones can be created by incrementally adding scoops to them before adding a topping,
which is the final step and the ice cream can no longer be incremented after that, thus returning
the ice cream as a value.

```javascript
import incwrap from 'incwrap';

const cone = incwrap
  .wrap({
    scoop(cone, flavor) {
      return { ...cone, scoops: [...cone.scoops, flavor] };
    }
  })
  .unwrap({
    topping(cone, topping) {
      return { ...cone, topping };
    }
  })
  .initialValue({ scoops: [], topping: '' });

// wraps a chocolate scoop
const basic = cone
  .scoop('chocolate');

// wraps more scoops in the chain
const holygrail = basic
  .scoop('coconut')
  .scoop('banana');

// unwraps into a javascript object
const perfection = holygrail
  .topping('cherry');

// { scoops: ['chocolate', 'coconut', 'banana'], topping: 'cherry' }
```
