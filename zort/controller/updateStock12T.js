const express = require('express');
const updateStock12T = express.Router();
const { Op } = require('sequelize');
const { Product } = require('../model/Product') ;

const stock = require('../dataM3/getStock')

updateStock12T.put('/updateStock12T', async (req, res) => { 
    try {
        const data = await stock() ;
        const getItem = await Product.findAll({
            attributes:['id','sku','stock'],
            where:{sku:{[Op.like]: `%${data[0].itemcode}%`}}})
            var sku_s = data[0].itemcode + "_" + data[0].type[1].unit ;
         const updateStock = await Product.update({stock:data[0].type[1].factor},{where:{sku:sku_s}})
       
        res.status(200).json(updateStock)
    } catch (error) {
        res.status(500).json('invalid data')
    }
})

module.exports = updateStock12T;    