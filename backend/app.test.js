createApp = require('./app.js');
database = require('./database.js');
const supertest = require('supertest');

const registerUser = jest.fn();
const authUser = jest.fn();
const getProfile = jest.fn();
const updateProfile = jest.fn();
const getPricingModuleCost = jest.fn();
const generateFuelQuote = jest.fn();
const getFuelQuoteHistory = jest.fn();

const app = createApp({
    registerUser,
    authUser,
    getProfile,
    updateProfile,
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
        updateProfile.mockReset();
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

    // it('POST /logout should successfully log user out', async () => {
    //     const res = await requestWithSupertest.post('/logout');
    //     expect(res.status).toEqual(200);
    //     expect(res.body.status).toEqual("Successfully logged out (FROM BACKEND)");
    //     expect(res.body.login).toEqual(false);
    // })

    // it('GET /profiledata should successfully fetch profile data for existing user', async () => {
    //     const res = await requestWithSupertest.get('/profiledata')
    //     .send({
    //         username: 'test',
    //         loggedin: 'yes'
    //     });
    //     expect(getProfile.mock.calls.length).toBe(1);
    //     expect(getProfile.mock.calls[0][0]).toBe('test');
    //     expect(res.body.status).toEqual("Successfully fetched profile data (FROM BACKEND)");
    // });

    // it('GET /profiledata should fail to fetch data when user is not logged in', async () => {
    //     const res = await requestWithSupertest.get('/profiledata')
    //     expect(res.status).toEqual(400);
    // });

    // it('POST /profile should successfully update profile data for user', async () => {
    //     const data = {
    //         name: 'profile test',
    //         address: '1234 test ln',
    //         address2: undefined,
    //         city: 'TestLand',
    //         state: 'TX',
    //         zipcode: '12345',
    //         loggedin: 'yes'
    //     };
    //     const res = await requestWithSupertest.post('/profile')
    //     .send(data);
    //     expect(updateProfile.mock.calls[0][0]).toBe('profile test');
    //     expect(updateProfile.mock.calls[0][1]).toBe('1234 test ln');
    //     expect(updateProfile.mock.calls[0][2]).toBe(undefined);
    //     expect(updateProfile.mock.calls[0][3]).toBe('TestLand');
    //     expect(updateProfile.mock.calls[0][4]).toBe('TX');
    //     expect(updateProfile.mock.calls[0][5]).toBe('12345');
    //     expect(res.status).toEqual(200);
    //     expect(res.body.status).toEqual("Successfully updated profile. (FROM BACKEND)");
    // })

    // it('POST /profile should not update if user is not logged in', async () => {
    //     const res = await requestWithSupertest.post('/profile');
    //     expect(res.status).toEqual(401);
    //     expect(res.body.status).toEqual("Please login to view this page! (FROM BACKEND)")
    // })

    // it('POST /pricingmodulecost should successfully update total cost when user is logged in', async () => {
    //     const res = await requestWithSupertest.post('/pricingmodulecost')
    //     .send({
    //         loggedin: 'yes',
    //         request: 500 
    //     });
    //     expect(getPricingModuleCost.mock.calls[0][0]).toBe(500);
    //     expect(res.status).toEqual(200);
    //     expect(res.body.status).toEqual('Successfully updated total cost (FROM BACKEND)');
    // })

    // it('POST /pricingmodulecost should fail to update total cost if user is not logged in', async () => {
    //     const res = await requestWithSupertest.post('/pricingmodulecost');
    //     expect(res.status).toEqual(401);
    //     expect(res.body.status).toEqual("Please login to view this page! (FROM BACKEND)");
    // })

    // it('POST /fuelquotemodule successfully generates fuel quote if user is logged in', async () => {
    //     const res = await requestWithSupertest.post('/fuelquotemodule')
    //     .send({
    //         loggedin: 'yes',
    //         request: 500,
    //         date: '05/06/2022'
    //     });
    //     expect(res.status).toEqual(200);
    //     expect(res.body.status).toEqual("Successfully generated fuel quote. (FROM BACKEND)");
    //     expect(generateFuelQuote.mock.calls[0][0]).toBe(500);
    //     expect(generateFuelQuote.mock.calls[0][1]).toBe('05/06/2022');
    // })

    // it('POST /fuelquotemodule does not generate a fuel quote if user is not logged in', async () => {
    //     const res = await requestWithSupertest.post('/fuelquotemodule')
    //     expect(res.status).toEqual(401);
    //     expect(res.body.status).toEqual("Please login to view this page! (FROM BACKEND)");
    // })

    // it('GET /fuelquotehist should fetch fuel quote history if user exists', async () => {
    //     const res = await requestWithSupertest.get('/fuelquotehist')
    //     .send({
    //         username: 'test'
    //     });
    //     expect(res.status).toEqual(200);
    //     expect(res.body.status).toEqual('Successfully fetched fuel quote history (FROM BACKEND)');
    //     expect(getFuelQuoteHistory.mock.calls[0][0]).toBe('test');
    // })

    // it('GET /fuelquotehist should not attempt to fetch fuel quote history if user does not exist', async () => {
    //     const res = await requestWithSupertest.get('/fuelquotehist');
    //     expect(res.status).toEqual(400);
    // })
})


