const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = chai.expect;

const initDb = require('../models');

chai.use(chaiHttp);
chai.should();

const url = 'http://localhost:4000';
const request = chai.request(url);

const expectedError = (expect, res, status, message) => {
  expect(res).to.have.status(status);
  expect(res.body.message).to.equal(message);
};

exports.request = request;
exports.chaiHttp = chaiHttp;
exports.expect = expect;
exports.initDb = initDb;
exports.expectedError = expectedError;
