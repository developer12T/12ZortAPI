const express = require('express');
const getOrder = express.Router();
const {
    Op
} = require('sequelize');
const {
    Order,
    OrderDetail
} = require('../model/Order');
const {
    Customer
} = require('../model/Customer');

getOrder.post('/getOrder', async (req, res) => {
    var page = req.body.page;
    var tab = req.body.tab;
    try {

        if (page == 'receipt') {
            if (tab == 'wait-tab') {
                const data = await Order.findAll({
                    where: {
                        statusprint: '000'
                    }
                });
                const orders = [];

                for (let i = 0; i < data.length; i++) {
                    const itemData = await OrderDetail.findAll({
                        attributes: ['productid', 'sku', 'name', 'number', 'pricepernumber', 'totalprice'],
                        where: {
                            id: data[i].id
                        }
                    });

                    const cusdata = await Customer.findAll({
                        attributes: ['customername'],
                        where: {
                            customerid: data[i].customerid
                        }
                    })

                    const cuss = cusdata[0].customername;
                    const items = itemData.map(item => ({
                        productid: item.productid,
                        sku: item.sku.split('_')[0],
                        unit: item.sku.split('_')[1],
                        name: item.name,
                        number: item.number,
                        pricepernumber: item.pricepernumber,
                        totalprice: item.totalprice
                    }));

                    const order = {
                        id: data[i].id,
                        // saleschannel: data[i].saleschannel,
                        orderdate: data[i].orderdate,
                        orderdateString: data[i].orderdateString,
                        number: data[i].number,
                        customerid: data[i].customerid,
                        status: data[i].status,
                        paymentstatus: data[i].paymentstatus,
                        amount: data[i].amount,
                        vatamount: data[i].vatamount,
                        shippingchannel: data[i].shippingchannel,
                        shippingamount: data[i].shippingamount,
                        shippingstreetAddress: data[i].shippingstreetAddress,
                        shippingsubdistrict: data[i].shippingsubdistrict,
                        shippingdistrict: data[i].shippingdistrict,
                        shippingprovince: data[i].shippingprovince,
                        shippingpostcode: data[i].shippingpostcode,
                        statusprint: data[i].statusprint,
                        saleschannel: data[i].saleschannel,
                        item: items,
                        customer: cuss,
                    };
                    orders.push(order);
                }
                res.json(orders);

            } else if (tab == 'success-tab') {
                const data = await Order.findAll({
                    where: {
                        statusprint: '002'
                    }
                });
                const orders = [];

                for (let i = 0; i < data.length; i++) {
                    const itemData = await OrderDetail.findAll({
                        attributes: ['productid', 'sku', 'name', 'number', 'pricepernumber', 'totalprice'],
                        where: {
                            id: data[i].id
                        }
                    });

                    const cusdata = await Customer.findAll({
                        attributes: ['customername'],
                        where: {
                            customerid: data[i].customerid
                        }
                    })

                    const cuss = cusdata[0].customername;
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

                    const order = {
                        id: data[i].id,
                        // saleschannel: data[i].saleschannel,
                        orderdate: data[i].orderdate,
                        orderdateString: data[i].orderdateString,
                        number: data[i].number,
                        customerid: data[i].customerid,
                        status: data[i].status,
                        paymentstatus: data[i].paymentstatus,
                        amount: data[i].amount,
                        vatamount: data[i].vatamount,
                        shippingchannel: data[i].shippingchannel,
                        shippingamount: data[i].shippingamount,
                        shippingstreetAddress: data[i].shippingstreetAddress,
                        shippingsubdistrict: data[i].shippingsubdistrict,
                        shippingdistrict: data[i].shippingdistrict,
                        shippingprovince: data[i].shippingprovince,
                        shippingpostcode: data[i].shippingpostcode,
                        statusprint: data[i].statusprint,
                        saleschannel: data[i].saleschannel,
                        item: items,
                        customer: cuss,
                    };
                    orders.push(order);
                }


                res.json(orders);

            }
        } else if (page == 'all') {

            const data = await Order.findAll();
            const orders = [];
            for (let i = 0; i < data.length; i++) {

                const itemData = await OrderDetail.findAll({
                    attributes: ['productid', 'sku', 'name', 'number', 'pricepernumber', 'totalprice'],
                    where: {
                        id: data[i].id
                    }
                });

                const cusdata = await Customer.findAll({
                    attributes: ['customername'],
                    where: {
                        customerid: data[i].customerid
                    }
                })

                const cuss = cusdata[0].customername;
                const items = itemData.map(item => ({
                    productid: item.productid,
                    sku: item.sku.split('_')[0],
                    unit: item.sku.split('_')[1],
                    name: item.name,
                    number: item.number,
                    pricepernumber: item.pricepernumber,
                    totalprice: item.totalprice
                }));

                const order = {
                    id: data[i].id,
                    // saleschannel: data[i].saleschannel,
                    orderdate: data[i].orderdate,
                    orderdateString: data[i].orderdateString,
                    number: data[i].number,
                    customerid: data[i].customerid,
                    status: data[i].status,
                    paymentstatus: data[i].paymentstatus,
                    amount: data[i].amount,
                    vatamount: data[i].vatamount,
                    shippingchannel: data[i].shippingchannel,
                    shippingamount: data[i].shippingamount,
                    shippingstreetAddress: data[i].shippingstreetAddress,
                    shippingsubdistrict: data[i].shippingsubdistrict,
                    shippingdistrict: data[i].shippingdistrict,
                    shippingprovince: data[i].shippingprovince,
                    shippingpostcode: data[i].shippingpostcode,
                    statusprint: data[i].statusprint,
                    saleschannel: data[i].saleschannel,
                    item: items,
                    customer: cuss,
                };
                orders.push(order);
            }
            
            res.json(orders);

        } else if (page == 'inv') {

            if (tab == 'wait-tab') {

                const data = await Order.findAll({
                    where: {
                        statusprintINV: 'TaxInvoice',
                        statusPrininvSuccess: '000'
                    }
                });
                const orders = [];

                for (let i = 0; i < data.length; i++) {
                    const itemData = await OrderDetail.findAll({
                        attributes: ['productid', 'sku', 'name', 'number', 'pricepernumber', 'totalprice'],
                        where: {
                            id: data[i].id
                        }
                    });

                    const cusdata = await Customer.findAll({
                        attributes: ['customername'],
                        where: {
                            customerid: data[i].customerid
                        }
                    })


                    const cuss = cusdata[0].customername;
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

                    const order = {
                        id: data[i].id,
                        // saleschannel: data[i].saleschannel,
                        orderdate: data[i].orderdate,
                        orderdateString: data[i].orderdateString,
                        number: data[i].number,
                        customerid: data[i].customerid,
                        status: data[i].status,
                        paymentstatus: data[i].paymentstatus,
                        amount: data[i].amount,
                        vatamount: data[i].vatamount,
                        shippingchannel: data[i].shippingchannel,
                        shippingamount: data[i].shippingamount,
                        shippingstreetAddress: data[i].shippingstreetAddress,
                        shippingsubdistrict: data[i].shippingsubdistrict,
                        shippingdistrict: data[i].shippingdistrict,
                        shippingprovince: data[i].shippingprovince,
                        shippingpostcode: data[i].shippingpostcode,
                        statusprint: data[i].statusprint,
                        saleschannel: data[i].saleschannel,
                        item: items,
                        customer: cuss,
                    };
                    orders.push(order);
                }


                res.json(orders);

            } else if (tab == 'success-tab') {

                const data = await Order.findAll({
                    where: {
                        statusprintINV: 'TaxInvoice',
                        statusPrininvSuccess: '002'
                    }
                });
                const orders = [];

                for (let i = 0; i < data.length; i++) {
                    const itemData = await OrderDetail.findAll({
                        attributes: ['productid', 'sku', 'name', 'number', 'pricepernumber', 'totalprice'],
                        where: {
                            id: data[i].id
                        }
                    });

                    const cusdata = await Customer.findAll({
                        attributes: ['customername'],
                        where: {
                            customerid: data[i].customerid
                        }
                    })

                    const cuss = cusdata[0].customername;
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

                    const order = {
                        id: data[i].id,
                        // saleschannel: data[i].saleschannel,
                        orderdate: data[i].orderdate,
                        orderdateString: data[i].orderdateString,
                        number: data[i].number,
                        customerid: data[i].customerid,
                        status: data[i].status,
                        paymentstatus: data[i].paymentstatus,
                        amount: data[i].amount,
                        vatamount: data[i].vatamount,
                        shippingchannel: data[i].shippingchannel,
                        shippingamount: data[i].shippingamount,
                        shippingstreetAddress: data[i].shippingstreetAddress,
                        shippingsubdistrict: data[i].shippingsubdistrict,
                        shippingdistrict: data[i].shippingdistrict,
                        shippingprovince: data[i].shippingprovince,
                        shippingpostcode: data[i].shippingpostcode,
                        statusprint: data[i].statusprint,
                        saleschannel: data[i].saleschannel,
                        item: items,
                        customer: cuss,
                    };
                    orders.push(order);
                }

                res.json(orders);

            }
        }

    } catch (error) {
        res.status(500).json('invalid data')
        console.log(error);
    }

});


module.exports = getOrder;