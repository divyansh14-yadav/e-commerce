import express from 'express'
import Cart from '../models/cart.js'
import Stripr from 'stripe'
import Product from '../models/product.js'
import Order from '../models/order.js'
import User from '../models/user.js'
import dotenv from 'dotenv'
dotenv.config()


var p = process.env.PUBLISH_KEY
var s = process.env.SECRET_KEY
const stripe = new Stripr(s);


const orderController = express.Router()

const pay = async(req,res) =>{
    res.render('Home', {
        key: p,
        Secret_Key:s
        })
}

// order post
const postOrder = async (req,res)=>{



  const postedby = req.user._id

  const cart = await Cart.find({postedby:req.user._id}).populate("postedby", "_id firstName")

if(cart){

  var total = 0
  var qty = 0
  var  userd =[]


  var data= await cart.map(async (ele,i)=> {

  
    let products = ele.items

    console.log(products)
    total = 0;

    products.forEach(pr=>{
      total+= pr.price * pr.quantity
     
     
      console.log('price',pr.price);
      console.log('quant',pr.quantity);
    })

    //  products.map((val)=>{
      var session= await stripe.checkout.sessions.create({
        line_items: products.map(pr => {
          return {
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: 'hello',
                        description: pr.description
                      },
                      unit_amount: pr.price * 100,
                  },
                  quantity: pr.quantity,
          }
        }),  
  
        mode: "payment",
        success_url: 'http://localhost:8000/success',
        cancel_url: 'http://localhost:8000/cancel',
       
       })
        res.send({url:session.url})
       const del= await Cart.findByIdAndDelete(cart)
       })
       }else{
         res.status(400).send({ message: "already placed order" })
       }

}
  



// order success
const successOrder = async (req,res) =>{

  res.status(200).send({message:"successfully placed order"})
}

// order cancle
const cancleOrder = async (req,res) =>{

  res.status(200).send({message:"cancle your order"})
}

const saveorder=async(req,res)=>{
  const postedby = req.user._id

  const cart = await Cart.find({postedby:req.user._id}).populate("postedby", "_id firstName")

  //   // console.log('cart',cart)
  
  //   // var data = cart.map((ele,i)=> ele.items[i].title)
  // var data=  cart.map(async (ele,i)=> {
  //   console.log(ele.postedby);
   
  //   let products = ele.items
  //   // console.log(ele.items);
  //   products.forEach(pr=>{
     
  //     // console.log('price',pr.price);
  //     // console.log('quant',pr.quantity);
   
  //   const order = new Order({
  //     user:{
  //       id:req.user
  //     },
  //     items:{
        
  //         price:pr.price,
  //         quantity:pr.quantity
  //     },
  //   });


  //    order.save();
  //   })  
  //   res.send("save")
  // })    


  var data=  cart.map(async (ele,i)=> {
    let products=ele.items
    console.log(products);
 products.forEach(pr=>{
     
      console.log('price',pr.price);
      console.log('quant',pr.quantity);
 })

 const vs=products

 var da=  products.map(async (pr,i)=> {
 
 const order = new Order({
        user:{
          id:req.user
        },
        items:{
          
            price:pr.price,
            quantity:pr.quantity
        },
      })
  
  
       order.save();
      })  
      res.send("save")
      

})

}





export default {
  orderController,
  postOrder,
  pay,
  successOrder,
  cancleOrder,
  saveorder
  }