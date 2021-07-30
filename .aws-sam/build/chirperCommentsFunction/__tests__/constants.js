const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();
const chirpHandler = require('../src/handlers/chirper-chirps').chirperChirpsHandler;

exports.configMockDatabase = {
  convertEmptyValues: true,
  ...(process.env.MOCK_DYNAMODB_ENDPOINT && {
    endpoint: process.env.MOCK_DYNAMODB_ENDPOINT,
    sslEnabled: false,
    region: "local",
  }),
}

exports.testChirp = {
  userImg: 'no',
  username: 'jester',
  body: 'Enzyme sucks',
  timestamp: 'now',
  comments: [],
  likes: docClient.createSet([' ']),
  media: 'yes'
};

exports.postChirp = async (chirp) => {
    await chirpHandler({
        httpMethod: 'POST',
        body: JSON.stringify(chirp)
    });
}

exports.getArrayOfChirps = async () => {
    const res = await chirpHandler({ httpMethod: 'GET' });
    return JSON.parse(res.body);
}