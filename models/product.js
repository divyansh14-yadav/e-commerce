import mongoose from "mongoose";
var Schema= mongoose.Schema
const {ObjectId}= mongoose.Schema.Types


const productSchema=new mongoose.Schema({

    title: {
        type: String,
      },
    price:{
        type:Number
    },
    description:{
        type:String
    },
    image:{
        type: String,
        },
        postedby:{
            type:ObjectId,
            ref:"user"
            },

},{versionKey: false})


const Product=mongoose.model('udproduct',productSchema)

export default Product