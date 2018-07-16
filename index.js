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

const EchelonFactory = (wrap, unwrap, initialValue) => {
  class Echelon {
    constructor(traverse) {
      this._traverse = traverse;
    }
  }

  Object.assign(
    Echelon.prototype,
    map(wrap, method => function Wrapper(...args) {
      return new Echelon(() =>
        method.call(this, this._traverse(), ...args)
      );
    }),
    map(unwrap, unwrap => function Unwrapper(...args) {
      return unwrap.call(this, this._traverse(), ...args);
    })
  );

  return new Echelon(() => initialValue);
}

const incwrap = EchelonFactory({
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
}, { wrap: {}, unwrap: {} });

module.exports = incwrap;
