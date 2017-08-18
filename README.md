# activerules-read-files 

A [Node](https://nodejs.org/) module to read multiple files asynchronously - MISSING FILES WILL BE IGNORED

```javascript
const multipleFiles = require('activerules-read-files');

multipleFiles(['one.txt', 'another.txt'], (err, bufs) => {
  if (err) {
    throw err;
  }

  bufs; //=> [<Buffer ... >, <Buffer ... >]
});
```

## Installation

[Use npm.](https://docs.npmjs.com/cli/install)

```
npm install activerules-read-files
```

## API

```javascript
const multipleFiles = require('activerules-read-files');
```

### multipleFiles(*paths* [, *options*], *callback*)

*paths*: `Array` of `String` (file paths)  
*options*: `Object` ([fs.readFile] options) or `String` (encoding)  
*callback*: `Function`

#### callback(*error*, *contents*)

*error*: `Error` if it fails to read at least one of the files, otherwise `null`  
*contents*: `Array` of `Buffer` or `String` (according to `encoding` option)

The second argument will be an array of file contents. The order of contents follows the order of file paths. 

It automatically strips [UTF-8 byte order mark](https://en.wikipedia.org/wiki/Byte_order_mark#UTF-8) from results.

```javascript
const readMultipleFiles = require('read-multiple-files');

// foo.txt: Hello
// bar.txt: World

readMultipleFiles(['foo.txt', 'bar.txt'], 'utf8', (err, contents) => {
  if (err) {
    throw err;
  }

  contents; //=> ['Hello', 'World']
});
```

If it fails to read at least one of the files, it passes an error to the first argument and doesn't pass any values to the second argument.

```javascript
const multipleFiles = require('activerules-read-files');

// foo.txt: exists
// bar.txt: doesn't exist
// baz.txt: exists

multipleFiles(['foo.txt', 'bar.txt', 'baz.txt'], (err, contents) => {
  err.code; //=> 'ENOENT'
  contents; //=> undefined
  arguments.length; //=> 1
});
```

## Related project

* [activerules-read-files-promise](https://github.com/bwinkers/activerules-read-files-promise) ([Promises/A+](https://promisesaplus.com/) version)

## License

Copyright (c) 2017 - Brian Winkers

Licensed under [the MIT License](./LICENSE).

[fs.readFile]: https://nodejs.org/api/fs.html#fs_fs_readfile_filename_options_callback
