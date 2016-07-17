#!/usr/bin/env node
'use-strict';

const chalk = require('chalk');
const meow = require('meow');
const dash_button = require("node-dash-button");

const cli = meow(`
    Usage
      $ app.js <Mac Address>
    Options
      --help, -h  Print usage and exit

    Examples
      $ app.js 00:12:34:56:78:00
`, {
    alias: {
        h: 'help'
    }
});

var mac_address = cli.input[0];

var dash = dash_button(mac_address);

console.log(chalk.blue('Attempting to use dash button at: ' + mac_address));

dash.on('detected', function (dash_id) {
  console.log(chalk.blue('Dash button ' + dash_id + ' was clicked!'));
});
