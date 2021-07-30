const AWS = require('aws-sdk');
const dynamodb = require('aws-sdk/clients/dynamodb');
const tableName = process.env.TABLE || 'chirper';
let express = require('express');
let cors = require('cors');

let app = express();
app.use(cors());

const config_test = {
  convertEmptyValues: true,
  ...(process.env.MOCK_DYNAMODB_ENDPOINT && {
    endpoint: process.env.MOCK_DYNAMODB_ENDPOINT,
    sslEnabled: false,
    region: 'local',
  }),
};

if (process.env.NODE_ENV === 'test') {
  AWS.config.update(config_test);
}

const docClient = new dynamodb.DocumentClient();
const chirpsPath = '/';
const chirpPath = '/{timestamp}';

/**
 * MAIN HANDLER
 */
exports.chirperChirpsHandler = async (event) => {
  console.info('received:', event);
  if (event.httpMethod === 'GET' && event.resource === chirpsPath) {
    return getAllChirps();
  } else if (event.httpMethod === 'GET' && event.resource === chirpPath) {
    return getChirp(event.pathParameters.timestamp);
  } else if (event.httpMethod === 'POST' && event.resource === chirpsPath) {
    return postChirp(JSON.parse(event.body));
  } else if (event.httpMethod === 'DELETE' && event.resource === chirpPath) {
    return deleteChirp(event.pathParameters.timestamp);
  }
};

/**
 * GET ALL CHIRPS
 */
async function getAllChirps() {
  var params = {
    TableName: tableName,
  };
  const data = await docClient.scan(params).promise();
  const items = data.Items;
  return buildResponse(200, items);
}

/**
 * GET A CHIRP
 */
async function getChirp(timestamp) {
  var params = {
    TableName: tableName,
    KeyConditionExpression: '#timestamp = :timestamp',
    ExpressionAttributeNames: { '#timestamp': 'timestamp' },
    ExpressionAttributeValues: { ':timestamp': timestamp },
  };

  const data = await docClient.query(params).promise();
  const items = data.Items;
  return buildResponse(200, items);
}

/**
 * POST A CHIRP
 */
async function postChirp(chirp) {
  const params = {
    TableName: tableName,
    Item: {
      userImg: chirp.userImg,
      username: chirp.username,
      body: chirp.body,
      timestamp: chirp.timestamp,
      likes: docClient.createSet([' ']),
      comments: [],
      media: chirp.media,
    },
  };
  await docClient.put(params).promise();
  return Promise.resolve(buildResponse(200, 'Chirp posted'));
}

/**
 * DELETE A CHIRP
 */
async function deleteChirp(timestamp) {
  const params = {
    TableName: tableName,
    Key: { timestamp: timestamp },
    ConditionExpression: '#timestamp = :timestamp',
    ExpressionAttributeNames: { '#timestamp': 'timestamp' },
    ExpressionAttributeValues: { ':timestamp': timestamp },
  };

  await docClient.delete(params).promise();
  return Promise.resolve(buildResponse(200, 'Chirp has been deleted.'));
}

/**
 * RESPONSE BUILDER FOR LAMBDA PROXY
 */
function buildResponse(statusCode, body) {
  return {
    statusCode: statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };
}
