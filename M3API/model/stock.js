const { sequelize,DataTypes } = require('../config/dbconnect');
const { Item } = require('./Item');

const Stock = sequelize.define('MITLOC', {
  companycode: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'MLCONO'
    },
    warehouse: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'MLWHLO'
    },
    itemcode: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'MLITNO'
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'MLWHSL'
    },
    lot: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'MLBANO'
    },
    balance: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'MLSTQT'
    },
    allocated: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'MLALQT'
    }
  },{freezeTableName:true,timestamps:false,createdAt:false,updatedAt:false,primaryKey:false});

  // Item.hasMany(Stock);
  // Stock.belongsTo(Item);

  module.exports = {
    Stock,
};