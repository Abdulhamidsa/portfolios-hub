const dotenv = require('dotenv')
const mongoose = require('mongoose')

dotenv.config({ path: '.env.test' })

const console = require('console')
global.console = console

//
// This line is added to make sure mongoose throws an error if we are trying to access the database
// but no connection have been made, Otherwise it would fail siletly
//
mongoose.set('bufferCommands', false)
