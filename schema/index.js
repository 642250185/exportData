const mongoose = require('mongoose');
const config = require('../config');

const {host, port, dbname} = config.mongodb;

(async()=>{
    try {
        mongoose.connect(`mongodb://${host}:${port}/${dbname}`,{useNewUrlParser: true});
        mongoose.Promise = global.Promise;
        global.$mongoose = mongoose;
    } catch (e) {
        console.error(`failed to connect to server [${host}:${port}]`);
    }
})();

const {ahsSpu} = require('../model/ahsSpu');
const {hsbSpu} = require('../model/hsbSpu');
const {whshtSpu} = require('../model/whshtSpu');


const syncDB = () => {
    global['$ahsSpu'] = mongoose.model('ahsSpu', ahsSpu, 'ahsSpu');
    global['$hsbSpu'] = mongoose.model('hsbSpu', hsbSpu, 'hsbSpu');
    global['$whshtSpu'] = mongoose.model('whshtSpu', whshtSpu, 'whshtSpu');
};


syncDB();