# shell-p

[![Build Status](https://travis-ci.org/gabrielcsapo/shell-p.svg?branch=master)](https://travis-ci.org/gabrielcsapo/shell-p)
[![Dependency Status](https://david-dm.org/gabrielcsapo/shell-p.svg)](https://david-dm.org/gabrielcsapo/shell-p)
[![devDependency Status](https://david-dm.org/gabrielcsapo/shell-p/dev-status.svg)](https://david-dm.org/gabrielcsapo/shell-p#info=devDependencies)
[![Coverage Status](https://node-coverage-server.herokuapp.com/badge/github%2Ecom/gabrielcsapo/shell-p.svg)](https://node-coverage-server.herokuapp.com/coverage/github%2Ecom/gabrielcsapo/shell-p)
[![npm](https://img.shields.io/npm/dt/shell-p.svg?maxAge=2592000)]()
[![npm](https://img.shields.io/npm/dm/shell-p.svg?maxAge=2592000)]()

> Introspect on the most time consuming part of your shell script

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
        "started": 1495838098184,
        "ended": 1495838098185,
        "stdout": "\n",
        "stderr": "",
        "command": "HELLO=WORLD && echo \"\";",
        "duration": 1
    },
    {
        "started": 1495838098185,
        "ended": 1495838098186,
        "stdout": "hello world\n",
        "stderr": "",
        "command": "echo hello world;",
        "duration": 1
    },
    {
        "started": 1495838098186,
        "ended": 1495838098199,
        "stdout": "total 80\ndrwxr-xr-x   17 gacsapo  110191191   578 May 26 15:33 .\ndrwxr-xr-x  124 gacsapo  110191191  4216 May 26 12:55 ..\n-rw-r--r--    1 gacsapo  110191191  6148 May 24 13:01 .DS_Store\n-rw-r--r--    1 gacsapo  110191191    34 May 23 10:16 .eslintignore\n-rw-r--r--    1 gacsapo  110191191    88 May 23 09:23 .eslintrc\ndrwxr-xr-x   14 gacsapo  110191191   476 May 26 15:34 .git\n-rw-r--r--    1 gacsapo  110191191    58 May 26 15:14 .gitignore\ndrwxr-xr-x    4 gacsapo  110191191   136 May 26 15:33 .nyc_output\n-rw-r--r--    1 gacsapo  110191191   284 May 23 10:11 .travis.yml\n-rw-r--r--    1 gacsapo  110191191    52 May 26 15:30 CHANGELOG.md\n-rw-r--r--    1 gacsapo  110191191  3099 May 23 10:14 README.md\ndrwxr-xr-x    4 gacsapo  110191191   136 May 23 10:51 coverage\n-rw-r--r--    1 gacsapo  110191191  1464 May 26 15:29 index.js\ndrwxr-xr-x    3 gacsapo  110191191   102 May 22 14:10 lib\ndrwxr-xr-x  292 gacsapo  110191191  9928 May 26 15:01 node_modules\n-rw-r--r--    1 gacsapo  110191191   494 May 26 15:29 package.json\ndrwxr-xr-x    4 gacsapo  110191191   136 May 23 10:43 test\n",
        "stderr": "",
        "command": "ls -la;",
        "duration": 13
    },
    {
        "started": 1495838098199,
        "ended": 1495838098199,
        "stdout": "hello again world\n",
        "stderr": "",
        "command": "if [ 1 ]; \nthen\necho hello again world; \nelse\necho nope; \nfi\n",
        "duration": 0
    },
    {
        "started": 1495838098199,
        "ended": 1495838098200,
        "stdout": "WORLD\n",
        "stderr": "",
        "command": "echo \"$HELLO\";",
        "duration": 1
    },
    {
        "started": 1495838098200,
        "ended": 1495838098201,
        "stdout": "",
        "stderr": "bash: line 12: noop: command not found\n",
        "command": "noop;",
        "duration": 1
    }
]
```

## Known Bugs

- Does not work with shell functions
