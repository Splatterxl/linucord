"use strict";
exports.__esModule = true;
exports.client = void 0;
var Discord = require('discord.js');
exports.client = new Discord.Client();
var ready_1 = require("./handlers/events/bot/ready");
var message_1 = require("./handlers/events/guild/message");
exports.client.on('ready', ready_1["default"]);
exports.client.on('message', message_1["default"]);
