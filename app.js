// Include express from node_modules and define server related variables
const express = require('express')
const app = express()
const port = 3000

// setting the route and corresponding response
app.get('/', (req, res) => {
  res.send(`This is my Web App`)
})

// Listen the server when it started
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})
