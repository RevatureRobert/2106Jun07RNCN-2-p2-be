const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();

exports.testChirp = {
  userImg: 'no',
  username: 'jester',
  body: 'Enzyme sucks',
  timestamp: 'now',
  comments: [],
  likes: docClient.createSet([' ']),
  media: 'yes'
};
