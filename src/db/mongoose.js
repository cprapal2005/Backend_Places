const mongoose = require('mongoose')

mongoose.connect(process.env.LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})