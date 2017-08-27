'use strict';

const readMultipleFiles = require('.');
const test = require('tape');

const expected = [
  Buffer.from('node_modules\ncoverage\n'),
  Buffer.from('* text=auto\n')
];

test('readMultipleFiles()', t => {
  t.plan(7);

  t.equal(readMultipleFiles.name, 'readMultipleFiles', 'should have a function name.');

  readMultipleFiles(['.gitattributes'], 'hex', (err, contents) => {
    t.deepEqual(
      [err, contents],
      [null, [expected[1].toString('hex')]],
      'should reflect file encoding to the result.'
    );
  });

  readMultipleFiles([], (err, contents) => {
    t.deepEqual(
      [err, contents],
      [null, []],
      'should pass an empty array to the callback when it takes an empty array.'
    );
  });

  t.throws(
    () => readMultipleFiles([]),
    /TypeError.* is not a function.*Last argument/,
    'should throw a type error when the last argument is not a function.'
  );

  t.throws(
    () => readMultipleFiles('test.js', t.fail),
    /TypeError.* is not an array.*must be an array/,
    'should throw a type error when the first argument is not an array.'
  );

  t.throws(
    () => readMultipleFiles(['test.js', ['index.js']], t.fail),
    /TypeError.*path/,
    'should throw a type error when the array contains non-string values.'
  );

  t.throws(
    () => readMultipleFiles(['test.js'], {encoding: 'utf7'}, t.fail),
    /Unknown encoding/,
    'should throw an error when it takes an invalid fs.readFile option.'
  );
});
