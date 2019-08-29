const db = require("../db");

class Appointment {
  /** ALL methods need to check for existing user and retrieve user_id using email from calendly
   * If we can't find a user_id, then send an email saying that the meeting will be canceled
   * please try again and be sure to use the same email as elevate account
   * 
   */


  /** Find all appointments. */
  /** Find all active appointments. */
  /** Find a specific appointment by the appointment id. */

  /** Create a new appointment with 'data' from calendly API. */

  /** Reschedule an appointment. 
   *  Step 1 (this.cancel) Find the original appointment by id and modify record with cancel data.
   *  Step 2: (this.create) Create a new appointment record with old event id contained in new calendly obj. 
   */

  /** Cancel an appointment. 
   *  Find the original appointment by id and modify record with cancel data.
  */

  // static async findAllActiveAppointments() {
  //   const result = await db.query(
  //     `SELECT username, first_name, last_name, email
  //       FROM appointments
  //       ORDER BY username`
  //   );

  //   return result.rows;
  // }

  static async create(obj) {

    let user_email = obj.user_email
    const userResult = await db.query(
      `SELECT id
          FROM users
          WHERE email = $1`,
      [user_email]);

    const user = userResult.rows[0];

    if (!user) {
      const error = new Error(`no email matched with  '${user_email}'. Appointment must be rescheduled with correct email`);
      error.status = 404;   // 404 NOT FOUND
      throw error;
    }
    let array = [user.id,
    obj.event_id,
    obj.calendly_user_id,
    obj.created_at,
    obj.event_type,
    obj.event_type_name,
    obj.reason,
    obj.start_time,
    obj.start_time_pretty,
    obj.end_time,
    obj.end_time_pretty,
    obj.location,
    obj.canceled,
    obj.canceler_name,
    obj.cancel_reason,
    obj.canceled_at,
    obj.old_event_id,
    obj.new_event_id
    ]

    let result;
    try {
      result = await db.query(
        `INSERT INTO appointments 
          (
            user_id, 
            event_id, 
            calendly_user_id, 
            created_at, 
            event_type,
            event_type_name, 
            reason, 
            start_time, 
            start_time_pretty, 
            end_time, 
            end_time_pretty, 
            location, 
            canceled, 
            canceler_name, 
            cancel_reason, 
            canceled_at, 
            old_event_id, 
            new_event_id
            )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)`
        , array);
    } catch (err) {
      console.log(err)
    }
    console.log("result is ", result)
  }


  static async cancel(obj) {
 
     let startTime = obj.start_time
    
    let professionalId = obj.calendly_user_id
    // console.log("I am here to cancel", startTime, professionalId)
    const oldEventResult = await db.query(
      `SELECT event_id
          FROM appointments
          WHERE (start_time = $1 AND calendly_user_id = $2)`,
      [startTime, professionalId]);

    const oldEventId = oldEventResult.rows[0];
    // console.log("olde event is",old_event)


    if (!oldEventId) {
      const error = new Error(`no record of the appointment.`);
      error.status = 404;   // 404 NOT FOUND
      throw error;
    }
    const array = [
      oldEventId,
      obj.canceled,
      obj.canceler_name,
      obj.cancel_reason,
      obj.canceled_at,
    ]
    let result;
    try {
      result = await db.query(
        `UPDATE appointments
          SET canceled = $2,
                  canceler_name = $3 ,
                  cancel_reason = $4,
                  canceled_at = $5 
          WHERE event_id = $1`
      , array)

    } catch (err) {
      console.log(err)
    }
    console.log("result", result)
  }

}






module.exports = Appointment;

// syntax below kept giving me error so I changed it.
// I am not exactly sure why but passing array successfully insert table

// ${user.id},
// ${obj.event_id},
// ${obj.calendly_user_id},
// ${obj.created_at},
// ${obj.event_type},
// ${obj.event_type_name},
// ${obj.reason},
// ${obj.start_time},
// ${obj.start_time_pretty},
// ${obj.end_time},
// ${obj.end_time_pretty},
// ${obj.location},
// ${obj.canceled},
// ${obj.canceler_name},
// ${obj.cancel_reason},
// ${obj.cancel_at},
// ${obj.old_event_id},
// ${obj.new_event_id}