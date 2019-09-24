const map = (source, mapper) =>
  Object.keys(source).reduce(
    (target, key) => Object.assign(target, { [key]: mapper(source[key], key) }),
    {}
  );

const update = (source, key, value) => Object.assign(
  {},
  source,
  { [key]: Object.assign({}, source[key], value) }
);

const defaultWrap = {};
const defaultUnwrap = {};

const EchelonFactory = (wrap, unwrap, initialValue) => {
  class Echelon {
    constructor(traverse) {
      this.$incwrap = { traverse };
    }
  }

  if (unwrap === defaultUnwrap) {
    unwrap = { unwrap: val => val };
  }

  Object.assign(
    Echelon.prototype,
    map(wrap, method => function Wrapper(...args) {
      return new Echelon(() =>
        method.call(this, this.$incwrap.traverse.call(this), ...args)
      );
    }),
    map(unwrap, unwrap => function Unwrapper(...args) {
      return unwrap.call(this, this.$incwrap.traverse.call(this), ...args);
    })
  );

  return new Echelon(() => initialValue);
}

const Incwrap = EchelonFactory({
  wrap(builder, wrap) {
    return update(builder, 'wrap', wrap);
  },
  unwrap(builder, unwrap) {
    return update(builder, 'unwrap', unwrap);
  }
}, {
  initialValue(builder, initialValue) {
    return EchelonFactory(builder.wrap, builder.unwrap, initialValue);
  }
}, { wrap: defaultWrap, unwrap: defaultUnwrap });

module.exports = Incwrap;
