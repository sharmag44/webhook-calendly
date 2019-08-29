// npm packages
const request = require('supertest');

// app imports
const app = require('../app');

// model imports
const Appointments = require('../models/appointment');


//test config  
const { SEED_USER_SQL, SEED_APPT_SQL} = require("../config")
const {
  afterEachHook,
  afterAllHook
  
} = require("./config");
const mockCalendlyCreate = require("./mockCalendlyCreate.json");
const mockCalendlyCancel = require("./mockCalendlyCancel.json");
const mockCalendlyCreateBadEmail= require("./mockCalendlyCreateBadEmail.json");
const mockCalendlyCreateBadData= require("./mockCalendlyCreateBadData.json");

const db = require("../db");



beforeEach(async function () {
  await db.query(SEED_USER_SQL);
  await db.query(SEED_APPT_SQL);
});

afterEach(async function () {
  await afterEachHook();
});

describe('POST /webhook', function () {
  test('Receives create calendly post request and process appointments data ', async function () {
    const response = await request(app)
      .post('/webhook')
      .send(mockCalendlyCreate);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('received');
  });

  test('Receives cancel calendly post request and process appointments data', async function () {
    await request(app)
      .post('/webhook')
      .send(mockCalendlyCreate);

      let response = await request(app)
      .post('/webhook')
      .send(mockCalendlyCancel);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('received');
  });

  test('Return 404 if email that passed is not found in our database', async function () {
   let response =  await request(app)
      .post('/webhook')
      .send(mockCalendlyCreateBadEmail);
    expect(response.statusCode).toBe(404);
  });

  test('Return 400 if invalid object is passed in', async function () {
    let response =  await request(app)
       .post('/webhook')
       .send(mockCalendlyCreateBadData);
     expect(response.statusCode).toBe(400);
     expect(response.body.message).toEqual(["instance.event_id is not of a type(s) string"]);
   });
});


afterAll(async function () {
  await afterAllHook();
});
