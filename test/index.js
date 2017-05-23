const test = require('tape');
const path = require('path');

const shell = require('../index');

test('shell-p', (t) => {
  t.plan(1);

  t.test('basic use case', (t) => {
    shell(path.resolve(__dirname, 'fixtures', 'test.sh'))
      .then((res) => {
        t.equal(res[0].command, 'HELLO=WORLD;');
        t.equal(res[0].stdout, '');
        t.equal(res[0].stderr, '');

        t.equal(res[1].command, 'echo hello world;');
        t.equal(res[1].stdout, 'hello world');
        t.equal(res[1].stderr, '');

        t.equal(res[2].command, '# hey I am a comment;');
        t.equal(res[2].stdout, '');
        t.equal(res[2].stderr, '');

        t.equal(res[3].command, 'ls -la;');
        t.ok(res[3].stdout);
        t.equal(res[3].stderr, '');

        t.equal(res[4].command, 'if [ 1 ]; \nthen\necho hello again world; \nelse\necho nope; \nfi\n');
        t.equal(res[4].stdout, 'hello again world');
        t.equal(res[4].stderr, '');

        t.equal(res[5].command, 'echo "$HELLO";');
        t.equal(res[5].stdout, 'WORLD');
        t.equal(res[5].stderr, '');

        t.equal(res[6].command, 'noop;');
        t.equal(res[6].stdout, '');
        t.equal(res[6].stderr, '/bin/bash: line 13: noop: command not found');

        t.end();
      })
      .catch((err) => {
        t.fail(err);
      });
  });

});
