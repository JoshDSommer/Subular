module.exports = {
  name: 'web-login',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/web-login',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
