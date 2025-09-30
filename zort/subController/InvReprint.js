const express = require('express');
const getOrder = express.Router();
const { Op } = require('sequelize');
const { OrderHis } = require('../model/Order');

async function InvReprint(res, dateFilter = {}) {
    try {
        let whereClause = {};

        // เพิ่มเงื่อนไขวันที่ถ้ามีการส่งเข้ามา
        if (dateFilter.startDate && dateFilter.endDate) {
            whereClause = {
                updatedatetime: {
                    [Op.gte]: dateFilter.startDate,
                    [Op.lte]: dateFilter.endDate
                }
            };
        }

        const data = await OrderHis.findAll({
            attributes: ['updatedatetime', 'number', 'id', 'saleschannel', 'invno', 'cono'],
            where: whereClause,
            order: [
                ['updatedatetime', 'ASC'],
                ['invno', 'ASC']
            ]
        });

        return data;
    } catch (error) {
        console.log(error);
        return { status: 'dataNotFound' };
    }
}
  
  module.exports = InvReprint;