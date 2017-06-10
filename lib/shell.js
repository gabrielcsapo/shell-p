const spawn = require('child_process').spawn;

exports.execute = function(commands) {
  return new Promise((resolve) => {
    const sh = spawn('bash')
    const output = [];

    var currentCommand = -1;

    function cont() {
      currentCommand += 1;

      if(commands.length > 0) {
        const command = commands.shift();
        const source = command.source;
        const immediate = command.immediate;

        output[currentCommand] = {
          started: Date.now(),
          ended: 0,
          stdout: '',
          stderr: '',
          command: source
        }
        sh.stdin.write(`${source}\n`);
        if(immediate) {
            output[currentCommand].stdout = '';
            output[currentCommand].ended = Date.now();
            output[currentCommand].duration = output[currentCommand].ended - output[currentCommand].started;
            return cont();
        } else {
            return;
        }
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
      output[currentCommand].stderr = data && data.toString('utf8');
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
