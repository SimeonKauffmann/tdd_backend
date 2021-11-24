const app = require('../../src/server/server');
const request = require('supertest');

// GET
describe('GET /product', () => {
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
});

// POST
describe('POST /products', () => {
  it('posts /products ', (done) => {
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

// describe('POST bad requests /products', () => {
//   it('posts empty object/products ', (done) => {
//     request(app)
//       .post('/products')
//       .send({ iam: 'error' })
//       .expect(401)
//       .end((err, res) => {
//         if (err) return done(err);
//         return done();
//       });
//   });
// });

// // PUT
describe('Update one product', () => {
  it('Updates one product in /products ', (done) => {
    request(app)
      .put('/products')
      .send({ id: '999', name: 'Stol', price: 13 })
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
