const AWS = require('aws-sdk');
const action = require('./dao');

const tableName = 'chirper_chirps';
const healthPath = '/health';
const chirpsPath = '/chirps';
const userPath = '/chirps/{username}';
const chirpPath = '/chirps/{username}/{timestamp}';
const repliesPath = '/chirps/{username}/{timestamp}/replies';
const likePath = '/chirps/like/{timestamp}/{username}';
const unlikePath = '/chirps/unlike/{timestamp}/{username}';

exports.handler = async (event) => {
  console.log('Request event: ', event);
  // TODO implement
  let response;

  // get all chirps
  if (event.httpMethod === 'GET' && event.resource === chirpsPath) {
    response = action.getChirps();
    // get chirps by user
  } else if (event.httpMethod === 'GET' && event.resource === userPath) {
    response = action.getUserChirps(event.pathParameters.username);
    // get one chrip
  } else if (event.httpMethod === 'GET' && event.resource === chirpPath) {
    response = action.getChirp(event.pathParameters.timestamp);
    // get replies
  } else if (event.httpMethod === 'GET' && event.resource === repliesPath) {
    response = action.getReplies(event.pathParameters.timestamp);
    // like a chirp
  } else if (event.httpMethod === 'PUT' && event.resource === likePath) {
    response = action.likeChirp(
      event.pathParameters.timestamp,
      event.pathParameters.username
    );
    // unlike a chirp
  } else if (event.httpMethod === 'PUT' && event.resource === unlikePath) {
    response = action.unlikeChirp(
      event.pathParameters.timestamp,
      event.pathParameters.username
    );
    // post a chirp
  } else if (event.httpMethod === 'POST' && event.resource === chirpsPath) {
    response = action.postChirp(JSON.parse(event.body));
    // check health
  } else if (event.httpMethod === 'GET' && event.path === healthPath) {
    response = action.buildResponse(200, 'hey');
    // post a comment
  } else if (event.httpMethod === 'PUT' && event.resource === repliesPath) {
    response = action.postComment(
      event.pathParameters.timestamp,
      JSON.parse(event.body)
    );
  }

  return response;
};
