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

const toarr = (val) => [].slice.call(val);

const once = (fn) => {
  let called = false;
  let memoized;
  return function () {
    if (!called) {
      called = true;
      memoized = fn.apply(this, arguments);
    }
    return memoized;
  }
};

const echelon = (wrap, unwrap, traverse) => {
  const ctx = Object.assign(
    map(wrap, method => function Wrapper() {
      return echelon.call(ctx, wrap, unwrap, once(() =>
        method.apply(ctx, [traverse.call(ctx)].concat(toarr(arguments)))
      ));
    }),
    map(unwrap, unwrap => function Unwrapper() {
      return unwrap.apply(ctx, [traverse.call(ctx)].concat(toarr(arguments)));
    })
  );
  return ctx;
};

const incwrap = echelon({
  wrap(builder, wrap) {
    return update(builder, 'wrap', wrap);
  },
  unwrap(builder, unwrap) {
    return update(builder, 'unwrap', unwrap);
  }
}, {
  initialValue(builder, initialValue) {
    return echelon(
      builder.wrap,
      builder.unwrap,
      () => initialValue
    );
  }
}, () => ({ wrap: {}, unwrap: {} }));

module.exports = incwrap;
