DROP DATABASE IF EXISTS "calendly";
CREATE DATABASE "calendly";
\c "calendly"

CREATE TABLE users (
  id serial PRIMARY KEY,
  email TEXT NOT NULL,
  password TEXT NOT NULL,
  is_admin BOOLEAN DEFAULT FALSE,
  first_name TEXT,
  last_name TEXT,
  current_company TEXT,
  hire_date DATE,
  needs TEXT,
  goals TEXT
);

-- More data available from calendly webhook response. 
-- These are required and other potentially useful fields for elevate.
-- event_type can be "One-on-One" or "Group" 

-- Rescheduling an appt in calendly results in canceled: true for original event and creation of new event record
-- This is cross referenced as the old_event_id and new_event_id

-- Changed timestamp to text so that we can query record using value from calendly obj 
-- calendly server generates timestamps
CREATE TABLE appointments (
  id serial PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  event_id TEXT NOT NULL,
  calendly_user_id TEXT NOT NULL,
  created_at TEXT,
  event_type TEXT,
  event_type_name TEXT,
  reason TEXT,
  admin_notes TEXT DEFAULT NULL,
  start_time TEXT NOT NULL,
  start_time_pretty TEXT NOT NULL,
  end_time TEXT NOT NULL,
  end_time_pretty TEXT NOT NULL,
  location TEXT,
  canceled BOOLEAN NOT NULL,
  canceler_name TEXT,
  cancel_reason TEXT,
  canceled_at TEXT,
  old_event_id TEXT,
  new_event_id TEXT
);

-- Table for associating elevate user id with calendly user ids
-- Use this to identify which professional an elevate user has scheduled an appointment with
-- by collecting the calendly user id from the appointment response object
CREATE TABLE users_calendly_users (
 user_id INTEGER NOT NULL REFERENCES users (id),
 calendly_user_id TEXT NOT NULL
);

-- Update elevate users table to include Emi record - required for testing Calendly integration
INSERT INTO users (email, password, is_admin, first_name, last_name, current_company, hire_date, needs, goals) VALUES
  ('testuser@gmail.com', 'password123', false, 'Test', 'User', 'Google', '2018-06-23', 'Talk to financial advisor about salary/equity negotiations.', 'Increase in equity.'),
  ('admin@gmail.com', 'admin123', true, 'Admin', 'User', '', '2019-06-23', '', ''),
   ('gioramlevi515@gmail.com', 'secret', false, 'Emi', 'User', '', '2019-06-23', '', ''),
  ('nate@gmail.com', 'nate123', false, 'Nate', 'Lipp', 'Rithm', '2019-06-23', 'Get help from a lawyer.', 'Increase in salary.'),
  ('elie@gmail.com', 'elie123', false, 'Elie', 'Schoppik', 'Rithm', '2017-06-01', 'Talk to financial advisor to calculate how many instructors he can hire.', 'Recruit more instructors.'),
  ('joel@gmail.com', 'joel123', false, 'Joel', 'Burton', 'Rithm', '2017-08-23', 'General investment advice', 'Help bootcamp grads negotiate.');

INSERT INTO appointments (user_id, event_id, calendly_user_id, created_at, event_type, event_type_name, reason, admin_notes, start_time, start_time_pretty, end_time, end_time_pretty, location, canceled, canceler_name, cancel_reason, canceled_at, old_event_id, new_event_id) VALUES
  (3, 'BCHFF2F62BWNJVPP', 'ABCFF2F62BWNJVPP', '2019-08-29T09:15:00-07:00', 'One-on-One', '30 Minute Meeting', 'legal advice', null, '2019-08-31T09:15:00-07:00', '09:15 am - Saturday, August 31, 2019', '2019-08-31T09:45:00-07:00','09:45 am - Saturday, August 31, 2019', 'Zoom', false, null, null, null, null, null),
  (3, 'GCIEBYAHGKWNENHS', 'BCHFF2F62BWNJVPP', '2019-08-27T14:00:29-07:00', 'One-on-One', '15 Minute Meeting', 'consult with a lawyer', null, '2019-08-30T14:00:29-07:00','02:00 pm - Friday, August 30, 2019', '2019-08-30T14:15:29-07:00', '02:15 pm - Friday, August 30, 2019', 'Zoom', false, null, null, null, null, null),
  (3, 'AAFOAUQKKVOBSZVD', 'BCHFF2F62BWNJVPP', '2019-08-27T16:30:00-07:00', 'One-on-One', '30 Minute Meeting', 'negotiate my salary', null, '2019-09-02T16:30:00-07:00', '04:30 pm - Moday, September 2, 2019', '2019-09-02T17:00:00-07:00',  '05:00 pm - Moday, September 2, 2019','Zoom', false, null, null, null, null, null),
  (4, 'EGMBBYHHDUZTVUKA', 'BCHFF2F62BWNJVPP', '2019-08-27T12:01:01-07:00', 'One-on-One', '60 Minute Meeting', 'legal advice', null, '2019-08-29T16:30:00-07:00', '04:30 pm - Thursday, August 29, 2019', '2019-08-29T17:30:00-07:00', '04:30 pm - Thursday, August 29, 2019','Zoom', true, 'Emi Tsukuda', 'too many meetings', '2019-08-29T09:15:00-07:00', 'BCHFF2F62BWNJVZZ', null),
  (5, 'FDLGUGK6SOB54B3G', 'BCHFF2F62BWNJVPP', '2019-08-27T14:00:29-07:00', 'One-on-One', '30 Minute Meeting', 'consult with a lawyer', null, '2019-08-30T11:30:00-07:00', '11:30 am - Friday, August 30, 2019','2019-08-30T12:00:00-07:00', '12:00 pm - Friday, August 30, 2019','Zoom', true, 'Stephanie Simms', 'meetings hate em', '2019-08-28T09:15:00-07:00', 'BCHFF2F62BWNJVAA', null);

INSERT INTO users_calendly_users (user_id, calendly_user_id) VALUES
  (1, 'ABCFF2F62BWNJVPP'),
  (2, 'BCHFF2F62BWNJVPP');


-- JSON SCHEMA 
--  {"event_id": "BCHFF2F62BWNJVPP",
--   "user_email": "testuser@gmail.com",
--   "calendly_user_id": "ABCFF2F62BWNJVPP",
--   "created_at": "2019-08-29T09:15:00-07:00",
--   "event_type": "One-on-One",
--   "event_type_name": "30 Minute Meeting",
--   "reason": "legal advice",
--   "admin_notes": "also wants to discuss salary negotiation",
--   "start_time": "2019-08-31T09:15:00-07:00",
--   "start_time_pretty": "09:15am - Saturday, August 31, 2019",
--   "end_time": "2019-08-31T09:45:00-07:00",
--   "end_time_pretty": "09:45am - Saturday, August 31, 2019",
--   "location": "Zoom",
--   "canceled": true,
--   "canceler_name": "Emi Tsukuda",
--   "cancel_reason": "too many meetings",
--   "canceled_at": "2019-08-27T14:00:29-07:00",
--   "old_event_id": "BCHFF2F62BWNJVZZ",
--   "new_event_id": "ACHFF2F62BWNJVZZ"
--   }
