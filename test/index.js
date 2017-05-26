const test = require('tape');
const path = require('path');

const shell = require('../index');

test('shell-p', (t) => {
  t.plan(1);

  t.test('basic use case', (t) => {
    shell(path.resolve(__dirname, 'fixtures', 'test.sh'))
      .then((res) => {
        t.equal(res[0].command, 'HELLO=WORLD && echo "";');
        t.equal(res[0].stdout, '\n');
        t.equal(res[0].stderr, '');

        t.equal(res[1].command, 'echo hello world;');
        t.equal(res[1].stdout, 'hello world\n');
        t.equal(res[1].stderr, '');

        t.equal(res[2].command, 'ls -la;');
        t.ok(res[2].stdout);
        t.equal(res[2].stderr, '');

        t.equal(res[3].command, 'if [ 1 ]; \nthen\necho hello again world; \nelse\necho nope; \nfi\n');
        t.equal(res[3].stdout, 'hello again world\n');
        t.equal(res[3].stderr, '');

        t.equal(res[4].command, 'echo "$HELLO";');
        t.equal(res[4].stderr, '');

        t.equal(res[5].command, 'noop;');
        t.equal(res[5].stdout, '');
        t.ok(res[5].stderr.indexOf('noop: command not found') > -1);
        
        t.end();
      })
      .catch((err) => {
        t.fail(err);
      });
  });

});
