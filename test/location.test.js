const chai = require('chai');
const chatHttp = require('chai-http');
require('chai/register-should');
const app = require('../index');

chai.use(chatHttp);
const { expect } = chai;

describe('Location:', () => {
  it('should post a location', (done) => {
    const data = {
      "name": "first testing location",
      "males": 20000,
      "females": 20000
    }
    chai.request(app)
      .post('/api/v1/locations')
      .set('Accept', 'application/json')
      .send(data)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.data.name).to.equal("first testing location");
        done();
      });
  });

  it('should not post a location if data is absent', (done) => {
    const data = {}
    chai.request(app)
      .post('/api/v1/locations')
      .set('Accept', 'application/json')
      .send(data)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('should post a sub-location', (done) => {
    const data = {
      "name": "sublocation",
      "males": 10000,
      "females": 10000,
      "parent_id": 1
    }
    chai.request(app)
      .post('/api/v1/locations')
      .set('Accept', 'application/json')
      .send(data)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.data.name).to.equal("sublocation");
        done();
      });
  });

  it('should not post a location if there is no parent location', (done) => {
    const data = {
      "name": "sublocation 2",
      "males": 10000,
      "females": 10000,
      "parent_id": 10
    }
    chai.request(app)
      .post('/api/v1/locations')
      .set('Accept', 'application/json')
      .send(data)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal("Cannot find parent Location with the id 10");
        done();
      });
  });

  it('should fetch all locations', (done) => {
    chai.request(app)
      .get('/api/v1/locations')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data).to.not.be.empty;
        done();
      });
  });

  it('should fetch a location', (done) => {
    const id = 1;
    chai.request(app)
      .get(`/api/v1/locations/${id}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data.location.name).to.equal("first testing location");
        done();
      });
  });

  it('should not fetch a location with invalid id', (done) => {
    const id = 10;
    chai.request(app)
      .get(`/api/v1/locations/${id}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });

  it('should update a location', (done) => {
    const id = 1;
    const data = {
      "name": "awesome location Nairobi",
      "males": 20000,
      "females": 20000
    };
    chai.request(app)
      .put(`/api/v1/locations/${id}`)
      .set('Accept', 'application/json')
      .send(data)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data.name).to.equal("awesome location Nairobi")
        done();
      });
  });

  it('should delete a location', (done) => {
    const id = 2;
    chai.request(app)
      .delete(`/api/v1/locations/${id}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });

});
