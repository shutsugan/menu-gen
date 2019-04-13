const {
  request,
  chaiHttp,
  expect,
  initDb,
  expectedError
} = require('./test_helper');
const Meal = require('../models/meals');

const getMeals = async (err, res, query) => {
   const meals = await Meal.find(query);

   expect(err).to.be.null;
   expect(res).to.be.json;
   expect(res).to.have.status(200);
   expect(res.body.categories).should.be.a('object');
   expect(res.body.categories.length).to.equal(meals.length);
};

describe('Meal', _ => {
  const mealId_error = 'Cast to ObjectId failed for value "1" at path "_id" for model "Meal"';
  const data = {
    name: 'name',
  	description: 'description',
  	price: 100,
  	image: 'image',
  	category_id: '5c910cb228f494640561d40e',
  	user_id: '5c90fe0e7fd68f61c8185715'
  };
  const user_id = data.user_id;
  const category_id = data.category_id;
  let meal_id = '';

  before(done => initDb(done));
  after(done => {
    Meal.deleteMany({name: data.name}, _ => done());
  });

  describe('Set meal', () => {
    it ('should create a new meal', done => {
      request
        .post('/api/meal')
        .send(data)
        .then(res => {
          meal_id = res.body.meal._id;
          expect(res).to.have.status(201);
          expect(res.body).should.be.a('object');
          expect(res.body.meal.name).to.equal(data.name);
          done();
        });
    });

    it ('should return message error', done => {
      request
        .post('/api/meal')
        .send({})
        .then(res => {
          expect(res).to.have.status(424);
          done();
        });
    });
  });

  describe('Get Meal', () => {
    it ('should get categories by user id', done => {
      request
        .get(`/api/${user_id}/meals`)
        .end((err, res) => {
          getMeals(err, res, {user_id});
          done();
        });
    });

    it ('should get categories by category id', done => {
      request
        .get(`/api/${category_id}/category_meals`)
        .end((err, res) => {
          getMeals(err, res, {category_id});
          done();
        });
    });

    it ('sould return a user id servire error', done => {
      request
        .get(`/api/1/meals`)
        .end((err, res) => {
          expectedError(
            expect,
            res,
            500,
            'Cast to ObjectId failed for value "1" at path "user_id" for model "Meal"');
          done();
        });
    });

    it ('sould return a category id servire error', done => {
      request
        .get(`/api/1/category_meals`)
        .end((err, res) => {
          expectedError(
            expect,
            res,
            500,
            'Cast to ObjectId failed for value "1" at path "category_id" for model "Meal"');
          done();
        });
    });

    it ('should get all meals', done => {
      request
        .get('/api/meals')
        .end((err, res) => {
          getMeals(err, res, {});
          done();
        });
    });
  });

  describe('Update meal', () => {
    it ('should update the meal', done => {
      request
        .put(`/api/meal/${meal_id}`)
        .send({price: 200})
        .then(res => {
          expect(res).to.have.status(201);
          expect(res.body.meal.price).to.equal(200);
          done();
        });
    });

    it ('sould return error message', done => {
      request
        .put('/api/meal/1')
        .send({price: 200})
        .then(res => {
          expectedError(expect, res, 424, mealId_error);
          done();
        });
    });
  });

  describe('Delete meal', () => {
    it ('should delete the meal', done => {
      request
        .del(`/api/meal/${meal_id}`)
        .then(res => {
          expect(res).to.have.status(201);
          done();
        });
    });

    it ('should return message Failed to delete new category', done => {
      request
        .del('/api/meal/1')
        .then(res => {
          expectedError(expect, res, 424, mealId_error);
          done();
        });
    });
  });
});
