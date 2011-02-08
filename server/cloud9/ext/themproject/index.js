/**
 * Build tool module for the-m-project
 *
 * @copyright 2010, M-WAY Solutions GmbH
 */
var Plugin = require("cloud9/plugin");
var Fs = require("fs");
var Path = require("path");
var Async = require("async");
var Sys = require("sys");

var TheMProject = module.exports = function (ide) {
  this.ide = ide;
  this.hooks = ["command"];
  this.name = "themproject";
};

Sys.inherits(TheMProject, Plugin);

(function () {

    this._getParameters = function (message) {
      var node = process.argv[0];
      var espresso = [__dirname + '/espresso/m-init.js'];
      var params = message.argv.slice(1);
      var dirIndex = params.indexOf('-d');

      console.log('index: ' + dirIndex);

      if (dirIndex !== -1) {
        params[dirIndex + 1] = this.ide.workspaceDir + params[dirIndex + 1];
      } else {
        params = params.concat(['-d', this.ide.workspaceDir]);
      }

      return espresso.concat(params);
    };

    this.command = function (user, message, client) {
      if (!this[message.command]) {
        return false;
      }
      this[message.command](message);

      return true;
    };

    /*
     this.$commandHints = function (commands, message, callback) {
     console.dir(commands);
     callback();
   };
   */

    this.espresso = function (message) {
      var self = this;
      var params = this._getParameters(message);

      this.spawnCommand('node', params, message.cwd, null, null, function (code, err, out) {

          self.sendResult(0, message.command, {
              code: code,
              argv: message.argv,
              err: err,
              out: out
            });
        });
    };

  }).call(TheMProject.prototype);
