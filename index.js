var express = require('express');
var app = express()
var port = 4000
const { graphqlHTTP } = require('express-graphql')
const schema = require('./Schemas')
//GraphQl Setup
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: false
}))
//Server Initialization
app.listen(port, () => console.log(`Server is running on port ${port}`));

