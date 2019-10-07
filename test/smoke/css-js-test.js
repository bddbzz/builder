const glob = require('glob-all');

describe('Checking generated css js files', () => {
  it('should generated css js files', (done) => {
    const files = glob.sync(['./dist/search_*.css', './dist/search_*.js', './dist/index_*.css', './dist/index_*.js']);
    if (files.length) {
      done();
    } else {
      throw new Error('no css js files generated');
    }
  });
});
