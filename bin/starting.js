#! /usr/bin/env node

var program = require('commander');
var path = require('path');
var cli = require('../lib/cli');
var config = require('../package.json');
var name = config.name;

program
.version(config.version)
.usage('<command> [options]');

program
.command('run <path>')
.description('Start a front service')
.action(function (main) {
bingo = true;
cli.run(path.resolve(main), {command: program.command}, function() {
console.log('[i] Press [Ctrl+C] to stop ' + name + '...');
});
});

program
.command('start <path>')
.description('Start a background service')
.action(function (main) {
bingo = true;
cli.start(path.resolve(main), {command: program.command}, function(alreadyInRunning) {
console.log('[!] ' + name + ( alreadyInRunning ? ' is running.' : ' started.'));
});
});

program
.command('stop <path>')
.description('Stop current background service')
.action(function () {
bingo = true;
cli.stop(path.resolve(main), function(err) {
if (err === true) {
console.log('[i] ' + name + ' killed.');
} else if (err) {
err.code === 'EPERM' ? console.log('[!] Cannot kill ' + name + ' owned by root.\n' +
'    Try to run command with `sudo`.')
: console.log('[!] %s', err.message);
} else {
console.log('[!] No running ' + name + '.');
}
});
});

program
.command('restart <path>')
.description('Restart current background service')
.action(function (main) {
bingo = true;
cli.restart(path.resolve(main), function(err) {
console.log('[!] ' + name + ' started.');
});
});

program
.command('help')
.description('Display help information')
.action(function () {
bingo = true;
program.help();
});

program
.option('-c, --command <command>', 'command parameters ("node --harmony")', String, undefined)
.option('-l, --log [pth]', 'log', String, undefined)
.option('-r, --running [path]', 'running config file', String, undefined)
.parse(process.argv);


