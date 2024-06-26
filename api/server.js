// build your server here and require it from index.js
const express = require('express');
const server = express();
server.use(express.json());

const resourceRoutes = require('./resource/router');
const projectRoutes = require('./project/router');
const taskRoutes = require('./task/router');

server.use('/api/resources', resourceRoutes);
server.use('/api/projects', projectRoutes);
server.use('/api/tasks', taskRoutes);

module.exports = server;