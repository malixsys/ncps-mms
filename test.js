var request = require('supertest');
var app = require('./server/app');

describe('Requests to the root path', function() {
    it('Returns a 200 status code', function(done) {
        request(app)
            .get('/')
            .expect(200, done);
    });

    it('Returns a HTML format', function(done) {
        request(app)
            .get('/')
            .expect('Content-Type', 'text/html; charset=UTF-8', done);
    });
});
