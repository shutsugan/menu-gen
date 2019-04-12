const {
  request,
  chaiHttp,
  expect,
  initDb,
  expectedError
} = require('./test_helper');
const Category = require('../models/categories');

const getCategories = async (err, res, query) => {
  const categories = await Category.find(query);

   expect(err).to.be.null;
   expect(res).to.be.json;
   expect(res).to.have.status(200);
   expect(res.body.categories).should.be.a('object');
   expect(res.body.categories.length).to.equal(categories.length);
};

describe('Category', _ => {
  const user_id = '5c90fe0e7fd68f61c8185715';
  const data = {
    name: 'category',
    description: 'description',
    cover: 'cover',
    user_id: '5c90fe0e7fd68f61c8185715'
  };
  let category_id = '';

  before(done => initDb(done));
  after(done => {
      Category.deleteOne({name: data.name}, _ => done());
  });

  describe('Create Category', () => {
    it ('should create a new category', done => {
      request
        .post('/api/category')
        .send(data)
        .then(res => {
          category_id = res.body.category._id;
          expect(res).to.have.status(201);
          expect(res.body).should.be.a('object');
          expect(res.body.category.name).to.equal(data.name);
          done();
        });
    });

    it ('should return message Failed to create new category', done => {
      request
        .post('/api/category')
        .send({})
        .then(res => {
          expectedError(expect, res, 424, 'Failed to create new category');
          done();
        });
    });
  });

  describe('Get category', () => {
    it ('should get categories by user id', done => {
      request
        .get(`/api/${user_id}/categories`)
        .end((err, res) => {
          getCategories(err, res, {user_id});
          done();
        });
    });

    it ('sould return a servire error', done => {
      request
        .get(`/api/1/categories`)
        .end((err, res) => {
          expectedError(
            expect,
            res,
            500,
            'Cast to ObjectId failed for value "1" at path "user_id" for model "Category"');
          done();
        });
    });

    it ('should get all categories', done => {
      request
        .get('/api/categories')
        .end((err, res) => {
          getCategories(err, res, {});
          done();
        });
    });
  });

  describe('Update category', () => {
    it ('should update the category', done => {
      request
        .put(`/api/category/${category_id}`)
        .send({description: 'updated description'})
        .then(res => {
          expect(res).to.have.status(201);
          expect(res.body.new_category).should.be.a('object');
          expect(res.body.new_category.description).to.equal('updated description');
          done();
        });
    });

    it ('should return message Failed to update new category', done => {
      request
        .put(`/api/category/1`)
        .send({name: 'updated name'})
        .then(res => {
          expectedError(expect, res, 424, 'Failed to update new category');
          done();
        });
    });
  });

  describe('delete category', () => {
    it ('should delete the category', done => {
      request
        .del(`/api/category/${category_id}`)
        .then(res => {
          expect(res).to.have.status(201);
          done();
        });
    });

    it ('should return message Failed to delete new category', done => {
      request
        .del('/api/category/1')
        .then(res => {
          expectedError(expect, res, 424, 'Failed to delete new category');
          done();
        });
    });
  });
});
