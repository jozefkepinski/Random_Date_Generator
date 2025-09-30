module.exports = {
  default: [
    '--require-module ts-node/register',
    '--require step-definitions/**/*.ts',
    'features/**/*.feature'
  ].join(' ')
};
