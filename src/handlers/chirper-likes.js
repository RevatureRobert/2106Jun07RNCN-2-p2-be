const dynamodb = require('aws-sdk/clients/dynamodb');
const tableName = process.env.TABLE || 'chirper';
const docClient = new dynamodb.DocumentClient();
let express = require('express');
let cors = require('cors');

let app = express();
app.use(cors());

const likePath = '/like/{timestamp}/{username}';
const unlikePath = '/unlike/{timestamp}/{username}';

/**
 * MAIN HANDLER
 */
exports.chirperLikesHandler = async (event) => {
  console.info('received:', event);
  if (event.httpMethod === 'PUT' && event.resource === likePath) {
    return likeChirp(
      event.pathParameters.timestamp,
      event.pathParameters.username
    );
  } else if (event.httpMethod === 'PUT' && event.resource === unlikePath) {
    return unlikeChirp(
      event.pathParameters.timestamp,
      event.pathParameters.username
    );
  }
};

/**
 * LIKE A CHIRP
 */
async function likeChirp(timestamp, username) {
  const params = {
    TableName: tableName,
    Key: { timestamp: timestamp },
    UpdateExpression: 'ADD likes :likes',
    ExpressionAttributeValues: {
      ':likes': docClient.createSet([username]),
    },
    ReturnValues: 'UPDATED_NEW',
  };

  await docClient.update(params).promise();
  return Promise.resolve(buildResponse(200, 'Chirp liked.'));
}

/**
 * UNLIKE A CHIRP
 */
async function unlikeChirp(timestamp, username) {
  const params = {
    TableName: tableName,
    Key: { timestamp: timestamp },
    UpdateExpression: 'DELETE likes :likes',
    ExpressionAttributeValues: {
      ':likes': docClient.createSet([username]),
    },

    ReturnValues: 'UPDATED_NEW',
  };

  await docClient.update(params).promise();
  return Promise.resolve(buildResponse(200, 'Chirp unliked.'));
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
