#!/usr/bin/env node
'use-strict';

const chalk = require('chalk');
const meow = require('meow');
const dash_button = require('node-dash-button');
const hue_api = require('node-hue-api').HueApi;

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

var dash_mac_address = cli.input[0];
var hue_bridge = cli.input[1];
var hue_user = cli.input[2];
var dash = dash_button(dash_mac_address);

var display_result = function (result) {
    console.log(chalk.green(JSON.stringify(result, null, 2)));
};

var display_error = function(err) {
    console.log(chalk.red(err));
};

var hue = new hue_api(hue_bridge, hue_user);
var state = require('node-hue-api').lightState.create()
var on = false

dash.on('detected', function (dash_id) {
  console.log(chalk.blue('Dash button ' + dash_id + ' was clicked!'));

  if (!on) {
      // Turn lights off
      hue.setGroupLightState(1, state.off())
          .then(display_result)
          .fail(display_error)
          .done();
  } else {
      // Turn Lights On
      hue.setGroupLightState(1, state.hue(16356).bri(254).on())
          .then(display_result)
          .fail(display_error)
          .done();
  }

  on = !on;
});
