const app = require('express')();
const httpServer = require('http').Server(app);
const axios = require('axios');
const io = require('socket.io')(httpServer);
const client = require('socket.io-client');

const socketActions = require('./constants');
const socketListeners = require('./socketListeners');
const { PORT } = process.env;
const BlockChain = require('./DiVoChain');

const Nexa = new BlockChain();
