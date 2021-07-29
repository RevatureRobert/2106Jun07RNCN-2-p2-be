const chirp = require('../src/handlers/chirper-chirps').chirperChirpsHandler;
const comment =
  require('../src/handlers/chirper-comments').chirperCommentsHandler;
const testChirp = require('./testChirp').testChirp;

const chirpsPath = '/';
const commentsPath = '/{timestamp}/comments';
const deleteCommentPath = '/{timestamp}/comments/{cmttimestamp}';

it('should comment on a chirp', async (done) => {
  await chirp({
    httpMethod: 'POST',
    body: JSON.stringify(testChirp),
    resource: chirpsPath,
  });

  const commentBody = [
    {
      userImg: 'not what i wanted',
      username: 'jester jr',
      body: 'not a comment',
      timestamp: 'after now'
    }
  ];

  await comment({
    httpMethod: 'PUT',
    resource: commentsPath,
    pathParameters: {
      timestamp: 'now'
    },
    body: JSON.stringify(commentBody)
  });

  let res = await comment({
    httpMethod: 'GET',
    resource: commentsPath,
    pathParameters: {
      timestamp: 'now'
    }
  });

  expect(JSON.parse(res.body).Items[0].comments[0].body).toMatch(
    'not a comment'
  );

  await comment({
    httpMethod: 'DELETE',
    resource: deleteCommentPath,
    pathParameters: { timestamp: 'now', cmttimestamp: 'after now' }
  });

  res = await comment({
    httpMethod: 'GET',
    resource: commentsPath,
    pathParameters: {
      timestamp: 'now'
    }
  });
  expect(JSON.parse(res.body).Items[0].comments[0]).toBeUndefined();

  done();
});
