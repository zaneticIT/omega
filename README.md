In the project directory, you can run:

### `cd ./frontend/src`
### `npm start`

### `cd ./backend/src`
### `node server.js`

Add the omega.sql file inside ./backend/src into your MySQL and run to build the database and tables needed.

### Adjust the ports for API calls(frontend/src/ugovori.js, artikli.js, ugovoriForm.js, functions.js and backend/src/server.js for mysql connection) or use my ports at 3000 for website, 3002 for server. MySQL should connect automatically.
### Only data that should be changed is inside backend/src/server.js at line 21.