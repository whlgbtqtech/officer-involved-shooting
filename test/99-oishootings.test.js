
// # tests - oishootings

var util = require('util');
var request = require('supertest');
var app = require('../app');
var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var expect = chai.expect;
var utils = require('./utils');
var async = require('async');
var IoC = require('electrolyte');
var cheerio = require('cheerio');

chai.should();
chai.use(sinonChai);

request = request(app);

// storage for context-specific variables throughout the tests
var context = {};

describe('/oishootings', function() {

  var Oishooting = IoC.create('models/oishooting');

  // Clean DB and add 3 sample oishootings before tests start
  before(function(done) {
    async.waterfall([
      utils.cleanDatabase,
      function createTestOishootings(callback) {
        // Create 3 test oishootings
        async.timesSeries(3, function(i, _callback) {
          var oishooting = new Oishooting({
            name: 'Oishooting #' + i
          });

          oishooting.save(_callback);
        }, callback);
      }
    ], done);
  });

  // Clean DB after all tests are done
  after(function(done) {
    utils.cleanDatabase(done);
  });

  it('POST /oishootings - should return 200 if oishooting was created', function(done) {
    request
      .post('/oishootings')
      .set({
        'X-Requested-With': 'XMLHttpRequest'// We need to set this so CSRF is ignored when enabled
      })
      .accept('application/json')
      .send({
        name: 'Nifty',
      })
      .expect(200)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }

        // Test the attributes exist
        expect(res.body).to.exist
        res.body.should.have.property('id');
        res.body.should.have.property('name');

        // Test the values make sense
        res.body.name.should.equal('Nifty');

        // Store this id to use later
        context.oishootingsIdCreatedWithRequest = res.body.id;

        done();
      });
  });

  it('GET /oishootings/:id — should return 200 if oishootings was retrieved', function(done) {
    request
      .get(util.format('/oishootings/%s', context.oishootingsIdCreatedWithRequest))
      .accept('application/json')
      .expect(200)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }

        // Test the attributes exist
        expect(res.body).to.exist;
        res.body.should.have.property('id');
        res.body.should.have.property('name');

        // Test the values make sense
        res.body.name.should.equal('Nifty');

        done();
      });
  });

  it('PUT /oishootings/:id - should return 200 if oishootings was updated', function(done) {
    request
      .put(util.format('/oishootings/%s', context.oishootingsIdCreatedWithRequest))
      .set({
        'X-Requested-With': 'XMLHttpRequest'// We need to set this so CSRF is ignored when enabled
      })
      .accept('application/json')
      .send({
        name: 'NiftyWhoa'
      })
      .expect(200)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }

        // Test the attributes exist
        expect(res.body).to.exist;
        res.body.should.have.property('id');
        res.body.should.have.property('name');

        // Test the values make sense
        res.body.name.should.equal('NiftyWhoa');

        done();
      });
  });

  it('DELETE /oishootings/:id - should return 200 if oishootings was deleted', function(done) {
    request
      .del(util.format('/oishootings/%s', context.oishootingsIdCreatedWithRequest))
      .set({
        'X-Requested-With': 'XMLHttpRequest'// We need to set this so CSRF is ignored when enabled
      })
      .accept('application/json')
      .expect(200)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }

        // Test the attributes exist
        expect(res.body).to.exist;
        res.body.should.have.property('id');
        res.body.should.have.property('deleted');

        // Test the values make sense
        res.body.id.should.equal(context.oishootingsIdCreatedWithRequest);
        res.body.deleted.should.equal(true);

        done();
      });
  });

  it('GET /oishootings - should return 200 if oishootings index loads (JSON)', function(done) {
    request
      .get('/oishootings')
      .accept('application/json')
      .expect(200, done);
  });
  
  it('GET /oishootings - should return 200 if oishootings index loads and shows 3 rows (HTML)', function(done) {
    request
      .get('/oishootings')
      .accept('text/html')
      .expect(200)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }

        // Test the attributes exist
        expect(res.text).to.exist;

        var $ = cheerio.load(res.text)
        var $oishootingList = $('table');
        var $oishootingRows = $oishootingList.find('tr');

        // Test the values make sense
        $oishootingList.should.have.length.of(1);
        $oishootingRows.should.have.length.of.at.least(3);

        done();
      });
  });


});