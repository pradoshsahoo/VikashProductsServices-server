const mongoose = require('mongoose');
exports.dbconn1 = async ()=>{
    try{
        const connectionString = "mongodb+srv://dikshya2002:dikshya@nodeexpressprojects.nx3r9.mongodb.net/VillageProducts?retryWrites=true&w=majority";
        await mongoose.connect(connectionString , {
        useNewUrlParser:true , useUnifiedTopology:true});
        console.log('Database Connected products');
    }
    catch(err)
    {
       console.log( `database connection error  ${err.message}`);
    }
}