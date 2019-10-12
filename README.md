# Calendly demo 
This is simple sandbox app to try Calendly API. 

# How to set up
- Run `npm install` in both backend and frontend directory
- Run `psql < data.sql` in backend directory

# How to run code
- Create account with Calendly and get API token and username
- At frontend/calendly.js, edit `data-url="https://calendly.com/yourUsername"`
- Run `npm start` in both backend and frontend directory
- Install [ngrok](https://ngrok.com/) to get your localhost to public URL temporary
- At directory ngrok installed, run `./ngrok http 8000` in ternimal and copy URL that they provides
- Using server interaction tool such as Insomnia to connect and establish Calendly webhook
- Now ready to go!

# How to run test
- Run `npm test` at backend directory

# Technologies
- Express.js
- React.js
- Jest/supertest
- bcrypt
- jwt 
- ngrok
- calendly api

### TRAVIS CI
[![Build Status](https://travis-ci.com/emitamago/webhook-calendly.svg?branch=master)](https://travis-ci.com/emitamago/webhook-calendly)
