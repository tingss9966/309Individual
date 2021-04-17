const express = require("express");
// starting the express server
const app = express();


app.use(express.static("pub"))


const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
})