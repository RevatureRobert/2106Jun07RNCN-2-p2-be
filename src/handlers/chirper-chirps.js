const dynamodb = require('aws-sdk/clients/dynamodb');
const tableName = process.env.TABLE;
const docClient = new dynamodb.DocumentClient();

// main handler for chirper-chirps
exports.chirperChirpsHandler = async (event) => {
  console.info('received:', event);
  if (event.httpMethod === 'GET') {
    return getAllChirps();
  } else if (event.httpMethod === 'POST'){
    return postChirp(JSON.parse(event.body));
  } else if (event.httpMethod === 'DELETE'){
    return deleteChirp(event.pathParameters.timestamp);
  }
};

/**
 * GET ALL CHIRPS
 */
async function getAllChirps(){
  var params = {
    TableName: tableName,
  };
  const data = await docClient.scan(params).promise();
  const items = data.Items;
  return buildResponse(200, items);
}

/**
 * POST A CHIRP
 */
async function postChirp(chirp){
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
  }
  await docClient.put(params).promise();
  return Promise.resolve(buildResponse(200, 'Chirp posted'));
}

/**
 * DELETE A CHIRP
 */
 async function deleteChirp(timestamp){
  const params = {
      TableName: tableName,
      Key: {"timestamp": timestamp },
      ConditionExpression: '#timestamp = :timestamp',
      ExpressionAttributeNames: {"#timestamp": "timestamp"},
      ExpressionAttributeValues: {":timestamp": timestamp }
  }
      
  await docClient.delete(params).promise();
  return Promise.resolve(buildResponse(200, 'Chirp has been deleted.'));
}

function buildResponse(statusCode, body){
  return {
      statusCode: statusCode,
      headers: {
          'Access-Control-Allow-Origin': '*', 
          'Access-Control-Allow-Headers': '*', 
          'Access-Control-Allow-Methods': '*',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
  }
}
