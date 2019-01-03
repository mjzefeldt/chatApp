const request = require('request');

describe('get messages', () => {
    it('should return 200 ok', (done) => {
        request.get('http://localhost:8080/messages', (err, res) => {
            expect(res.statusCode).toEqual(200);
            if (err) console.error(err);
            done();
        });
    });
    it('should return a list that is not empty', (done) => {
        request.get('http://localhost:8080/messages', (err, res) => {
            expect(JSON.parse(res.body).length).toBeGreaterThan(0);
            if (err) console.log(err);
            done();
        });
    });
});

describe('get message from user', () => {
    it('it should return a 200 ok', (done) => {
        request.get('http://localhost:8080/messages/Tim', (err, res) => {
            expect(res.statusCode).toEqual(200);
            if (err) console.error(err);
            done();
        });
    });
    it('name should be Tim', (done) => {
        request.get('http://localhost:8080/messages/Tim', (err, res) => {
            expect(JSON.parse(res.body)[0].name).toEqual('Tim');
            if (err) console.error(err);
            done();
        });
    });
});
