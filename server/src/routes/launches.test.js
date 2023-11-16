const request = require('supertest');
const app = require('../app');

describe('Test GET /launches', () => {
    test('It should respond with 200 success', async () => {
     const response = await request(app)
         .get('/launches')
         .expect('Content-Type', /json/)
         .expect(200);
     // expect(response.statusCode).toBe(200);
    });
 });

describe('Test POST /launches', () => {
    const completeLaunchDate = {
        mission: 'USS Enterprise',
        rocket: 'NCC 1701-D',
        target: 'Kepler-62 f',
        launchDate: 'January 4, 2028',
    };
    const launchDataWithoutDate = {
        mission: 'USS Enterprise',
        rocket: 'NCC 1701-D',
        target: 'Kepler-62 f',

    }

    const launchDateWithInvalidDate = {
        mission: 'USS Enterprise',
        rocket: 'NCC 1701-D',
        target: 'Kepler-62 f',
        launchDate: 'zoot',
    }

    test('It should respond with 201 created', async () => {
        const response = await request(app)
        .post('/launches')
        .send(completeLaunchDate)
            .expect('Content-Type', /json/)
            .expect(201);

        const requestDate = new Date (completeLaunchDate.launchDate).valueOf();
        const responseDate = new Date (response.body.launchDate).valueOf();
        expect(responseDate).toBe(requestDate);

        expect(response.body).toMatchObject(launchDataWithoutDate);
    });

    test('It should catch missing required properties', async () => {
        const response = await request(app)
            .post('/launches')
            .send(launchDataWithoutDate)
            .expect('Content-Type', /json/)
            .expect(400);

        expect(response.body).toStrictEqual({
            error: 'Missing required launch property',
        });
    });

    test('It should catch invalid dates', async () => {
        const response = await request(app)
            .post('/launches')
            .send(launchDataWithoutDate)
            .expect('Content-Type', /json/)
            .expect(400);

        expect(response.body).toStrictEqual({
            error: 'Missing required launch property',
        });
    });
});