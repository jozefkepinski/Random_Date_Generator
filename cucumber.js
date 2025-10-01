require('ts-node').register();

module.exports = {
  default: {
    require: [
      'features/support/**/*.ts',
      'step-definitions/**/*.ts'
    ],
    paths: ['features/**/*.feature'],
    format: ['./reporter.ts'],
    publishQuiet: true
  }
};
