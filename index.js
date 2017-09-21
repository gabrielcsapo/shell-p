const fs = require('fs');
const parse = require('bash-parser');
const traverse = require('bash-ast-traverser');

const shell = require('./lib/shell');

const parseAst = (ast) => {
    return traverse(ast, {
        Word: (node) => {
            Object.defineProperty(node, 'source', {
                get: () => node.text
            })
            return node;
        },
        AssignmentWord: (node) => {
            Object.defineProperty(node, 'source', {
                get: () => node.text
            })
            return node;
        },
        Command: (node) => {
            Object.defineProperty(node, 'source', {
                get: () => {
                    const suffix = node.suffix ? node.suffix.map(s => s.source).join(' ') : '';
                    const prefix = node.prefix ? node.prefix.map(s => s.source).join(' ') : '';
                    const name = node.name ? node.name.source : '';
                    return prefix + ' ' + name + ' ' + suffix;
                }
            });
            return node;
        },
        If: (node) => {
            Object.defineProperty(node, 'source', {
                get: () => {
                    const _clause = node.clause ? node.clause.commands.map(c => {
                        return c.source;
                    }).join(' ') : '';
                    const _then = node.then ? node.then.commands.map(c => {
                        return c.source;
                    }).join('\n') : '';
                    const _else = node.else ? node.else.commands.map(c => {
                        return c.source;
                    }).join(' ') : '';

                    return `if ${_clause}\nthen\n${_then}\nelse\n${_else}\nfi`
                }
            });
            return node;
        }
    });
}

module.exports = (file, options) => {
    const content = fs.readFileSync(file);
    const ast = parse(content.toString('utf8'));

    const parsed = [];

    parseAst(ast)['commands'].forEach((command) => {
        const immediate = command.prefix && command.prefix.map((p => p.type)).indexOf('AssignmentWord') > -1;
        parsed.push({ immediate: immediate, source: command.source.trim() });
    });

    return shell.execute(parsed, options);
}
