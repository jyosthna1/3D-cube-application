const mongoose = require("mongoose")

const cubeSchema = new mongoose.Schema({
    cubeId : {type:String},
    position:{
        x:{
            type:Number,
        },
        y:{
            type:Number,
        },
        z:{
            type:Number,
        }
    },
    rotationSpeed:{
        type:Number,
    },
    lastSaved:{
        type: Date,
        default:null,
    },
    updatedAt:{
        type:Date,
        default: Date.now(),
    }
})


module.exports = mongoose.model("CubeModelSchema",cubeSchema)