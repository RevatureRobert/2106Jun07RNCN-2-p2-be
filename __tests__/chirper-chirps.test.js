const chirpsHandler = require('../src/handlers/chirper-chirps.js');
const chirps = chirpsHandler.chirperChirpsHandler;

it('puts a chirp', () => {
  let newChirpBody = {
    userImg: 'no',
    username: 'jester',
    body: 'This should never, ever be seen by anybody ever.',
    timestamp: 'yesterday',
    media: 'yes'
  };

  chirps({
    httpMethod: 'POST',
    body: newChirpBody
  });

  expect(chirps({ httpMethod: 'GET' })).toContain(newChirpBody);
});
