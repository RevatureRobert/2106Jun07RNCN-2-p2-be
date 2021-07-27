const dynamodb = require('aws-sdk/clients/dynamodb');
const tableName = process.env.TABLE || 'chirper';
const docClient = new dynamodb.DocumentClient();

const commentsPath = '/{timestamp}/comments';
const deleteCommentPath = '/{timestamp}/comments/{cmttimestamp}';

/**
 * MAIN HANDLER
 */
exports.chirperCommentsHandler = async (event) => {
  console.info('received:', event);
  if (event.httpMethod === 'PUT' && event.resource === commentsPath) {
    return postComment(event.pathParameters.timestamp, JSON.parse(event.body));
  } else if (
    event.httpMethod === 'DELETE' &&
    event.resource === deleteCommentPath
  ) {
    return deleteComment(
      event.pathParameters.timestamp,
      event.pathParameters.cmttimestamp
    );
  } else if (event.httpMethod === 'GET' && event.resource === commentsPath) {
    return getComments(event.pathParameters.timestamp);
  }
};

/**
 * GET COMMENTS TO FIND INDEX ON DELETE
 */
async function getComments(timestamp) {
  const params = {
    TableName: tableName,
    Key: { timestamp: timestamp },
    KeyConditionExpression: '#timestamp = :timestamp',
    ExpressionAttributeNames: { '#timestamp': 'timestamp' },
    ExpressionAttributeValues: { ':timestamp': timestamp },
    ProjectionExpression: 'comments'
  };

  const chirp = await docClient.query(params, []).promise();
  return Promise.resolve(buildResponse(200, chirp));
}

/**
 * GET COMMENTS TO FIND INDEX ON DELETE
 */
async function getComment(timestamp) {
  const params = {
    TableName: tableName,
    Key: { timestamp: timestamp },
    KeyConditionExpression: '#timestamp = :timestamp',
    ExpressionAttributeNames: { '#timestamp': 'timestamp' },
    ExpressionAttributeValues: { ':timestamp': timestamp },
    ProjectionExpression: 'comments'
  };

  const chirp = await docClient.query(params, []).promise();
  return Promise.resolve(chirp.Items[0].comments);
}

/**
 * POST COMMENT
 */
async function postComment(timestamp, comment) {
  const params = {
    TableName: tableName,
    Key: { timestamp: timestamp },
    UpdateExpression: 'SET comments = list_append(comments, :newComment)',
    ExpressionAttributeValues: {
      ':newComment': comment
    },
    ReturnValues: 'UPDATED_NEW'
  };

  await docClient.update(params).promise();
  return Promise.resolve(buildResponse(200, 'Comment posted.'));
}

/**
 * DELETE COMMENT
 */
async function deleteComment(timestamp, cmtTimestamp) {
  const comments = await getComment(timestamp);
  const index = comments.findIndex((x) => x.timestamp === cmtTimestamp);

  const params = {
    TableName: tableName,
    Key: { timestamp: timestamp },
    ConditionExpression: '#timestamp = :timestamp',
    UpdateExpression: `REMOVE comments[${index}]`,
    ExpressionAttributeNames: { '#timestamp': 'timestamp' },
    ExpressionAttributeValues: { ':timestamp': timestamp }
  };

  await docClient.update(params).promise();
  return Promise.resolve(buildResponse(200, 'Comment has been deleted.'));
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
      'Access-Control-Allow-Methods': '*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  };
}
