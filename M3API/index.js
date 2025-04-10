const express = require('express');
const router = express.Router();

const ItemManage = require('./route/item');
const itemFplusManage = require('./route/itemFplusManage');
const StockManage = require('./route/stock');
const OrderManage = require('./route/order');


router.use('/ItemManage', ItemManage);
router.use('/ItemManage', itemFplusManage);
router.use('/StockManage', StockManage);
router.use('/OrderManage', OrderManage);

module.exports = router