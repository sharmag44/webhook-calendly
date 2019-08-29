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
    
    console.log("obj is", obj)
    let user_email = obj.user_email
    console.log("my email is ",user_email)
    const userResult = await db.query(
      `SELECT id
          FROM users
          WHERE email = $1`,
      [user_email]);

    const user = userResult.rows[0];
    console.log("user is ",user)

    if (!user) {
      const error = new Error(`no email matched with  '${user_email}'. Appointment must be rescheduled with correct email`);
      error.status = 404;   // 404 NOT FOUND
      throw error;
    }

    const result = await db.query(
      `INSERT INTO appointments 
          (user_id, 
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
             new_event_id)
        VALUES (
          ${user.id},
          ${obj.event_id},
          ${obj.calendly_user_id},
          ${obj.created_at},
          ${obj.event_type},
          ${obj.event_type_name},
          ${obj.reason},
          ${obj.start_time},
          ${obj.start_time_pretty},
          ${obj.end_time},
          ${obj.end_time_pretty},
          ${obj.location},
          ${obj.canceled},
          ${obj.canceler_name},
          ${obj.cancel_reason},
          ${obj.cancel_at},
          ${obj.old_event_id},
          ${obj.new_event_id},
        )`
      );
      console.log("result is ", result)

  }

}

module.exports = Appointment;