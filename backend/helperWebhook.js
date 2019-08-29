const flatten = require('flat');

// Helper function to flatten calendly json data object and parse for fields to log in elevate db
function parseResponse(obj) {
    
    let flatObj = flatten(obj);

    let appointmentObj = {
        event_id: flatObj['event.uuid'],
        user_email: flatObj['invitee.email'],
        calendly_user_id: flatObj['event_type.owner.uuid'],
        created_at: flatObj['event.created_at'],
        event_type: flatObj['event_type.kind'],
        event_type_name: flatObj['event_type.name'],
        reason: flatObj['questions_and_answers.0.answer'] || null,
        start_time: flatObj['event.start_time'],
        start_time_pretty: flatObj['event.start_time_pretty'],
        end_time: flatObj['event.end_time'],
        end_time_pretty: flatObj['event.end_time_pretty'],
        location: flatObj['event.location'] || 'Zoom',
        canceled: flatObj['invitee.canceled'],
        canceler_name: flatObj['invitee.canceler_name'],
        cancel_reason: flatObj['invitee.cancel_reason'],
        canceled_at: flatObj['invitee.canceled_at'],
        old_event_id: flatObj['old_event.uuid'] || null,
        new_event_id: flatObj['new_event.uuid'] || null
    };

    return appointmentObj
}


module.exports = { parseResponse }

