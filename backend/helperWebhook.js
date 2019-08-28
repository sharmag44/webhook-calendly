// TODO: parse new event object and insert database
function handleEventCreated(obj){
    console.log("created event is",obj)
}

function handleEventCanceled(obj){
    console.log("canceled event is",obj)
}

module.exports = { handleEventCreated, handleEventCanceled }