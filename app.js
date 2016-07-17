#!/usr/bin/env node
'use-strict';

const chalk = require('chalk');
const meow = require('meow');
const dash_button = require('node-dash-button');
const hueApi = require('node-hue-api').HueApi;

var lightState = require('node-hue-api').lightState.create()

const cli = meow(`
    Usage
      $ app.js <Dash Mac Address> <Hue Bridge Hostname> <Hue UserID>
    Options
      --help, -h  Print usage and exit

    Examples
      $ app.js 00:12:34:56:78:00
`, {
    alias: {
        h: 'help'
    }
});

var dash = dash_button(cli.input[0]);
var hueBridge = cli.input[1];
var hueUser = cli.input[2];

var displayResult = function (result) {
    console.log(chalk.green(timeStamp() + 'INFO: ' + JSON.stringify(result, null, 2)));
};

var displayError = function(err) {
    console.log(chalk.red(timestamp + 'ERROR: ' + err));
};

function timeStamp() {
    var date = new Date();
    var dateValues = [
        date.getFullYear(),
        date.getMonth()+1,
        date.getDate()
    ];
    var timeValues = [
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
    ];
    return '[' + dateValues.join('-') + ' ' + timeValues.join(':') + '] - '
};

var hueClient = new hueApi(hueBridge, hueUser);
var on = false;

console.log(chalk.green(timeStamp() + 'INFO: Starting dash-hue-bridge'));

dash.on('detected', function (dash_id) {
  console.log(chalk.green(timeStamp() + 'INFO: Click detected on Dash button: ' + dash_id));

  if (!on) {
      console.log(chalk.green(timeStamp() + 'INFO: Turning Lights Off'));
      hueClient.setGroupLightState(1, lightState.off())
          .then(displayResult)
          .fail(displayError)
          .done();
  } else {
      console.log(chalk.green(timeStamp() + 'INFO: Turning Lights On'));
      hueClient.setGroupLightState(1, lightState.hue(16356).bri(254).on())
          .then(displayResult)
          .fail(displayError)
          .done();
  }

  on = !on;
});
