createApp = require('./app.js');
database = require('./database.js');
const supertest = require('supertest');

const registerUser = jest.fn();
const authUser = jest.fn();
const getProfile = jest.fn();
const saveProfile = jest.fn();
const getPricingModuleCost = jest.fn();
const generateFuelQuote = jest.fn();
const getFuelQuoteHistory = jest.fn();

const app = createApp({
    registerUser,
    authUser,
    getProfile,
    saveProfile,
    getPricingModuleCost,
    generateFuelQuote,
    getFuelQuoteHistory
})


const requestWithSupertest = supertest(app);

//testing setup by David, Paul, and Eric

describe("Unit Tests", () => {

    beforeEach(() => {
        jest.useFakeTimers();
        registerUser.mockReset();
        authUser.mockReset();
        getProfile.mockReset();
        saveProfile.mockReset();
        getPricingModuleCost.mockReset();
        generateFuelQuote.mockReset();
        getFuelQuoteHistory.mockReset();
    })
    
    afterAll(() => {
        //database.connection.close();
    })

    it('GET /', async () => {
        const res = await requestWithSupertest.get('/');
        expect(res.status).toEqual(200);
    })

    it('GET /loginstatus should retrieve login status of client', async () => {
        const res = await requestWithSupertest.get('/loginstatus');
        expect(res.status).toEqual(200);
    })

    it('POST /register should fail to register when either username/password are not entered', async () => {
        const res = await requestWithSupertest.post('/register')
        expect(res.status).toEqual(400);
    })

    it('POST /register should successfully register new users', async () => {
        const res = await requestWithSupertest.post('/register').send({     // sending in test parameters to mock database
            username: 'test',
            password: '123123',
            email: 't@fakemail.com',
            phoneNum: '1234567890'
        });
        expect(registerUser.mock.calls.length).toBe(1);
        expect(registerUser.mock.calls[0][0]).toBe('test');
        expect(registerUser.mock.calls[0][1]).toBe('123123');
        expect(registerUser.mock.calls[0][2]).toBe('t@fakemail.com');
        expect(registerUser.mock.calls[0][3]).toBe('1234567890');
        expect(res.body.status).toEqual('Registered user. (FROM BACKEND)');
    })

    it('POST /auth should fail to login if username or password is not entered', async () => {
        const res = await requestWithSupertest.post('/auth');
        expect(res.status).toEqual(401);
    })

    it('POST /auth should successfully login for valid username and password', async () => {
        const res = await requestWithSupertest.post('/auth').send({     // sending in test parameters to receive an unsuccessful response due to internal server error
            username: 'test',
            password: '123123',
        });
        expect(authUser.mock.calls.length).toBe(1);
        expect(authUser.mock.calls[0][0]).toBe('test');
        expect(authUser.mock.calls[0][1]).toBe('123123');
        expect(res.body.status).toEqual('Successfully obtained username and password (FROM BACKEND)');
    })

    it('POST /logout should successfully log user out', async () => {
        const res = await requestWithSupertest.post('/logout');
        expect(res.status).toEqual(200);
        expect(res.body.status).toEqual("Successfully logged out (FROM BACKEND)");
        expect(res.body.login).toEqual(false);
    })

    it('GET /profiledata should successfully fetch profile data for existing user', async () => {
        const res = await requestWithSupertest.get('/profiledata')
        .send({
            username: 'test',
            loggedin: 'yes'
        });
        expect(getProfile.mock.calls.length).toBe(1);
        expect(getProfile.mock.calls[0][0]).toBe('test');
        expect(res.body.status).toEqual("Successfully fetched profile data (FROM BACKEND)");
    });

    it('GET /profiledata should fail to fetch data when user is not logged in', async () => {
        const res = await requestWithSupertest.get('/profiledata')
        expect(res.status).toEqual(400);
    });

    it('POST /profile should successfully update profile data for user', async () => {
        const data = {
            username: 'jackfrost',
            name: 'Jack Frost',
            email: 'test@testmail.com',
            phoneNum: '1231231233',
            billaddress: '1234 test ln',
            diner: '2',
            payment: 'card',
            loggedin: 'yes'
        };
        const res = await requestWithSupertest.post('/profile')
        .send(data);
        expect(saveProfile.mock.calls[0][0]).toBe('jackfrost');
        expect(saveProfile.mock.calls[0][1]).toBe('Jack Frost');
        expect(saveProfile.mock.calls[0][2]).toBe('test@testmail.com');
        expect(saveProfile.mock.calls[0][3]).toBe('1231231233');
        expect(saveProfile.mock.calls[0][4]).toBe('1234 test ln');
        expect(saveProfile.mock.calls[0][5]).toBe('2');
        expect(saveProfile.mock.calls[0][6]).toBe('card');
        expect(res.status).toEqual(201);
        expect(res.body.status).toEqual("Successfully updated profile. (FROM BACKEND)");
    })

    it('POST /profile should not update if user is not logged in', async () => {
        const res = await requestWithSupertest.post('/profile');
        expect(res.status).toEqual(401);
        expect(res.body.status).toEqual("Please login to view this page! (FROM BACKEND)");
    })
})