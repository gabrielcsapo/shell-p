const spawn = require('child_process').spawn;

exports.execute = function(commands, options) {
  return new Promise((resolve) => {
    const output = [];
    const args = (options && options.args) || [];
    const cwd = (options && options.cwd) || './';
    const env = (options && options.env) || {};

    const sh = spawn('bash', args, {
      cwd,
      env
    });

    var currentCommand = -1;

    function cont() {
      currentCommand += 1;

      if(commands.length > 0) {
        const command = commands.shift();
        output[currentCommand] = {
          started: Date.now(),
          ended: 0,
          stdout: '',
          stderr: '',
          command
        }
        return sh.stdin.write(`${command}\n`);
      }
      sh.stdin.pause();
      sh.kill();
    }

    sh.stdout.on('data', function(data) {
      output[currentCommand].stdout = data.toString('utf8');
      output[currentCommand].ended = Date.now();
      output[currentCommand].duration = output[currentCommand].ended - output[currentCommand].started;
      cont();
    });

    sh.stderr.on('data', function(data) {
      output[currentCommand].stderr = data.toString('utf8');
      output[currentCommand].ended = Date.now();
      output[currentCommand].duration = output[currentCommand].ended - output[currentCommand].started;
      cont();
    });

    sh.on('exit', function () {
      resolve(output);
    });

    setTimeout(() => {
      cont();
    }, 100);
  });
};
