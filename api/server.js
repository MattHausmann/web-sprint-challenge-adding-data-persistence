// build your server here and require it from index.js
const express = require('express');
const server = express();
server.use(express.json());

const resourceRoutes = require('./resource/router');

server.use('/api/resources', resourceRoutes);

module.exports = server;