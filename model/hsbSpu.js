const mongoose = require('mongoose');
const Schema = mongoose.Schema;

exports.hsbSpu = new Schema({
    _id: {
        type    : Schema.Types.ObjectId,
        default : new mongoose.Types.ObjectId
    },
    bid         : String,
    pname       : String,
    pid         : String,
    status      : Number,
    tplId       : String,
    categoryId  : Number,
    createTime  : {
        type    : Date,
        default : Date.now,
        index   : true
    },
    updateTime  : {
        type    : Date,
        default : Date.now
    }
},{
    versionKey: false,
    timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
});