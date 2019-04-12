const {
  request,
  chaiHttp,
  expect,
  initDb,
  expectedError
} = require('./test_helper');
const User = require('../models/Users');

describe('User', () => {
  const data = {
    username: 'John Doe',
    email: 'email@gmail.com',
    password: 'root'
  };

  before(done => initDb(done));
  after(done => {
    User.deleteOne({email: data.email}, (err) => done())
  });

  describe('Get user', () => {
    it ('should get the user', done => {
      request
        .get('/api/user')
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.R34_z8soWATKGfeHDwF9KgXzwgZt2QjDH5d55tyE4Kc')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.be.json;
          expect(res).to.have.status(200);
          expect(res.body.user).should.be.a('object');
          expect(res.body.user.name).to.equal(data.username);
          done();
        });
    });

    it ('should return message register first', done => {
      request
        .get('/api/user')
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.60KALZI_44D6Qo48UUQ2YHl57ZailPdQU73pzg9KUc8')
        .end((err, res) => {
          expectedError(expect, res, 401, 'Register first!!');
          done();
        });
    });

    it ('should return message user not found', done => {
      request
        .get('/api/user')
        .end((err, res) => {
          expectedError(expect, res, 401, 'User not found');
          done();
        });
    });
  });

  describe('Register user', () => {
    it ('should create user', done => {
      request
        .post('/api/register')
        .send(data)
        .then(res => {
          expect(res).to.have.status(201);
          expect(res.body).should.be.a('object');
          done();
        });
    });

    it ('should return message email already exists', done => {
      request
        .post('/api/register')
        .send(data)
        .then(res => {
          expectedError(expect, res, 403, 'Email already exists');
          done();
        });
    });
  });

  describe('Authenticate user', () => {
    it ('should return token', done => {
      request
        .post('/api/auth')
        .send(data)
        .then(res => {
          expect(res).to.have.status(201);
          expect(res.body.token).should.be.a('object');
          done();
        });
    });

    it ('should return message authentication failed', done => {
      request
        .post('/api/auth')
        .send({})
        .then(res => {
          expectedError(expect, res, 403, 'Authentication failed');
          done();
        });
    });
  });
});
