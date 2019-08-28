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

-- More data available from calendly. 
-- These are required and potentially useful fields for elevate.
-- event_type is "One-on-One" or "Group" 

-- Rescheduling an appt in calendly results in canceled true and creation of new record
-- Changing an appt
CREATE TABLE appointments (
  id serial PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  event_uuid TEXT NOT NULL,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  event_type TEXT,
  reason TEXT,
  admin_notes TEXT,
  event_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  location TEXT,
  canceled BOOLEAN NOT NULL,
  canceler_name TEXT,
  cancel_reason TEXT,
  canceled_at TIMESTAMP
);

INSERT INTO users (email, password, is_admin, first_name, last_name, current_company, hire_date, needs, goals) VALUES
  ('testuser@gmail.com', 'password123', false, 'Test', 'User', 'Google', '2018-06-23', 'Talk to financial advisor about salary/equity negotiations.', 'Increase in equity.'),
  ('admin@gmail.com', 'admin123', true, 'Admin', 'User', '', '2019-06-23', '', ''),
  ('nate@gmail.com', 'nate123', false, 'Nate', 'Lipp', 'Rithm', '2019-06-23', 'Get help from a lawyer.', 'Increase in salary.'),
  ('elie@gmail.com', 'elie123', false, 'Elie', 'Schoppik', 'Rithm', '2017-06-01', 'Talk to financial advisor to calculate how many instructors he can hire.', 'Recruit more instructors.'),
  ('joel@gmail.com', 'joel123', false, 'Joel', 'Burton', 'Rithm', '2017-08-23', 'General investment advice', 'Help bootcamp grads negotiate.');

INSERT INTO appointments (user_id, event_uuid, created_at, updated_at, event_type, reason, admin_notes, event_date, start_time, end_time, location, canceled, canceler_name, cancel_reason, canceled_at) VALUES
  (1, 'BCHFF2F62BWNJVPP', '2019-08-29T09:15:00-07:00', null, 'One-on-One', 'legal advice', null, '2019-09-02', '15:00', '15:30', 'Zoom', false, null, null, null),
  (2, 'GCIEBYAHGKWNENHS', '2019-08-27T14:00:29-07:00', null, 'One-on-One', 'consult with a lawyer', null, '2019-09-19', '10:00', '10:15', 'Zoom', false, null, null, null),
  (3, 'AAFOAUQKKVOBSZVD', '2019-08-27T16:30:00-07:00', null, 'One-on-One', 'negotiate my salary', null, '2019-09-12', '12:00', '12:30', 'Zoom', false, null, null, null),
  (4, 'EGMBBYHHDUZTVUKA', '2019-08-27T12:01:01-07:00', '2019-08-27T14:00:29-07:00', 'One-on-One', 'legal advice', null, '2019-09-02', '09:00', '10:00', 'Zoom', true, 'Emi Tsukuda', 'too many meetings', '2019-08-29T09:15:00-07:00'),
  (5, 'FDLGUGK6SOB54B3G', '2019-08-27T14:00:29-07:00', '2019-08-29T09:15:00-07:00', 'One-on-One', 'consult with a lawyer', null, '2019-08-29', '11:30', '12:00', 'Zoom', true, 'Stephanie Simms', 'meetings hate em', '2019-08-28T09:15:00-07:00');

