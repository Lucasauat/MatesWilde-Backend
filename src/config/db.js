const mongoose = require("mongoose")

 const connDB = async (url, dbName)=>{
    try {
        await mongoose.connect(
            url,
            {
                dbName
            }
        )
        console.log("db online")
    } catch (error) {
        console.log(`error al conectar ${error.mesagge}`)
    }
}
module.exports = { connDB };