const express = require('express')
const cors = require('cors')
require('./db/mongoose')
const userRouter = require('./routers/user')
const houseRouter = require('./routers/house')

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(cors())
app.use(userRouter)
app.use(houseRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})