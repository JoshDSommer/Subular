module.exports = {
  name: 'mobile-login',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/mobile-login',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
