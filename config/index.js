const path = require('path');

const config = {
    mongodb: {
        host: '139.199.59.215', // >> 4
        port: 8777,
        dbname: 'pricedb'
    },
    DOWNLOAD_PATH: path.join(__dirname, '..','download'),
    env: function () {
        global.$config = this;
        return global.$config;
    }
};


module.exports = config.env();