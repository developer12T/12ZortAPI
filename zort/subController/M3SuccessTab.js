const express = require('express');
const getOrder = express.Router();
const { Op } = require('sequelize');
const { OrderHis,OrderDetailHis } = require('../model/Order');
const { Customer } = require('../model/Customer');

async function M3SuccessTab(res) {
    try {
        const data = await OrderHis.findAll({});
        const orders = [];
    
        for (let i = 0; i < data.length; i++) {
            const itemData = await OrderDetailHis.findAll({
                attributes: ['productid', 'sku', 'name', 'number', 'pricepernumber', 'totalprice'],
                where: {
                    id: data[i].id
                }
            });
    
            const cusdata = await Customer.findAll({
                attributes: ['customername','customerid'],
                where: {
                    customerid: data[i].customerid
                }
            })
    
    
            // const cuss = cusdata[0].customername;
            const cuss = cusdata[0]?.customername || '';
            // console.log(itemData);
    
            // console.log(cuss)
            // var itskulist = listofdetail.sku.split('_')[1] ;
            const items = itemData.map(item => ({
                productid: item.productid,
                sku: item.sku.split('_')[0],
                unit: item.sku.split('_')[1],
                name: item.name,
                number: item.number,
                pricepernumber: item.pricepernumber,
                totalprice: item.totalprice
            }));


            if(data[i].status === 'Success'){
                var statusText = 'สำเร็จ'
            }else if(data[i].status === 'Voided'){
                var statusText = 'ยกเลิก'
            }else if(data[i].status === 'Waiting'){
                var statusText = 'รอส่ง'
            }else if(data[i].status === 'Pending'){
                var statusText = 'รอโอน'
            }else{
                var statusText = 'พบข้อผิดพลาด'
            }

            if(data[i].paymentstatus === 'Paid'){
                var paymentstatusText = 'ชำระแล้ว'
            }else if(data[i].paymentstatus === 'Voided'){
                var paymentstatusText = 'ยกเลิก'
            }else if(data[i].paymentstatus === 'Pending'){
                var paymentstatusText = 'รอชำระ'
            }else{
                var paymentstatusText = 'พบข้อผิดพลาด'
            }

            if(data[i].isCOD == '1'){
                var isCOD = 'เก็บปลายทาง'
            }else{
                var isCOD = 'ไม่เก็บปลายทาง'
            }

    
            const order = {
                id: data[i].id,
                // saleschannel: data[i].saleschannel,
                cono:data[i].cono,
                invno:data[i].invno,
                orderdate: data[i].orderdate,
                orderdateString: data[i].orderdateString,
                number: data[i].number,
                customerid: data[i].customerid,
                status: data[i].status,
                statusText:statusText,
                paymentstatus: data[i].paymentstatus,
                paymentstatusText:paymentstatusText,
                amount: data[i].amount,
                vatamount: data[i].vatamount,
                shippingchannel: data[i].shippingchannel,
                shippingamount: data[i].shippingamount,
                shippingstreetAddress: data[i].shippingstreetAddress,
                shippingsubdistrict: data[i].shippingsubdistrict,
                shippingdistrict: data[i].shippingdistrict,
                shippingprovince: data[i].shippingprovince,
                shippingpostcode: data[i].shippingpostcode,
                createdatetime:data[i].createdatetime,
                statusprint: data[i].statusprint,
                totalprint:data[i].totalprint,
                saleschannel: data[i].saleschannel,
                item: items,
                customer: cuss,
                isCOD:isCOD
            };
            orders.push(order);
        }
    
        return orders;
    } catch (error) {
      return  { status: 'dataNotFound' };
    }
  }
  
  module.exports = M3SuccessTab;