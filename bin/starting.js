var program = require('commander');
var cli = require('../lib/cli');
var config = require('../package.json');

program
	.version(config.version)
	.usage('<command> [options]');

program
	.command('run <path>')
	.description('Start a front service')
	.action(function (path) {
		bingo = true;
		cli.run(program.running, function() {
			console.log('[i] Press [Ctrl+C] to stop ' + name + '...');
		});
	});

program
	.command('start <path>')
	.description('Start a background service')
	.action(function (path) {
		bingo = true;
		cli.start(getConfig(), function(alreadyInRunning) {
			console.log('[!] ' + name + ( alreadyInRunning ? ' is running.' : ' started.'));
		});
	});

program
	.command('stop <path>')
	.description('Stop current background service')
	.action(function (path) {
		bingo = true;
		cli.stop(program.running, function() {
			console.log('[!] ' + name + ' started.');
		});
	});

program
	.command('restart <path>')
	.description('Restart current background service')
	.action(function (path) {
		bingo = true;
		cli.restart(getConfig(), function(err) {
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
	.command('help')
	.description('Display help information')
	.action(function () {
		bingo = true;
		program.help();
	});

program
	.option('-m, --main [path]', 'main file path', String, undefined)
	.option('-l, --log [pth]', 'log', String, undefined)
	.option('-r, --running [path]', 'running config file', String, undefined)
	.parse(process.argv);

function getConfig() {
	return {
		main: program.main,
		name: config.name,
		version: config.version,
		log: program.log,
		running: program.running
	}
}

