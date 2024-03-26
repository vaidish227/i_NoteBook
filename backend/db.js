const mongoose = require('mongoose');
//const mongoURI = "mongodb://localhost:27017/inotebook";
const mongoURI = "mongodb+srv://inotebook:password@cluster0.apzh3pp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
//connection establishment with database
const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

module.exports = connectToMongo;
