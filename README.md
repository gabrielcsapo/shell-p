# shell-p

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

```json
[
    {
        "started": 1495520727838,
        "command": "HELLO=WORLD;",
        "stdout": "",
        "stderr": "",
        "ended": 1495520727846,
        "duration": 8
    },
    {
        "started": 1495520727846,
        "command": "echo hello world",
        "stdout": "hello world",
        "stderr": "",
        "ended": 1495520727847,
        "duration": 1
    },
    {
        "started": 1495520727847,
        "command": "# hey I am a comment",
        "stdout": "",
        "stderr": "",
        "ended": 1495520727847,
        "duration": 0
    },
    {
        "started": 1495520727847,
        "command": "ls -la",
        "stdout": "total 48\ndrwxr-xr-x   10 gacsapo  110191191   340 May 22 23:24 .\ndrwxr-xr-x  123 gacsapo  110191191  4182 May 22 23:24 ..\n-rw-r--r--    1 gacsapo  110191191    13 May 22 23:24 .gitignore\n-rw-r--r--    1 gacsapo  110191191   316 May 22 23:25 README.md\n-rw-r--r--    1 gacsapo  110191191  1342 May 22 23:20 index.js\ndrwxr-xr-x    3 gacsapo  110191191   102 May 22 14:10 lib\ndrwxr-xr-x   53 gacsapo  110191191  1802 May 22 21:37 node_modules\n-rw-r--r--    1 gacsapo  110191191   282 May 22 23:23 package.json\n-rw-r--r--    1 gacsapo  110191191   227 May 22 23:25 test.js\n-rwxr-xr-x    1 gacsapo  110191191   159 May 22 23:21 test.sh",
        "stderr": "",
        "ended": 1495520727854,
        "duration": 7
    },
    {
        "started": 1495520727854,
        "command": "if [ 1 ] ; \nthen\necho hello again world ; \nelse\necho nope ; \nfi\n",
        "stdout": "hello again world",
        "stderr": "",
        "ended": 1495520727854,
        "duration": 0
    },
    {
        "started": 1495520727854,
        "command": "echo \"$HELLO\"",
        "stdout": "WORLD",
        "stderr": "",
        "ended": 1495520727854,
        "duration": 0
    },
    {
        "started": 1495520727854,
        "command": "noop ",
        "stdout": "",
        "stderr": "/bin/bash: line 13: noop: command not found",
        "ended": 1495520727855,
        "duration": 1
    }
]
```
