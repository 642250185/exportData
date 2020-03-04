const mongoose = require('mongoose');
const Schema = mongoose.Schema;

exports.spuBasisInfo = new Schema({
    _id: {
        type    : Schema.Types.ObjectId,
        default : new mongoose.Types.ObjectId
    },
    channel         : Number,
    bid       : Number,
    bname         : String,
    pid      : Number,
    pname       : String,
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