module.exports = function () {
  return {
    files: [
      'src/**/*.json',
      'src/**/*.js',
      '!src/**/*.test.js',
      '!src/index.js',
      '!src/scripts/seed.js',
    ],

    tests: [
      'src/**/*.test.js'
    ],

    env: {
      type: 'node'
    },
    delays: {
      run: 300
    },
    workers: {
      recycle: true
    }
  };
};