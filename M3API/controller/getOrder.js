const express = require('express');
const getOrder = express.Router();
const { NumberSeries, COHead } = require('../model/order');
const { Op, sequelize } = require('sequelize');

getOrder.post('/getNumberSeries', async (req, res) => {
  const series = req.body.series;
  const seriesname = req.body.seriesname;
  const seriestype = req.body.seriestype;
  const companycode = req.body.companycode;
  try {
    if (!series || !seriesname || !seriestype || !companycode) {
      const data = await NumberSeries.findAll({
        attributes: {
          exclude: ['id'],
        },
      });
      res.json(data);
    } else {
      const data = await NumberSeries.findAll({
        attributes: {
          exclude: ['id'],
        },
        where: {
          [Op.or]: [
            {
              companycode: companycode,
              series: series,
              seriestype: seriestype,
            },
            {
              seriesname: {
                [Op.like]: '%${seriesname}%',
              },
            },
          ],
        },
      });

      res.json(data);
    }
  } catch (error) {
    console.error(error);
    res.json(error);
  }
}),
  getOrder.post('/getInvNumber', async (req, res) => {
    const ordertype = req.body.ordertype;
    try {
      if (!ordertype) {
        const data = await COHead.findAll({
          attributes: { exclude: ['id'] },
          attributes: ['ordertype', 'customerordno'],
          group: ['OAORTP','OACUOR']
        });
        res.json(data);

      } else {
        const data = await COHead.findAll({
          attributes: { exclude: ['id'] },
          attributes: ['ordertype', 'customerordno'],
          where: {
            ordertype: ordertype,
          },
          limit: 1,
          order: [
            ['customerordno','DESC']
          ]
        });

        res.json(data);
      }
    } catch (error) {
      console.error(error);
      res.json(error);
    }
  }),
  (module.exports = getOrder);
