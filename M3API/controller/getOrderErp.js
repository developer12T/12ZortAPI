const express = require('express');
const getOrderErp = express.Router();
const { Op, sequelize } = require('sequelize');
const axios = require('axios')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const { Sequelize, DataTypes, QueryTypes } = require('sequelize');
const { log } = require('console');
require('dotenv').config();
require('moment/locale/th');
// const currentDate = moment().utcOffset(7).format('YYYY-MM-DDTHH:mm');
const currentDate = moment().format('YYYY-MM-DDTHH:mm:ss.SSSZ');

getOrderErp.post('/getOrderErp', async (req, res) => {

    const sequelize = new Sequelize(process.env.databaseerp, process.env.user, process.env.password, {
        dialect: process.env.dialact,
        host: process.env.server,
    });
    try {

        const data_orders = [];
        const query = `
                    SELECT OAOREF FROM [dbo].[data_order]`;

        const replacements = {}
        const result = await sequelize.query(query, {
            replacements,
            type: sequelize.QueryTypes.INSERT
        });

        for (const data of result[0]) {
            const data_order = {
                number: data.OAOREF
            }
            data_orders.push(data_order)
        }
        // if (data_orders.length){
        //   res.json(data_orders);
        // } else {
        //   res.json({status : 'error', message: 'no data'});
        // }
        const uniqueData = new Set(data_orders.map(item => JSON.stringify(item)));
        const combinedData = Array.from(uniqueData).map(item => JSON.parse(item));

        res.json(combinedData);
    } catch (error) {
        console.log(error)
        res.json('Invalid data')
    }
}),

    getOrderErp.post('/getOrderErpToShow', async (req, res) => {
        const sequelize = new Sequelize(process.env.databaseerp, process.env.user, process.env.password, {
            dialect: process.env.dialact,
            host: process.env.server,
        });
        try {

            const data_orders = [];
            const query = `
                    SELECT OAOREF FROM [dbo].[data_order] WHERE STATUS = 0`;

            const replacements = {}
            const result = await sequelize.query(query, {
                replacements,
                type: sequelize.QueryTypes.INSERT
            });


            for (const data of result[0]) {
                const data_order = {
                    number: data.OAOREF
                }
                data_orders.push(data_order)
            }
            // if (data_orders.length){
            //   res.json(data_orders);
            // } else {
            //   res.json({status : 'error', message: 'no data'});
            // }
            const uniqueData = new Set(data_orders.map(item => JSON.stringify(item)));
            const combinedData = Array.from(uniqueData).map(item => JSON.parse(item));

            res.json(combinedData);
        } catch (error) {
            console.log(error)
            res.json('Invalid data')
        }
    }),

    module.exports = getOrderErp
