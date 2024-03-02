const mongoose = require("mongoose");
const {Schema}=mongoose;
mongoose
  .connect("mongodb://localhost:27017/relationshipDemo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to Mongo");
  })
  .catch((err) => {
    console.log("Error connecting to Mongo");
    console.log(err);
  });

const productSchema=new Schema({
    name:String,
    price:Number,
    season:{
        type:String,
        enum:['summer','winter','rainy','spring']
    }
});

const farmsSchems=new Schema({
     name:String,
     city:String,
     products:[{
        type: Schema.Types.ObjectId ,ref:'Product'
     }]
})
const Product=mongoose.model('Product', productSchema)
const Farm=mongoose.model('Farm', farmsSchems)
// Product.insertMany([
//     {name:'Water Melon',price:200,season:'summer'},
//     {name:'Apple',price:250,season:'spring'},
//     {name:'Litchi',price:100,season:'rainy'},
//     {name:'Draonfruit',price:300,season:'spring'},
    
// ])
// .then((result) => {
//     console.log("Products inserted successfully:", result);
//   })
//   .catch((err) => {
//     console.error("Error inserting products:", err);
//   });


// const makefarm=async()=>{
//     const farm=new Farm({name:'Full belly faerms', city:'Himancahal'});
//     const melon= await Product.findOne({name:'Water Melon'})
//     farm.products.push(melon);
//     await farm.save();
//     console.log(farm);
// }
// makefarm();

const addProdudct=async()=>{
    const farm= await Farm.findOne({name:'Full belly faerms'});
    const watermelon= await Product.findOne("Sugar baby melon");
    farm.products.push(watermelon);
    await farm.save()
    console.log(farm)
}

Farm.findOne({ name: 'Full Belly Farms' })
    .populate('products')
    .then(farm => console.log(farm))