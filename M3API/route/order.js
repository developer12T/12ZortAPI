const express = require('express');
const OrderManage = express.Router();

const Order = require('../controller/getOrder')
const updateNumberRunning = require('../controller/updateNumberRunning')

OrderManage.use('/order',Order);
OrderManage.use('/order',updateNumberRunning);

module.exports = OrderManage;