const { MongoClient} = require("mongodb");
const uri = "mongodb://127.0.0.1:27017/seller";
const client = new MongoClient(uri);
const mongoose  = require("mongoose");
const file = require("fs");
const { log } = require("console");

const schema = {
    sellerName : String,
    sellerLoc : String,
    product : String,
    price : Number,
    descripton : String
}
const userSchema = new mongoose.Schema(schema, { strict: true });
const Seller = mongoose.model("seller", userSchema);
// let data = (file.readFileSync("data.json", 'utf-8'));

async function main(){ 
    await mongoose.connect(uri); 

    // data = await JSON.parse(data)

    // Seller.insertMany({
    //     sellerName : "name",
    //     sellerLoc : "loc",
    //     product : "String",
    //     price : 12,
    //     descripton : "String"
    // })
    // .then((res)=> console.log(res))
    // .catch((err)=> console.log(err))
    // await Seller.insertMany(data)
    // .then((res)=> {console.log(res.length)})
    // .catch((err)=> console.log(err))
    

    // await Seller.findById('')
    // .then((res)=> console.log(res))
    // .catch((err) => console.log(err));

    await  Seller.deleteMany({ sellerName: 'name' })
    .then((res)=> console.log(res.deletedCount))
    .catch((err) => console.log(err));
}


main()
.then((res)=>{ })
.catch((err) => console.log(err))

// .then((res)=>{
// console.log(res);
// }).catch(err=>console.log(err))

// (async () => {
//     await client.connect();
//     const db = client.db('seller')
//     const seller = db.collection("seller")

//     // await seller.insertOne({
//     //     sellerName: 'binod'
//     // })
    
//     let data = await seller.find({ 'sellerName': 'binod' }, { 'sellerName': 1 , '_id': 0}).toArray()

//     console.log(data, 1);
//     await seller.deleteOne({sellerName: 'binod'})
//     data = await seller.find({ 'sellerName': 'binod' }, { 'sellerName': 1 , '_id': 0}).toArray()
//     console.log(data, 2);
// })()
    // .then(() => { })
    // .catch((err) => { console.log(err); })
    // .finally(() => { client.close() })