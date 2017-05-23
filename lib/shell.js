const async = require('async');
const StatefulProcessCommandProxy = require('stateful-process-command-proxy');

exports.series = function(commands, options) {
  return new Promise((resolve, reject) => {
    const output = [];

    var statefulProcessCommandProxy = new StatefulProcessCommandProxy({
      name: "test",
      max: 2,
      min: 2,
      idleTimeoutMS: 10000,
      logFunction: function(severity,origin,msg) {
        // noop
      },
      processCommand: '/bin/bash',
      processArgs:  ['-s'],
      processRetainMaxCmdHistory : 10,
      processInvalidateOnRegex : {
        'any':[{regex:'.*error.*',flags:'ig'}],
        'stdout':[{regex:'.*error.*',flags:'ig'}],
        'stderr':[{regex:'.*error.*',flags:'ig'}]
      },
      processCwd : './',
      processEnvMap : {"testEnvVar":"value1"},
      processUid : null,
      processGid : null,
      initCommands: [ 'echo "start"' ],
      validateFunction: function(processProxy) {
          return processProxy.isValid();
      },
      preDestroyCommands: [ 'echo This ProcessProxy is being destroyed!' ]
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
      if(err) {
        reject(err);
      } else {
        resolve(output);
      }
      statefulProcessCommandProxy.shutdown();
    })
  });
};
