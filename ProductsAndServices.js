
//for all the apis 
const {Products} = require('./models/product');
const {Services} = require('./models/services');
const  { dbconn1} = require('./connect/connect-products');
const mongoose = require('mongoose');
const express = require('express');
const multer = require('multer');
const router = express.Router();
const fs = require('fs');
router.use(express.json());
//storage for photos
const Storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
      },
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    },
}); 
//upload function
const upload = multer({
    storage : Storage
}).single('testImage')

//get  all products
router.get('/products' ,async(req,res)=>{
            try{
                const products = await Products.find()
                return res.status(200).json({
                        message :"retrieved data succesfully",
                        products
                    })
                }
            catch(err){
                return res.status(500).json({
                    message:"somehting went wrong"
                })

         }
})
//get all services list
router.get('/services' ,async(req,res)=>{
    try{
        const products = await Services.find()
        return res.status(200).json({
                message :"retrieved data succesfully",
                products
            })
        }
    catch(err){
        return res.status(500).json({
            message:"somehting went wrong"
        })

 }
})
//add a new service
router.post('/Services/add' ,  async(req,res)=>{
    upload(req,res,(err)=>{
        try {
            const TypeOfService = req.body.TypeOfService;
            const Cost = req.body.Cost;
            const Servicedescription = req.body.Servicedescription;
            const Availability = req.body.Availability;
            const serviceImage = { data: fs.readFileSync( "uploads/"+ req.file.filename) ,
                                  contentType: 'image/png'} 

            if(TypeOfService== "" || TypeOfService == undefined)
            {
                return res.status(400).json({
                    message :"please enter a name"
                })
            }
            if(Cost == "" ||Cost == undefined)
            {
               return  res.status(400).json({
                    message :"please enter a price"
                })
            }
            if(Servicedescription == "" || Servicedescription == undefined)
            {
                return res.status(400).json({
                    message :"please enter a description"
                })
            }
        
                const ServiceObj = { TypeOfService , Cost , Servicedescription , Availability, serviceImage};
                const services = new Services(ServiceObj);
                 services.save()
                    return res.status(200).json({
                       message:"data saved succesfully",
                       ServiceObj
                    })
        } catch (err) {
            return res.status(500).json({
                message:"something went wrong",
                error: err.message
             })
            
        }

    })
   
})

//add a new product
router.post('/products/add' ,  async(req,res)=>{
   
      upload(req,res,(err)=>
        {
            try {
                const Name = req.body.Name;
                const Price = req.body.Price;
                const Description = req.body.Description;
                const Availability = req.body.Availability;
                const ProductImage = { data: fs.readFileSync( "uploads/"+ req.file.filename) ,
                contentType: 'image/png'}
                    const ProductObj = { Name , Price , Description , Availability, ProductImage};
                    const products = new Products(ProductObj);
                     products.save()
                        return res.status(200).json({
                           message:"data saved succesfully",
                           ProductObj
                        })
                }
                catch (err) {
                    return res.status(500).json({
                        message:"something went wrong",
                        error: err.message
                     })
                    
                          }
                            })
      
     
    } 
)

// facing problem in building the update function

router.post('/products/update/:id', async (req,res)=>{
    upload(req,res,(err)=>
    {
        try {
            const id = req.params.id;
            const products = Products.findById(id);
            products.Availability = req.body.Availability;
            products.save();
            return res.status(200).json({
                       message:"data updated succesfully", })
            }
        catch (err) {
                return res.status(500).json({
                    message:"something went wrong",
                    error: err.message
                 })
                
                      }
     })
  
 
} )

dbconn1();
module.exports = router;

