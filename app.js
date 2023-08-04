const express = require('express')

const auth = require('./authen/middleware/auth')
const app = express() ;
const cors = require('cors')
app.use(express.json())


// app.use(cors())
// const corsOptions = {
//     origin: 'http://58.181.206.156:5858/', // กำหนดโดเมนของลูกค้าที่ยอมรับ cross-origin requests
//     methods: ['GET', 'POST'], // กำหนดว่าเซิร์ฟเวอร์ยอมรับเฉพาะเมธอด GET และ POST
//     allowedHeaders: ['Content-Type', 'Authorization'], // กำหนด Header ที่ยอมรับจากลูกค้า
//     credentials: true, // ให้เอาข้อมูล authentication credentials ไปกับ cross-origin requests
//   };
  
  app.use(cors());

//zort
const zort = require('./zort/index')

//M3API
const M3API = require('./M3API/index')

//authen
const loginToken = require('./authen/login')
const devLoginToken = require('./authen/devlogin')

//manageUser
const manageUser = require('./manageuser/index')

//zort
app.use('/zort',auth,zort)

// manageUser
app.use('/manageUser',manageUser)

//M3API
app.use('/M3API',M3API)

//authen
app.use('/12Trading',loginToken)
app.use('/12Trading',devLoginToken)


module.exports = app