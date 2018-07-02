const map = (source, mapper) =>
  Object.keys(source).reduce(
    (target, key) => ({ ...target, [key]: mapper(source[key], key) }),
    {}
  );

const update = (source, key, value) => Object.assign(
  {},
  source,
  { [key]: Object.assign({}, source[key], value) }
);

const echelon = function (wrap, unwrap, traverse) {
  return Object.assign(
    map(wrap, method => function Wrapper(...params) {
      return echelon.call(this, wrap, unwrap, () => method.call(this, traverse.call(this), ...params));
    }),
    map(unwrap, unwrap => function Unwrapper(...params) {
      return unwrap.call(this, traverse.call(this), ...params);
    })
  );
}

const incwrap = echelon({
  wrap(builder, wrap) {
    return update(builder, 'wrap', wrap);
  },
  unwrap(builder, unwrap) {
    return update(builder, 'unwrap', unwrap);
  }
}, {
  initialValue(builder, initialValue) {
    return echelon.call(this,
      builder.wrap,
      builder.unwrap,
      () => initialValue
    );
  }
}, () => ({ wrap: {}, unwrap: {} }));

module.exports = incwrap;
