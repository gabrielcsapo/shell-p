const fs = require('fs');
const parse = require('shell-parse');
const shell = require('./lib/shell');

module.exports = (file, options) => {
  const content = fs.readFileSync(file);
  const commands = parse(content.toString('utf8'))
  const parsed = [];

  commands.forEach((command) => {
    console.log(command);

    switch(command.type) {
      case 'command':
        if(command.command.value == '#!/bin/sh') {
          return;
        }
        parsed.push(`${command.command.value} ${command.args.map((arg) => arg.value || `"$${arg.name}"`).join(' ')}`)
        break;
      case 'ifElse':
        let d = `if `;
        command.test.forEach((t) => {
          d += `${t.command} ${t.args.map((arg) => arg.value).join(' ')} ${t.control} \n`
        })
        d += 'then\n';
        command.body.forEach((b) => {
          d += `${b.command.value} ${b.args.map((arg) => arg.value).join(' ')} ${b.control} \n`
        })
        d += 'else\n';
        command.elseBody.forEach((b) => {
          d += `${b.command.value} ${b.args.map((arg) => arg.value).join(' ')} ${b.control} \n`
        })
        d += 'fi\n';
        parsed.push(d);
        break;
      case 'variableAssignment':
        parsed.push(`${command.name}=${command.value.value}${command.control}`)
        break;
    }
  });
  return shell.series(parsed, options);
}
