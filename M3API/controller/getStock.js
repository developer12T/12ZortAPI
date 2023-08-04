const express = require("express");
const getStock = express.Router();
const { Stock } = require("../model/stock");
const { Item } = require('../model/Item');
const {Sequelize, AsyncQueueError} = require('sequelize')

getStock.post("/getStock", async (req, res) => {
  try {
    const stocks = []
    const data = await Stock.findAll({
      attributes: { 
        exclude: ["id"],
        include: [ 
          [Sequelize.literal('MLSTQT - MLALQT'), 'available'],
        ]
      }
    });
    for(let i =0 ;i <data.length;i++){

      const itemsName = await Item.findAll({
        attributes:['itemname'],
        where:{itemcode:data[i].itemcode}
      })

      const iname = itemsName[0].itemname;

      const stock = {
        companycode:data[i].companycode,
        warehouse:data[i].warehouse,
        itemcode:data[i].itemcode,
        itemsname:iname,
        location:data[i].location,
        lot:data[i].lot,
        balance:data[i].balance,
        allocated:data[i].allocated,
        available:data[i].available
      }
      stocks.push(stock);

    }
    res.json(stocks);

  } catch (error) {
    console.error(error);
    res.json(error);
  }
}),
  (module.exports = getStock);
