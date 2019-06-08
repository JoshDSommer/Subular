module.exports = {
  name: 'subular3',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/subular3',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
