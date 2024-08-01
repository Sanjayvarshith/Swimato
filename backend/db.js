const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const mongoURI="mongodb+srv://sanjayvarshith21:Sanjay210105@cluster0.hynhsfd.mongodb.net/mern?retryWrites=true&w=majority&appName=Cluster0"
// const mongoURI="mongodb://sanjayvarshith21:Sanjay210105@ac-u9bhwmr-shard-00-00.hynhsfd.mongodb.net:27017,ac-u9bhwmr-shard-00-01.hynhsfd.mongodb.net:27017,ac-u9bhwmr-shard-00-02.hynhsfd.mongodb.net:27017/mern?replicaSet=atlas-6q3lhe-shard-0&ssl=true&authSource=admin&retryWrites=true&w=majority&appName=Cluster0"
const mongoDB=async()=>{
    await mongoose.connect(mongoURI,{useNewUrlParser:true},(err,result)=>{
        if(err) console.group("er",err)
        else {
    console.log("connected");
    const fetched_data= mongoose.connection.db.collection("food_items");
    fetched_data.find({}).toArray(async function(err,data){
        const foodCategory= await mongoose.connection.db.collection("foodCategory");
        foodCategory.find({}).toArray(function(err,catData){
            if(err) console.log(err);
        else 
        {
            global.food_items=data;
            // console.log(global.food_items);
            global.foodCategory=catData;
        }
        })
        
    })
        }
    });
}

module.exports=mongoDB;


