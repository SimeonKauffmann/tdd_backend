const expressDriver = require('../../src/server/server').expressDriver;
const request = require('supertest');
const app = expressDriver();

//TODO delete, get all

describe('GET /products', () => {
	it('gets status code OK', done => {
		request(app)
			.get('/products')
			.expect(200)
			.end(err => {
				err ? done(err) : done();
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
