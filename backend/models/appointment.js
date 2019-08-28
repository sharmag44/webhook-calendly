// const db = require("../db");

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

  static async findAllActiveAppointments() {
    const result = await db.query(
      `SELECT username, first_name, last_name, email
        FROM appointments
        ORDER BY username`
    );

    return result.rows;
  }

}

module.exports = Appointment;