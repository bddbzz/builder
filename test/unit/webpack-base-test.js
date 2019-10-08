const assert = require('assert');

describe('webpack.base.js test case', () => {
  const baseConfig = require('../../lib/webpack.base');

  it('entry', () => {
    assert.ok(baseConfig.entry.index.includes('smoke/template/src/pages/index/index.js'));
  });
});
