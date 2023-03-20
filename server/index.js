const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const colors = require('colors');
const schema = require('./schema/schema')

require('dotenv').config();
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');



const port = process.env.PORT || 5000;

const app = express();
 app.use(express.static('public'));

//Connect to database
connectDB();
app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV !== 'production'
}))


//app.use(express.static(path.join(__dirname, '..', 'public', 'index.jtml')));


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
  


  //here is the magic

app.get('*', (req, res) => {
  //  res.sendFile(path.resolve(__dirname, '..', 'public','index.html'));
    res.sendFile(path.resolve(__dirname, '..', 'vcapp','build'));
  });
  




app.listen(port, console.log(`Server running on port ${port}`));