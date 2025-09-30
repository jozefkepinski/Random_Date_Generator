module.exports = {
  default: [
    '--require-module ts-node/register',
    '--require step-definitions/**/*.ts',
    '--publish-quiet',
    'features/**/*.feature'
  ].join(' ')
};
