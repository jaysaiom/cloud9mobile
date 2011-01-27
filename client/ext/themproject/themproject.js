/**
 * The-M-Project Module for the Cloud9 IDE
 *
 * @copyright 2011, M-WAY Solutions GmbH
 * @license GPLv3 <http://www.gnu.org/licenses/gpl.txt>
 */

define(function (require, exports, module) {

    var ide = require('core/ide');
    var ext = require('core/ext');
    var util = require("core/util");

    var markup = require('text!ext/themproject/themproject.xml');
    var espresso = require("ext/themproject/espressomachine");

    return ext.register('ext/themproject/themproject', {
        name: 'The M Project',
        dev: 'M-WAY Solutions GmbH',
        alone: true,
        type: ext.GENERAL,
        markup: markup,

        commands: {
          'newmproject': { hint: 'create new M-project' }
        },

        newmproject: function () {
          var filef = filefield.value; 
          var paramf = paramfield.value; 
          this.wizard.hide();
          espresso.espresso(filef, paramf, false);
        },

        nodes: [],

        hook: function () {
          var _self = this;
          this.nodes.push(
            mnuFile.appendChild(new apf.item({
                  caption : "New M-Project",
                  onclick : function () {
                    ext.initExtension(_self);
                    _self.wizard.show();
                  }
                }))
          );
        },

        init: function () {
          this.wizard = wizard;
        },

        stop: function () {
          espresso.stop();
        },

        enable: function () {
          this.nodes.each(function (item) {
              item.enable();
            });
        },

        disable: function () {
          this.nodes.each(function (item) {
              item.disable();
            });
        },

        destroy: function () {
          this.nodes.each(function (item) {
              item.destroy(true, true);
            });
          this.nodes = [];
          this.wizard.destroy(true, true);
        }

      });

  });
