const path = require('path');

const config = {

    production: {
        mongodb: {
            host: '139.199.59.214',
            port: 8777,
            dbname: 'pricedb'
        },
        DOWNLOAD_PATH: path.join(__dirname, '..','download')
    },

    development: {
        mongodb: {
            host: '139.199.59.214',
            port: 8777,
            dbname: 'pricedb'
        },
        DOWNLOAD_PATH: path.join(__dirname, '..','download')
    },

    env: function () {
        return global.$config = this.production
    }
};


module.exports = config.env();