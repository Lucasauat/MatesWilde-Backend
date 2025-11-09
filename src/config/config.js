const config = {
    PORT: 8080,
    UPLOADS: "./src/uploads",
    database:{
        MONGO_URL: "mongodb+srv://admin:adminadmin@cluster0.r1wyvml.mongodb.net/?appName=Cluster0",
        DB_NAME: "mateswilde"
    }
}
module.exports = { config };