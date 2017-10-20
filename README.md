# shell-p

> 🐚 Introspect on the most time consuming part of your shell script

[![Npm Version](https://img.shields.io/npm/v/shell-p.svg)](https://www.npmjs.com/package/shell-p)
[![Build Status](https://travis-ci.org/gabrielcsapo/shell-p.svg?branch=master)](https://travis-ci.org/gabrielcsapo/shell-p)
[![Dependency Status](https://starbuck.gabrielcsapo.com/badge/github/gabrielcsapo/shell-p/status.svg)](https://starbuck.gabrielcsapo.com/github/gabrielcsapo/shell-p)
[![devDependency Status](https://starbuck.gabrielcsapo.com/badge/github/gabrielcsapo/shell-p/dev-status.svg)](https://starbuck.gabrielcsapo.com/github/gabrielcsapo/shell-p#info=devDependencies)
[![Coverage Status](https://lcov-server.gabrielcsapo.com/badge/github%2Ecom/gabrielcsapo/shell-p.svg)](https://lcov-server.gabrielcsapo.com/coverage/github%2Ecom/gabrielcsapo/shell-p)
[![npm](https://img.shields.io/npm/dt/shell-p.svg?maxAge=2592000)]()
[![npm](https://img.shields.io/npm/dm/shell-p.svg?maxAge=2592000)]()

# What is this?

```javascript
const shell = require('./index');
const path = require('path');

shell(path.resolve(__dirname, './test.sh'))
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
```

### output

```json
[
    {
        "started": 1505969831167,
        "ended": 1505969831167,
        "stdout": "",
        "stderr": "",
        "command": "HELLO=WORLD",
        "duration": 0
    },
    {
        "started": 1505969831167,
        "ended": 1505969831168,
        "stdout": "hello world\n",
        "stderr": "",
        "command": "echo hello world",
        "duration": 1
    },
    {
        "started": 1505969831168,
        "ended": 1505969831174,
        "stdout": "total 64\ndrwxr-xr-x   16 gabrielcsapo  staff   512 Sep 20 21:56 .\ndrwx------@  58 gabrielcsapo  staff  1856 Sep 19 18:24 ..\n-rw-r--r--    1 gabrielcsapo  staff    34 May 26 21:55 .eslintignore\n-rw-r--r--    1 gabrielcsapo  staff    88 May 26 21:55 .eslintrc\ndrwxr-xr-x   16 gabrielcsapo  staff   512 Sep 20 21:57 .git\n-rw-r--r--    1 gabrielcsapo  staff    58 May 26 21:55 .gitignore\ndrwxr-xr-x    4 gabrielcsapo  staff   128 Jun 10 13:28 .nyc_output\n-rw-r--r--    1 gabrielcsapo  staff   264 Sep 18 21:36 .travis.yml\n-rw-r--r--    1 gabrielcsapo  staff    85 Jun 15 23:22 CHANGELOG.md\n-rw-r--r--    1 gabrielcsapo  staff  3524 Sep 18 21:36 README.md\ndrwxr-xr-x    4 gabrielcsapo  staff   128 Jun 10 13:28 coverage\n-rw-r--r--    1 gabrielcsapo  staff  2242 Sep 20 21:56 index.js\ndrwxr-xr-x    3 gabrielcsapo  staff    96 Jun 15 23:22 lib\ndrwxr-xr-x  272 gabrielcsapo  staff  8704 Sep 20 21:47 node_modules\n-rw-r--r--    1 gabrielcsapo  staff   530 Sep 20 21:47 package.json\ndrwxr-xr-x    4 gabrielcsapo  staff   128 Jun 15 23:22 test\n",
        "stderr": "",
        "command": "ls -la",
        "duration": 6
    },
    {
        "started": 1505969831175,
        "ended": 1505969831176,
        "stdout": "hello again world\nanother hello!\n",
        "stderr": "",
        "command": "if  [ 1 ]\nthen\n echo hello again world\n echo another hello!\nelse\n echo nope\nfi",
        "duration": 1
    },
    {
        "started": 1505969831176,
        "ended": 1505969831176,
        "stdout": "WORLD\n",
        "stderr": "",
        "command": "echo \"$HELLO\"",
        "duration": 0
    },
    {
        "started": 1505969831176,
        "ended": 1505969831177,
        "stdout": "",
        "stderr": "bash: line 12: noop: command not found\n",
        "command": "noop",
        "duration": 1
    }
]
```

## Known Bugs

- Does not work with shell functions
