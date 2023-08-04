const { sequelize,DataTypes } = require('../config/dbconnect');

const Item = sequelize.define('MITMAS', {
    companycode: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'MMCONO'
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'MMSTAT'
    },
    itemcode: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'MMITNO'
    },
    itemname: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'MMFUDS'
    },
    itemtype: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'MMITTY'
    },
    itemgroup: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'MMCFI3'
    }
  },{freezeTableName:true,timestamps:false,createdAt:false,updatedAt:false,primaryKey:false});

  const ItemConvert = sequelize.define('MITAUN', {
    companycode: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'MUCONO'
    },
    factype: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'MUAUTP'
    },
    itemcode: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'MUITNO'
    },
    unit: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'MUALUN'
    },
    factor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'MUCOFA'
  }
  },{freezeTableName:true,timestamps:false,createdAt:false,updatedAt:false,primaryKey:false});

module.exports = {
    Item,
    ItemConvert,
};