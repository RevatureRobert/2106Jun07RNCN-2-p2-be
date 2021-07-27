const chirp = require('../src/handlers/chirper-chirps').chirperChirpsHandler;
const testChirp = require('./testChirp').testChirp;

it('should post a chirp', async (done) => {
  await chirp({
    httpMethod: 'POST',
    body: JSON.stringify(testChirp)
  });

  let res = await chirp({ httpMethod: 'GET' });

  expect(JSON.parse(res.body)[0].body).toEqual(testChirp.body);

  await chirp({ httpMethod: 'DELETE', pathParameters: { timestamp: 'now' } });
  res = await chirp({ httpMethod: 'GET' });
  expect(JSON.parse(res.body)[0]).toBeUndefined();

  done();
});
