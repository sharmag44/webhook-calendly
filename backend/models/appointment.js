// const db = require("../db");

class Appointment {

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