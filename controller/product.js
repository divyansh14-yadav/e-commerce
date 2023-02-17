import express from "express";
import Product from "../models/product.js";
import fileUpload from 'express-fileupload'
import { v2 as cloudinary } from 'cloudinary'
import { url } from "inspector"
import multer from "multer";
import * as path from 'path';
const productController = express.Router();


// post the product
const postProduct =  async(req, res, next) => {
 
  try {
    if (!req.file) {
      res.status(401).send({ message: "please select image" });

    } else {
      const { title, price, description } = req.body;

      let image = req.file.path;

      if (!title || !price || !description || !image) {
        res.status(400).send({ error: "please fill the data" });

      } else {
        (req.user.password = undefined), // password ko show nhi krwane ke ley
          (req.user.cpassword = undefined),
          (req.user.email = undefined),
          (req.user.token = undefined),
          (req.user.firstName = undefined);

        const user = new Product({
          title,
          price,
          description,
          postedby: req.user, //req.user me user login ki details hai
          image,
        });

        await user.save();
        res.status(200).json({
          status: "Success",
          message: "Create Post successfully.",
          post:user
        })
      }
    }
  } catch (error) {
    res.status(400).send({ error: error });
  }


};

// get the product
const getProducts = async (req,res,next) =>{

    try{

        const get= await  Product.find({postedby:req.user._id}).populate("postedby", "_id firstName")

            res.status(200).json({
              status: "Success",
              message: 'Fetched posts successfully.',
              post: get
            })
      }
        catch(error)
        {
        res.status(400).send({error: error})
        }
}


// get product by id
const getProduct = async (req,res,next) =>{

    try{
        const _id= req.params.id
    
        const getid= await Product.findById(_id)
    
        // res.status(200).send(getid)
        res.status(200).json({
          status: "Success",
          message: 'Post fetched.',
          post: getid
        })        
      }
        catch(error)
        {
            res.status(400).send(error)
        }
}

// delete product
const deleteProduct = async (req,res,next) =>{
    try{
        const _id= req.params.id

        const del= await Product.findByIdAndDelete(_id)

        res.status(200).json({ message: 'Deleted post.' });
    }
    catch(error)
    {
        res.status(500).send(error)
    }
}

// update product
const updateProduct = async (req,res,next) =>{

  try {
    const {  title, price ,description} = req.body;
    const _id= req.params.id

    const image= req.file.path

    var user = await Product.findByIdAndUpdate(_id,{
      title,price,description,
      image,
      new:true
    })
    user.save()

    res.status(200).json({
      status: "Success",
       message: 'Post updated!',
       post:user
    })
    
  } catch (error) {
    res.status(400).send({error:"token is invalid user not found"})
  }

}


// deshboard products
const dashProduct = async (req,res,next) =>{

  try{

    const get= await  Product.find({})

        res.status(200).json({
          status: "Success",
          message: 'Fetched dashBoard product successfully.',
          products: get
        })
  }
    catch(error)
    {
    res.status(400).send({error: error})
    }
}

// pagination 
const pagination = async (req,res,next) =>{

  try {

    const { page = 1, limit = 150, sort,} = req.query;


    const data = await Product.find({ })

      .sort({ [sort]: 1 })        // sorting name, id ,etc

      .limit(limit * 1)       // apply limit to show data

      .skip((page - 1) * limit)     // pagination formula

    res.status(200).send({ page: page, limit: limit, data: data })


  } catch (error) {

   res.status(400).send(error)
  }
}

// search products
const search = async (req,res) =>{
  try {

    const { search = "" } = req.query;


    const data = await Product.find({ title: { $regex: search, $options: "i" } })


    res.status(200).send({ data: data })

    const total = await Product.countDocuments({

      title: { $regex: search, $options: "i" }   // search name according

    });
  } catch (error) {

    res.status(400).send(error)
  }
}


export default {
  productController,
  postProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  dashProduct,
  pagination,
  search
};
