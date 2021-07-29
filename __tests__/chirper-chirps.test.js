const chirp = require('../src/handlers/chirper-chirps').chirperChirpsHandler;
const testChirp = require('./testChirp').testChirp;

const chirpPath = '/{timestamp}';
const chirpsPath = '/';

it('should post a chirp', async (done) => {
  await chirp({
    httpMethod: 'POST',
    body: JSON.stringify(testChirp),
    resource: chirpsPath,
  });

  let res = await chirp({ 
    httpMethod: 'GET',
    resource: chirpsPath,
  });

  expect(JSON.parse(res.body)[0].body).toEqual(testChirp.body);

  res = await chirp({ 
    httpMethod: 'GET',
    resource: chirpPath,
    pathParameters: {timestamp: 'now'},
  });
  
  await chirp({ 
    httpMethod: 'DELETE',
    pathParameters: { timestamp: 'now' },
    resource: chirpPath,
  });

  res = await chirp({ 
    httpMethod: 'GET',
    resource: chirpsPath,
  });

  expect(JSON.parse(res.body)[0]).toBeUndefined();

  done();
});
