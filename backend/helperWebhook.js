const flatten = require('flat')

// TODO: parse new event object and insert database
// Two scenarios for invitee.created:
// 1) straightforward create path for new event
// 2) reschedule an event cancels original and creates a new event with cross referenced ids
function parseResponse(obj){
    let flatObj = flatten(obj)
    let appointmentObj= {
        event_id: flatObj['event.uuid'],
        calendly_user_id: flatObj['event_type.owner.uuid'],
        created_at: flatObj['event.created_at'],
        canceled_at: flatObj['invitee.canceled_at'],
        
        
    
    
    
    }
   ,
    
    
    
    flatObj['event_type.kind'],
    flatObj['event_type.name'],
    flatObj['questions_and_answers.0.answer'],
    flatObj['event.start_time'],
    flatObj['event.end_time'],
    flatObj['event.location'],
    flatObj['invitee.canceled'],
    flatObj['invitee.canceler_name'],
    flatObj['invitee.cancel_reason'],
    flatObj['old_event'] || null
    ,
    // reschedule appointment
    flatObj['old_event.uuid']
]
   console.log("array is ", eventArray)

    // console.log("array is ",array)
}

// Two scenarios for invitee.canceled: 
// 1) canceled event - update original event with canceled info 
// 2) rescheduled event - update original event with canceled info and new event id AND create new event with old event id

function handleEventCanceled(obj){
    let flatObj = flatten(obj)
    flatObj.event.uuid
    flatObj.event_type.owner.uuid
    flatObj.event.created_at
    flatObj.event_type.kind
    flatObj.event_type.name
    flatObj['questions_and_answers.0.answer']
    flatObj.event.start_time
    flatObj.event.end_time
    flatObj.event.location
    flatObj.invitee.canceled
    flatObj.invitee.canceler_name
    flatObj.invitee.cancel_reason
    flatObj.invitee.canceled_at
    // reschedule appointment
    flatObj.old_event.uuid
    flatObj.new_event.uuid

    console.log("flatten cancel event is",flatObj)
}

module.exports = { parseResponse, handleEventCanceled }

// flat obj is  { 'event_type.uuid': 'AAFOAUQKKVOBSZVD',
//   'event_type.kind': 'One-on-One',
//   'event_type.slug': '15min',
//   'event_type.name': '15 Minute Meeting',
//   'event_type.duration': 15,
//   'event_type.owner.type': 'users',
//   'event_type.owner.uuid': 'BCHFF2F62BWNJVPP',
//   'event.uuid': 'BGOEC6BSOS2P6WHB',
//   'event.assigned_to.0': 'Emi Tsukuda',
//   'event.extended_assigned_to.0.name': 'Emi Tsukuda',
//   'event.extended_assigned_to.0.email': 'gioramlevi515@gmail.com',
//   'event.extended_assigned_to.0.primary': true,
//   'event.start_time': '2019-08-28T16:00:00-07:00',
//   'event.start_time_pretty': '04:00pm - Wednesday, August 28, 2019',
//   'event.invitee_start_time': '2019-08-28T16:00:00-07:00',
//   'event.invitee_start_time_pretty': '04:00pm - Wednesday, August 28, 2019',
//   'event.end_time': '2019-08-28T16:15:00-07:00',
//   'event.end_time_pretty': '04:15pm - Wednesday, August 28, 2019',
//   'event.invitee_end_time': '2019-08-28T16:15:00-07:00',
//   'event.invitee_end_time_pretty': '04:15pm - Wednesday, August 28, 2019',
//   'event.created_at': '2019-08-28T11:31:06-07:00',
//   'event.location': null,
//   'event.canceled': false,
//   'event.canceler_name': null,
//   'event.cancel_reason': null,
//   'event.canceled_at': null,
//   'invitee.uuid': 'FFPHVFXQEAPFUBVZ',
//   'invitee.first_name': null,
//   'invitee.last_name': null,
//   'invitee.name': 'Emi Tsukuda',
//   'invitee.email': 'gioramlevi515@gmail.com',
//   'invitee.text_reminder_number': null,
//   'invitee.timezone': 'America/Los_Angeles',
//   'invitee.created_at': '2019-08-28T11:31:06-07:00',
//   'invitee.is_reschedule': false,
//   'invitee.payments': [],
//   'invitee.canceled': false,
//   'invitee.canceler_name': null,
//   'invitee.cancel_reason': null,
//   'invitee.canceled_at': null,
//   questions_and_answers: [],
//   questions_and_responses: {},
//   'tracking.utm_campaign': null,
//   'tracking.utm_source': null,
//   'tracking.utm_medium': null,
//   'tracking.utm_content': null,
//   'tracking.utm_term': null,
//   'tracking.salesforce_uuid': null,
//   'old_event.uuid': 'BEIHH5BGFT7KOYPQ',
//   'old_event.assigned_to.0': 'Emi Tsukuda',
//   'old_event.extended_assigned_to.0.name': 'Emi Tsukuda',
//   'old_event.extended_assigned_to.0.email': 'gioramlevi515@gmail.com',
//   'old_event.extended_assigned_to.0.primary': true,
//   'old_event.start_time': '2019-08-29T09:00:00-07:00',
//   'old_event.start_time_pretty': '09:00am - Thursday, August 29, 2019',
//   'old_event.invitee_start_time': '2019-08-29T09:00:00-07:00',
//   'old_event.invitee_start_time_pretty': '09:00am - Thursday, August 29, 2019',
//   'old_event.end_time': '2019-08-29T09:15:00-07:00',
//   'old_event.end_time_pretty': '09:15am - Thursday, August 29, 2019',
//   'old_event.invitee_end_time': '2019-08-29T09:15:00-07:00',
//   'old_event.invitee_end_time_pretty': '09:15am - Thursday, August 29, 2019',
//   'old_event.created_at': '2019-08-27T14:00:29-07:00',
//   'old_event.location': null,
//   'old_event.canceled': true,
//   'old_event.canceler_name': 'Emi Tsukuda',
//   'old_event.cancel_reason': 'busy but make it happen',
//   'old_event.canceled_at': '2019-08-28T11:31:06-07:00',
//   'old_invitee.uuid': 'AAIDXHI3UMGSWEV6',
//   'old_invitee.first_name': null,
//   'old_invitee.last_name': null,
//   'old_invitee.name': 'Emi Tsukuda',
//   'old_invitee.email': 'gioramlevi515@gmail.com',
//   'old_invitee.text_reminder_number': null,
//   'old_invitee.timezone': 'America/Los_Angeles',
//   'old_invitee.created_at': '2019-08-27T14:00:29-07:00',
//   'old_invitee.is_reschedule': true,
//   'old_invitee.payments': [],
//   'old_invitee.canceled': true,
//   'old_invitee.canceler_name': 'Emi Tsukuda',
//   'old_invitee.cancel_reason': 'busy but make it happen',
//   'old_invitee.canceled_at': '2019-08-28T11:31:06-07:00',
//   new_event: null,
//   new_invitee: null }


