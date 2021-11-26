const app = require('../../src/server/server');
const request = require('supertest');

// GET

describe('Product methods', () => {
  describe('GET', () => {
    it('gets /products/:id ', (done) => {
      request(app)
        .get('/products/123')
        .expect(200)
        .expect((res) => res.body.id === 123)
        .end((err, res) => {
          if (err) return done(err);
          return done();
        });
    });

    it('gets all products', async () => {
      try {
        const response = await request(app).get('/products');
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0]).toBeInstanceOf(Object);
      } catch (err) {
        console.error(err);
        throw new Error();
      }
    });
  });

  describe('POST', () => {
    it('posts valid product', (done) => {
      request(app)
        .post('/products')
        .send({ id: '66ed26217e82', name: 'Katt', price: 1 })
        .expect(201)
        .expect((res) => res.body.id === '66ed26217e82')
        .end((err, res) => {
          if (err) return done(err);
          return done();
        });
    });
  });
});

it('Sends id as number instead of string', (done) => {
  request(app)
    .post('/carts/something')
    .send([{ id: 54393, name: 'Katt', price: 1 }])
    .expect(400)
    .end((err, res) => {
      if (err) return done(err);
      return done();
    });
});

it('Sends negative price', (done) => {
  request(app)
    .post('/carts/something')
    .send([{ id: 54393, name: 'Katt', price: -10 }])
    .expect(400)
    .end((err, res) => {
      if (err) return done(err);
      return done();
    });
});

it('posts invalid key ', (done) => {
  request(app)
    .post('/products')
    .send({ iam: 'error' })
    .expect(400)
    .end((err, res) => {
      if (err) return done(err);
      return done();
    });
});

// // PUT
describe('Update one product', () => {
  it('Updates one product in /products ', (done) => {
    request(app)
      .put('/products')
      .send({ id: '999', name: 'Stol', price: 13 })
      .expect(200)
      .expect((res) => res.body.id === '999')
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
});
// // DELETE
// // /api/carts/:userLogin/:itemId

// describe('DELETE product in cart', () => {
//   it('deletes product in cart /carts/:userLogin/productId ', (done) => {
//     request(app)
//       .delete('/carts/secret/66ed22217e83')
//       .expect(200)
//       .expect(
//         (res) =>
//           res.body.cart.find(
//             (product) => product.productId === '66ed22217e83'
//           ) === undefined
//       )
//       .end((err, res) => {
//         if (err) return done(err);
//         return done();
//       });
//   });
// });
