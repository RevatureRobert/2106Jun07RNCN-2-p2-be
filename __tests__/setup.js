const AWS = require('aws-sdk');
const configMockDatabase = require('./constants').configMockDatabase;

// use mock database instead of real database
AWS.config.update(configMockDatabase);