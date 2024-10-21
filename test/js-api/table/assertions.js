function assert_equal_to_array(table, expected, message, index = "i32") {
  function idx(i) {
    return index === "i64" ? BigInt(i) : i;
  }

  assert_equals(table.length, idx(expected.length), `${message}: length`);
  // The argument check in get() happens before the range check, and negative numbers
  // are illegal, hence will throw TypeError per spec.
  assert_throws_js(TypeError, () => table.get(idx(-1)), `${message}: table.get(-1)`);
  for (let i = 0; i < expected.length; ++i) {
    assert_equals(table.get(idx(i)), expected[i], `${message}: table.get(${i} of ${expected.length})`);
  }
  assert_throws_js(RangeError, () => table.get(idx(expected.length)),
                   `${message}: table.get(${expected.length} of ${expected.length})`);
  assert_throws_js(RangeError, () => table.get(idx(expected.length + 1)),
                   `${message}: table.get(${expected.length + 1} of ${expected.length})`);
}

function assert_Table(actual, expected, address = "i32") {
  assert_equals(Object.getPrototypeOf(actual), WebAssembly.Table.prototype,
                "prototype");
  assert_true(Object.isExtensible(actual), "extensible");

  assert_equals(actual.length, expected.length, "length");
  for (let i = address === "i64" ? 0n : 0; i < expected.length; ++i) {
    assert_equals(actual.get(i), null, `actual.get(${i})`);
  }
}
