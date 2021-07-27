const chirpHandler = require('../src/handlers/chirper-chirps');
const chirp = chirpHandler.chirperChirpsHandler;
const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();

const testChirp = {
    userImg: 'no',
    username: 'jester',
    body: 'Enzyme sucks',
    timestamp: 'now',
    comments: [],
    likes: docClient.createSet([' ']),
    media: 'yes',
};

it('should post a chirp', async () => {
    await chirp({
        httpMethod: 'POST',
        body: JSON.stringify(testChirp),
    });

    const res = await chirp( {httpMethod: 'GET'} );
    
    expect(JSON.parse(res.body)[0].body).toEqual(testChirp.body);
});