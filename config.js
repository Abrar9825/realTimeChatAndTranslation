const mongoose = require('mongoose');

async function connectToMongodb(url) {
    try {
        await mongoose.connect(url);
        console.log("Connection successful, ready to go!!");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
}

module.exports = {
    connectToMongodb
}
