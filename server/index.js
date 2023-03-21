const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const colors = require('colors');
require('dotenv').config();
const schema = require('./schema/schema')
const connectDB = require('./config/db');
const cors = require('cors');


const port = process.env.PORT || 5000;

const app = express();


//Connect to database
connectDB();
app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql : process.env.NODE_ENV ==='production'
}))

app.listen(port, console.log(`Server running on port ${port}`));






// const express = require('express');
// const { graphqlHTTP } = require('express-graphql');
// const colors = require('colors');
// const schema = require('./schema/schema')

// require('dotenv').config();
// const connectDB = require('./config/db');
// const cors = require('cors');
// const path = require('path');

// const port = process.env.PORT || 5000;

// const app = express();

// // Serve static files from the client build directory
// app.use(express.static(path.join(__dirname, '..', 'client', '.next', 'static')));

// //Connect to database
// connectDB();
// app.use(cors());

// app.use('/graphql', graphqlHTTP({
//     schema,
//     graphiql: process.env.NODE_ENV !== 'production'
// }));

// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).send('Something broke!');
// });

// module.exports = app;
