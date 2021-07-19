const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient({ region: 'us-east-2' });

const CHIRPS_TABLE = 'chirper_test';

// get all chirps
async function getChirps() {
  const params = { TableName: CHIRPS_TABLE };
  const allChirps = await ddb.scan(params, []).promise();
  const body = allChirps;

  return Promise.resolve(buildResponse(200, body));
}

async function getUserChirps(username) {
  const params = {
    TableName: CHIRPS_TABLE,
    IndexName: 'username-index',
    KeyConditionExpression: '#username = :username',
    ExpressionAttributeNames: {
      '#username': 'username',
    },
    ExpressionAttributeValues: {
      ':username': username,
    },
  };
  const userChirps = await ddb.query(params, []).promise();
  const body = userChirps;

  return Promise.resolve(buildResponse(200, body));
}

async function getChirp(timestamp) {
  const params = {
    TableName: CHIRPS_TABLE,
    Key: { timestamp: timestamp },
    KeyConditionExpression: '#timestamp = :timestamp',
    ExpressionAttributeNames: { '#timestamp': 'timestamp' },
    ExpressionAttributeValues: { ':timestamp': timestamp },
  };

  const chirp = await ddb.query(params, []).promise();
  const body = chirp;

  return Promise.resolve(buildResponse(200, body));
}

async function getReplies(timestamp) {
  const params = {
    TableName: CHIRPS_TABLE,
    Key: { timestamp: timestamp },
    KeyConditionExpression: '#timestamp = :timestamp',
    ProjectionExpression: 'comments',
    ExpressionAttributeNames: { '#timestamp': 'timestamp' },
    ExpressionAttributeValues: { ':timestamp': timestamp },
  };

  const chirp = await ddb.query(params, []).promise();
  const body = chirp;

  return Promise.resolve(buildResponse(200, body));
}

async function postChirp(chirp) {
  const params = {
    TableName: CHIRPS_TABLE,
    Item: {
      username: chirp.username,
      body: chirp.body,
      timestamp: chirp.timestamp,
      likes: ddb.createSet([' ']),
      comments: [{}],
    },
  };

  const res = await ddb.put(params).promise();
  return Promise.resolve(buildResponse(200, 'Chirp posted'));
}

// like a chirp
async function likeChirp(timestamp, username) {
  console.log(timestamp, username);
  const params = {
    TableName: CHIRPS_TABLE,
    Key: { timestamp: timestamp },
    UpdateExpression: 'ADD likes :likes',
    ExpressionAttributeValues: {
      ':likes': ddb.createSet([username]),
    },
    ReturnValues: 'UPDATED_NEW',
  };

  await ddb.update(params).promise();
  return Promise.resolve(buildResponse(200, 'Chirp liked.'));
}

// unlike a chirp
async function unlikeChirp(timestamp, username) {
  const params = {
    TableName: CHIRPS_TABLE,
    Key: { timestamp: timestamp },
    UpdateExpression: 'DELETE likes :likes',
    ExpressionAttributeValues: {
      ':likes': ddb.createSet([username]),
    },

    ReturnValues: 'UPDATED_NEW',
  };
  const res = await ddb.update(params).promise();
  return Promise.resolve(buildResponse(200, 'Chirp unliked.'));
}

// post comment
async function postComment(timestamp, comment) {
  const params = {
    TableName: 'tableName',
    Key: { timestamp: timestamp },
    UpdateExpression: 'SET comments = list_append(comments, :newComment)',
    ExpressionAttributeValues: {
      ':newComment': [{ comment }],
    },
    ReturnValues: 'UPDATED_NEW',
  };

  const res = await ddb.update(params).promise();
  return Promise.resolve(buildResponse(200, 'Comment posted.'));
}

function buildResponse(statusCode, body) {
  return {
    statusCode: statusCode,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };
}

module.exports = {
  getChirps,
  getUserChirps,
  getChirp,
  getReplies,
  postChirp,
  likeChirp,
  unlikeChirp,
  postComment,
  buildResponse,
};
