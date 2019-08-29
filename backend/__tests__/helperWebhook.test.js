const { parseResponse } = require("../helperWebhook")
const mockCalendlyCreate = require("./mockCalendlyCreate.json");
const mockCalendlyCancel = require("./mockCalendlyCancel.json");

describe("Test webhook helper  function", function () {

    const createPayload = mockCalendlyCreate.payload
    const cancelPayload = mockCalendlyCancel.payload

    test("should return flatten and parsed  create object", async function () {
        let obj = parseResponse(createPayload)
        console.log(obj)
        expect(obj).toEqual({
            event_id: 'FHKED5IPUQV6KXXG',
            user_email: 'testuser@gmail.com',
            calendly_user_id: 'FAHHE7B6TQA4PFHG',
            created_at: '2019-08-29T15:59:11-07:00',
            event_type: 'One-on-One',
            event_type_name: '15 Minute Meeting',
            reason: 'my fake appointment',
            start_time: '2019-08-30T11:00:00-07:00',
            start_time_pretty: '11:00am - Friday, August 30, 2019',
            end_time: '2019-08-30T11:15:00-07:00',
            end_time_pretty: '11:15am - Friday, August 30, 2019',
            location: 'Zoom',
            canceled: false,
            canceler_name: null,
            cancel_reason: null,
            canceled_at: null,
            old_event_id: null,
            new_event_id: null 
        });
    });

    test("should return flatten and parsed cancel object", async function () {
        
        let obj = parseResponse(cancelPayload)
        expect(obj).toEqual({
             event_id: 'FHKED5IPUQV6KXXG',
            user_email: 'testuser@gmail.com',
            calendly_user_id: 'FAHHE7B6TQA4PFHG',
            created_at: '2019-08-29T15:59:11-07:00',
            event_type: 'One-on-One',
            event_type_name: '15 Minute Meeting',
            reason: 'my fake appointment',
            start_time: '2019-08-30T11:00:00-07:00',
            start_time_pretty: '11:00am - Friday, August 30, 2019',
            end_time: '2019-08-30T11:15:00-07:00',
            end_time_pretty: '11:15am - Friday, August 30, 2019',
            location: 'Zoom',
            canceled: true,
            canceler_name: 'Stephanie Simms',
            cancel_reason: 'canceling my fake appointment',
            canceled_at: '2019-08-29T16:00:04-07:00',
            old_event_id: null,
            new_event_id: null 
        });
    });

});