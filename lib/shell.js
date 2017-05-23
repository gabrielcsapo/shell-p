const async = require('async');
const StatefulProcessCommandProxy = require('stateful-process-command-proxy');

exports.series = function(commands, options) {
  return new Promise((resolve, reject) => {
    const output = [];
    const args = (options && options.args) || [];
    const cwd = (options && options.cwd) || './';
    const env = (options && options.env) || {};

    var statefulProcessCommandProxy = new StatefulProcessCommandProxy({
      logFunction: () => {
        // noop
      },
      processCommand: '/bin/bash',
      processArgs:  ['-s'].concat(args),
      processRetainMaxCmdHistory : 10,
      processInvalidateOnRegex : {
        'any': [{regex:'.*error.*',flags:'ig'}],
        'stdout': [{regex:'.*error.*',flags:'ig'}],
        'stderr': [{regex:'.*error.*',flags:'ig'}]
      },
      processCwd : cwd,
      processEnvMap : env,
      initCommands: [ 'echo "start"' ]
    });

    async.eachOfLimit(commands, 1, (command, index, callback) => {
      output[index] = {
        started: Date.now()
      }
      statefulProcessCommandProxy.executeCommand(command)
        .then(function(result) {
          Object.assign(output[index], result);
          output[index].ended = Date.now();
          output[index].duration = output[index].ended - output[index].started;
          callback();
        }).catch(function(error) {
          Object.assign(output[index], error);
          output[index].ended = Date.now();
          output[index].duration = output[index].ended - output[index].started;
          callback(error);
        });
    }, (err) => {
      statefulProcessCommandProxy.shutdown();
      if(err) {
        reject(err);
      } else {
        resolve(output);
      }
    })
  });
};
