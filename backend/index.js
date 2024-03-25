const connectToMongo = require('./db');
const express = require('express')

//this functon imported from db.js
connectToMongo();

const app = express()
const port = 5000
app.use(express.json())

//Available routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`iNoteBook listening on port ${port}`)
})