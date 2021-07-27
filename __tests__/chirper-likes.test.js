const chirp = require('../src/handlers/chirper-chirps').chirperChirpsHandler;
const like = require('../src/handlers/chirper-likes').chirperLikesHandler;
const testChirp = require('./testChirp').testChirp;

it('should like a chirp', async (done) => {
  await chirp({
    httpMethod: 'POST',
    body: JSON.stringify(testChirp)
  });

  await like({
    httpMethod: 'PUT',
    resource: '/like/{timestamp}/{username}',
    pathParameters: {
      timestamp: 'now',
      username: 'jester III'
    }
  });

  let res = await chirp({
    httpMethod: 'GET'
  });

  expect(JSON.parse(res.body)[0].likes[1]).toMatch('jester III');

  await like({
    httpMethod: 'PUT',
    resource: '/unlike/{timestamp}/{username}',
    pathParameters: {
      timestamp: 'now',
      username: 'jester III'
    }
  });

  res = await chirp({
    httpMethod: 'GET'
  });

  expect(JSON.parse(res.body)[0].likes[1]).toBeUndefined();

  done();
});
