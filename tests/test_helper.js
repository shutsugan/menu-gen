const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = chai.expect;

const initDb = require('../models');

chai.use(chaiHttp);
chai.should();

const url = 'http://localhost:4000';
const request = chai.request(url);

exports.request = request;
exports.chaiHttp = chaiHttp;
exports.expect = expect;
exports.initDb = initDb;
