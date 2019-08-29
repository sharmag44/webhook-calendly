const { parseResponse } = require("./helperWebhook")
const mockCalendlyCreate = require("./mockCalendlyCreate.json");
const mockCalendlyCancel = require("./mockCalendlyCancel.json");

describe("Test webhook helper  function", function () {

    const createPayload = mockCalendlyCreate.payload
    const cancelPayload = mockCalendlyCancel.payload

    test("should return flatten and parsed  create object", async function () {
        let obj = parseResponse(createPayload)
        expect(obj).toEqual({
            event_id: 'BELCE6PKDJEEYPMV',
            user_email: 'seivarden@ancillary.com',
            calendly_user_id: 'FAHHE7B6TQA4PFHG',
            created_at: '2019-08-29T11:55:35-07:00',
            event_type: 'One-on-One',
            event_type_name: '15 Minute Meeting',
            reason: null,
            start_time: '2019-08-29T16:30:00-07:00',
            start_time_pretty: '04:30pm - Thursday, August 29, 2019',
            end_time: '2019-08-29T16:45:00-07:00',
            end_time_pretty: '04:45pm - Thursday, August 29, 2019',
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
            event_id: 'BGJFA4PKFPIGH74L',
            user_email: 'stephanie.simms@gmail.com',
            calendly_user_id: 'FAHHE7B6TQA4PFHG',
            created_at: '2019-08-29T12:00:09-07:00',
            event_type: 'One-on-One',
            event_type_name: '30 Minute Meeting',
            reason: null,
            start_time: '2019-08-30T12:00:00-07:00',
            start_time_pretty: '12:00pm - Friday, August 30, 2019',
            end_time: '2019-08-30T12:30:00-07:00',
            end_time_pretty: '12:30pm - Friday, August 30, 2019',
            location: 'my house',
            canceled: true,
            canceler_name: 'Stephanie Simms',
            cancel_reason: 'fingers crossed this cancel works',
            canceled_at: '2019-08-29T12:02:45-07:00',
            old_event_id: null,
            new_event_id: null
        });
    });

});